package goyave

import (
	"encoding/json"
	"fmt"
	htmltemplate "html/template"
	"io"
	"net/http"
	"os"
	"runtime/debug"
	"strconv"
	"text/template"

	"github.com/System-Glitch/goyave/v2/config"
	"github.com/System-Glitch/goyave/v2/helper/filesystem"
	"github.com/jinzhu/gorm"
)

// Response represents a controller response.
type Response struct {
	// Used to check if controller didn't write anything so
	// core can write default 204 No Content.
	// See RFC 7231, 6.3.5
	empty       bool
	status      int
	wroteHeader bool
	err         interface{}
	stacktrace  string
	writer      io.Writer

	httpRequest    *http.Request
	responseWriter http.ResponseWriter
}

// newResponse create a new Response using the given http.ResponseWriter and raw request.
func newResponse(writer http.ResponseWriter, rawRequest *http.Request) *Response {
	return &Response{
		responseWriter: writer,
		writer:         writer,
		httpRequest:    rawRequest,
		empty:          true,
		status:         0,
		wroteHeader:    false,
		err:            nil,
	}
}

// --------------------------------------
// http.ResponseWriter implementation

// Write writes the data as a response.
// See http.ResponseWriter.Write
func (r *Response) Write(data []byte) (int, error) {
	r.empty = false
	if !r.wroteHeader {
		if r.status == 0 {
			r.status = 200
		}
		r.WriteHeader(r.status)
	}

	return r.writer.Write(data)
}

// WriteHeader sends an HTTP response header with the provided
// status code.
// Prefer using "Status()" method instead.
// Calling this method a second time will have no effect.
func (r *Response) WriteHeader(status int) {
	if !r.wroteHeader {
		r.status = status
		r.wroteHeader = true
		r.responseWriter.WriteHeader(status)
	}
}

// Header returns the header map that will be sent.
func (r *Response) Header() http.Header {
	return r.responseWriter.Header()
}

// --------------------------------------
// Chained writers

// Writer return the current writer used to write the response.
// Note that the returned writer is not necessarily a http.ResponseWriter, as
// it can be replaced using SetWriter.
func (r *Response) Writer() io.Writer {
	return r.writer
}

// SetWriter set the writer used to write the response.
// This can be used to chain writers, for example to enable
// gzip compression, or for logging.
//
// The original http.ResponseWriter is always kept.
func (r *Response) SetWriter(writer io.Writer) {
	r.writer = writer
}

func (r *Response) close() error {
	if wr, ok := r.writer.(io.Closer); ok {
		return wr.Close()
	}
	return nil
}

// --------------------------------------
// Accessors

// GetStatus return the response code for this request or 0 if not yet set.
func (r *Response) GetStatus() int {
	return r.status
}

// GetError return the value which caused a panic in the request's handling, or nil.
func (r *Response) GetError() interface{} {
	return r.err
}

// Status set the response status code.
// Calling this method a second time will have no effect.
func (r *Response) Status(status int) {
	if r.status == 0 {
		r.status = status
	}
}

// JSON write json data as a response.
// Also sets the "Content-Type" header automatically
func (r *Response) JSON(responseCode int, data interface{}) error {
	r.responseWriter.Header().Set("Content-Type", "application/json")
	r.WriteHeader(responseCode)
	return json.NewEncoder(r).Encode(data)
}

// String write a string as a response
func (r *Response) String(responseCode int, message string) error {
	r.WriteHeader(responseCode)
	_, err := r.Write([]byte(message))
	return err
}

func (r *Response) writeFile(file string, disposition string) (int64, error) {
	r.empty = false
	r.status = http.StatusOK
	mime, size := filesystem.GetMIMEType(file)
	header := r.responseWriter.Header()
	header.Set("Content-Disposition", disposition)

	if header.Get("Content-Type") == "" {
		header.Set("Content-Type", mime)
	}
	header.Set("Content-Length", strconv.FormatInt(size, 10))

	f, _ := os.Open(file)
	defer f.Close()
	return io.Copy(r, f)
}

// File write a file as an inline element.
// Automatically detects the file MIME type and sets the "Content-Type" header accordingly.
// It is advised to call "filesystem.FileExists()" before sending a file to avoid a panic and return a 404 error
// if the file doesn't exist.
// The given path can be relative or absolute.
//
// If you want the file to be sent as a download ("Content-Disposition: attachment"), use the "Download" function instead.
func (r *Response) File(file string) error {
	_, err := r.writeFile(file, "inline")
	return err
}

// Download write a file as an attachment element.
// Automatically detects the file MIME type and sets the "Content-Type" header accordingly.
// It is advised to call "filesystem.FileExists()" before sending a file to avoid a panic and return a 404 error
// if the file doesn't exist.
// The given path can be relative or absolute.
//
// The "fileName" parameter defines the name the client will see. In other words, it sets the header "Content-Disposition" to
// "attachment; filename="${fileName}""
//
// If you want the file to be sent as an inline element ("Content-Disposition: inline"), use the "File" function instead.
func (r *Response) Download(file string, fileName string) error {
	_, err := r.writeFile(file, fmt.Sprintf("attachment; filename=\"%s\"", fileName))
	return err
}

// Error print the error in the console and return it with an error code 500.
// If debugging is enabled in the config, the error is also written in the response
// and the stacktrace is printed in the console.
// If debugging is not enabled, only the stauts code is set, which means you can still
// write to the response, or use your error status handler.
func (r *Response) Error(err interface{}) error {
	if r.err == nil {
		ErrLogger.Println(err)
	}
	r.err = err
	if config.GetBool("debug") {
		stacktrace := r.stacktrace
		if stacktrace == "" {
			stacktrace = string(debug.Stack())
		}
		ErrLogger.Print(stacktrace)
		var message interface{}
		if e, ok := err.(error); ok {
			message = e.Error()
		} else {
			message = err
		}
		return r.JSON(http.StatusInternalServerError, map[string]interface{}{"error": message})
	}

	// Don't set r.empty to false to let error status handler process the error
	r.Status(http.StatusInternalServerError)
	return nil
}

// Cookie add a Set-Cookie header to the response.
// The provided cookie must have a valid Name. Invalid cookies may be
// silently dropped.
func (r *Response) Cookie(cookie *http.Cookie) {
	http.SetCookie(r.responseWriter, cookie)
}

// Redirect send a permanent redirect response
func (r *Response) Redirect(url string) {
	http.Redirect(r, r.httpRequest, url, http.StatusPermanentRedirect)
}

// TemporaryRedirect send a temporary redirect response
func (r *Response) TemporaryRedirect(url string) {
	http.Redirect(r, r.httpRequest, url, http.StatusTemporaryRedirect)
}

// Render a text template with the given data.
// The template path is relative to the "resources/template" directory.
func (r *Response) Render(responseCode int, templatePath string, data interface{}) error {
	r.WriteHeader(responseCode)
	tmplt, err := template.ParseFiles(r.getTemplateDirectory() + templatePath)
	if err != nil {
		return err
	}
	return tmplt.Execute(r, data)
}

// RenderHTML an HTML template with the given data.
// The template path is relative to the "resources/template" directory.
func (r *Response) RenderHTML(responseCode int, templatePath string, data interface{}) error {
	r.WriteHeader(responseCode)
	tmplt, err := htmltemplate.ParseFiles(r.getTemplateDirectory() + templatePath)
	if err != nil {
		return err
	}
	return tmplt.Execute(r, data)
}

func (r *Response) getTemplateDirectory() string {
	sep := string(os.PathSeparator)
	workingDir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	return workingDir + sep + "resources" + sep + "template" + sep
}

// HandleDatabaseError takes a database query result and checks if any error has occurred.
//
// Automatically writes HTTP status code 404 Not Found if the error is a "Not found" error.
// Calls "Response.Error()" if there is another type of error.
//
// Returns true if there is no error.
func (r *Response) HandleDatabaseError(db *gorm.DB) bool {
	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			r.Status(http.StatusNotFound)
		} else {
			r.Error(db.Error)
		}
		return false
	}
	return true
}

// CreateTestResponse create an empty response with the given response writer.
// This function is aimed at making it easier to unit test Responses.
//
// Deprecated: Use goyave.TestSuite.CreateTestResponse instead.
//
//  writer := httptest.NewRecorder()
//  response := goyave.CreateTestResponse(writer)
//  response.Status(http.StatusNoContent)
//  result := writer.Result()
//  fmt.Println(result.StatusCode) // 204
func CreateTestResponse(recorder http.ResponseWriter) *Response {
	return &Response{
		responseWriter: recorder,
		writer:         recorder,
		empty:          true,
	}
}
