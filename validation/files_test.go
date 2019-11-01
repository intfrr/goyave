package validation

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"runtime"
	"testing"

	"github.com/System-Glitch/goyave/helpers/filesystem"
	"github.com/stretchr/testify/assert"
)

const (
	logoPath      string = "resources/img/logo/goyave_16.png"
	largeLogoPath string = "resources/img/logo/goyave_512.png"
	configPath    string = "config/defaults.json"
)

// TODO create test helpers to ease testing
func addFileToRequest(writer *multipart.Writer, path, name, fileName string) {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	part, err := writer.CreateFormFile(name, fileName)
	if err != nil {
		panic(err)
	}
	_, err = io.Copy(part, file)
}

func createTestFiles(files ...string) []filesystem.File {
	_, filename, _, ok := runtime.Caller(1)
	if !ok {
		panic(fmt.Errorf("Runtime caller error"))
	}

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	for _, p := range files {
		fp := path.Dir(filename) + "/../" + p
		addFileToRequest(writer, fp, "file", filepath.Base(fp))
	}
	err := writer.Close()
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", "/test-route", body)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.ParseMultipartForm(10 << 20)
	return filesystem.ParseMultipartFiles(req, "file")
}

func createTestFileWithNoExtension() []filesystem.File {
	_, filename, _, ok := runtime.Caller(1)
	if !ok {
		panic(fmt.Errorf("Runtime caller error"))
	}

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	addFileToRequest(writer, path.Dir(filename)+"/../"+logoPath, "file", "noextension")
	err := writer.Close()
	if err != nil {
		panic(err)
	}

	req, err := http.NewRequest("POST", "/test-route", body)
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.ParseMultipartForm(10 << 20)
	return filesystem.ParseMultipartFiles(req, "file")
}

func TestValidateFile(t *testing.T) {
	assert.True(t, validateFile("file", createTestFiles(logoPath), []string{}, map[string]interface{}{}))
	assert.True(t, validateFile("file", createTestFiles(logoPath, configPath), []string{}, map[string]interface{}{}))
	assert.False(t, validateFile("file", "test", []string{}, map[string]interface{}{}))
	assert.False(t, validateFile("file", 1, []string{}, map[string]interface{}{}))
	assert.False(t, validateFile("file", 1.2, []string{}, map[string]interface{}{}))
	assert.False(t, validateFile("file", true, []string{}, map[string]interface{}{}))
	assert.False(t, validateFile("file", []string{}, []string{}, map[string]interface{}{}))
}

func TestValidateMIME(t *testing.T) {
	assert.True(t, validateMIME("file", createTestFiles(logoPath), []string{"image/png"}, map[string]interface{}{}))
	assert.True(t, validateMIME("file", createTestFiles(logoPath), []string{"text/plain", "image/png"}, map[string]interface{}{}))
	assert.True(t, validateMIME("file", createTestFiles(configPath), []string{"text/plain", "image/jpeg"}, map[string]interface{}{}))
	assert.True(t, validateMIME("file", createTestFiles(configPath, logoPath), []string{"text/plain", "image/png"}, map[string]interface{}{}))
	assert.False(t, validateMIME("file", createTestFiles(configPath, logoPath), []string{"text/plain"}, map[string]interface{}{}))
	assert.False(t, validateMIME("file", createTestFiles(logoPath), []string{"text/plain", "image/jpeg"}, map[string]interface{}{}))
	assert.False(t, validateMIME("file", "test", []string{"text/plain", "image/jpeg"}, map[string]interface{}{}))
}

func TestValidateImage(t *testing.T) {
	assert.True(t, validateImage("file", createTestFiles(logoPath), []string{}, map[string]interface{}{}))
	assert.False(t, validateImage("file", createTestFiles(configPath), []string{}, map[string]interface{}{}))
	assert.False(t, validateImage("file", createTestFiles(logoPath, configPath), []string{}, map[string]interface{}{}))
}

func TestValidateExtension(t *testing.T) {
	assert.True(t, validateExtension("file", createTestFiles(logoPath), []string{"png", "jpeg"}, map[string]interface{}{}))
	assert.True(t, validateExtension("file", createTestFiles(logoPath, configPath), []string{"png", "json"}, map[string]interface{}{}))
	assert.False(t, validateExtension("file", createTestFiles(logoPath), []string{"jpeg"}, map[string]interface{}{}))
	assert.False(t, validateExtension("file", createTestFiles(logoPath, configPath), []string{"png"}, map[string]interface{}{}))
	assert.False(t, validateExtension("file", createTestFileWithNoExtension(), []string{"png"}, map[string]interface{}{}))
	assert.False(t, validateExtension("file", "test", []string{"png"}, map[string]interface{}{}))
}
