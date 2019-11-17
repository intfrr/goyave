(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{230:function(e,t,a){"use strict";a.r(t);var r=a(0),s=Object(r.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"architecture-concepts"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#architecture-concepts"}},[e._v("#")]),e._v(" Architecture Concepts")]),e._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#introduction"}},[e._v("Introduction")])]),a("li",[a("a",{attrs:{href:"#terminology"}},[e._v("Terminology")])]),a("li",[a("a",{attrs:{href:"#lifecycle"}},[e._v("Lifecycle")]),a("ul",[a("li",[a("a",{attrs:{href:"#server"}},[e._v("Server")])]),a("li",[a("a",{attrs:{href:"#requests"}},[e._v("Requests")])])])]),a("li",[a("a",{attrs:{href:"#directory-structure"}},[e._v("Directory structure")]),a("ul",[a("li",[a("a",{attrs:{href:"#database-directory"}},[e._v("Database directory")])]),a("li",[a("a",{attrs:{href:"#http-directory"}},[e._v("HTTP directory")])]),a("li",[a("a",{attrs:{href:"#resources-directory"}},[e._v("Resources directory")])]),a("li",[a("a",{attrs:{href:"#custom-directories"}},[e._v("Custom directories")])])])]),a("li",[a("a",{attrs:{href:"#database"}},[e._v("Database")])])])]),a("p"),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("Understanding your development tools and knowing what happens in the background is crucial. Mastering your tools and environment incredibily decreases the risk of errors, the ease of debugging and helps making your code work in harmony with the framework. The goal of this section is to give you an overview of the general functioning and design of the framework, to make you more comfortable and confident using it.")]),e._v(" "),a("h2",{attrs:{id:"terminology"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#terminology"}},[e._v("#")]),e._v(" Terminology")]),e._v(" "),a("p",[e._v("This section will briefly explain the technical words used in the following sections.")]),e._v(" "),a("p",[a("strong",[e._v("Lifecycle")]),e._v(": An execution from start to finish, with intermediary steps.")]),e._v(" "),a("p",[a("strong",[e._v("Framework core")]),e._v(": Features and behaviors executed internally and that are invisible to the application developer.")]),e._v(" "),a("p",[a("strong",[e._v("Handler")]),e._v(": A function receiving incoming requests and a response writer. Multiple handlers can be executed for the same request.")]),e._v(" "),a("p",[a("strong",[e._v("Router")]),e._v(": The root-level handler responsible for the execution of the correct controller handler.")]),e._v(" "),a("p",[a("strong",[e._v("Route")]),e._v(": A URI definition linked to a controller handler. If a request matches the definition, the router will execute the associated controller handler.")]),e._v(" "),a("p",[a("strong",[e._v("Controller")]),e._v(": A source file implementing the business logic linked to a specific resource and associated routes.")]),e._v(" "),a("p",[a("strong",[e._v("Middleware")]),e._v(": A handler executed before controller handlers. Middleware can intercept the request, modify its data, and send a response before the controller handler is reached.")]),e._v(" "),a("p",[a("strong",[e._v("Application")]),e._v(": A program using the Goyave framework as a library.")]),e._v(" "),a("p",[a("strong",[e._v("Model")]),e._v(": A structure reflecting a database table structure. An instance of a model is a single database record.")]),e._v(" "),a("h2",{attrs:{id:"lifecycle"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#lifecycle"}},[e._v("#")]),e._v(" Lifecycle")]),e._v(" "),a("h3",{attrs:{id:"server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#server"}},[e._v("#")]),e._v(" Server")]),e._v(" "),a("p",[e._v("The very first step of the server lifecycle is the "),a("strong",[e._v("server setup")]),e._v(", taking place when you call "),a("code",[e._v("goyave.Start(route.Register)")]),e._v(" in your application's main function.")]),e._v(" "),a("p",[e._v("Goyave starts by loading the "),a("a",{attrs:{href:"./configuration"}},[e._v("configuration")]),e._v(" file from the core of the framework. The application's configuration file is then loaded, overriding the default values.")]),e._v(" "),a("p",[e._v("The second step of the initialization takes a very similar approach to load the "),a("a",{attrs:{href:"./advanced/localization"}},[e._v("language")]),e._v(" files. The "),a("code",[e._v("en-US")]),e._v(" language is available by default inside the framework and is used as the default language. When it's loaded, the framework will look for custom language files inside the working directory and will override the "),a("code",[e._v("en-US")]),e._v(" language entries if needed.")]),e._v(" "),a("p",[e._v("Then, if enabled, the automatic migrations are run, thus creating the "),a("a",{attrs:{href:"./basics/database"}},[e._v("database")]),e._v(" connection pool. If the automatic migrations are not enabled, no connection to the database will be established until the application requires one.")]),e._v(" "),a("p",[e._v("That is only now that "),a("a",{attrs:{href:"./basics/routing"}},[e._v("routes")]),e._v(" are registered using the route registrer provided to the "),a("code",[e._v("Start()")]),e._v(" function. That means that at this registrer has already access to all the configuration and language features, which can be handy if you want to generate different routes based on the languages your application supports.")]),e._v(" "),a("p",[e._v("Finally, the framework starts listening for incoming HTTP requests and serves them. The server also listens for interruption and termination signals so it can finish serving ongoing requests before shutting down gracefully. In the next section, we will get into more details about the lifecycle of each request.")]),e._v(" "),a("h3",{attrs:{id:"requests"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requests"}},[e._v("#")]),e._v(" Requests")]),e._v(" "),a("p",[e._v("When an incoming request is received, it's first passed through the "),a("a",{attrs:{href:"https://github.com/gorilla/mux",target:"_blank",rel:"noopener noreferrer"}},[e._v("Gorilla Mux"),a("OutboundLink")],1),e._v(" router so your server knows which handler to execute when a user requests a specific URI. Then, the framework's internal handler creates a "),a("code",[e._v("goyave.Request")]),e._v(" object and a "),a("code",[e._v("goyave.Response")]),e._v(" object from the raw request. These two objects are fundamental features of the framework as you are going to use them to retrieve the requests' data and write your responses.")]),e._v(" "),a("p",[e._v("Before executing the handler, the middleware are executed. The framework features a few core middleware, which are executed "),a("strong",[e._v("first")]),e._v(" and for all routes and all requests.")]),e._v(" "),a("h4",{attrs:{id:"_1-recovery"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-recovery"}},[e._v("#")]),e._v(" 1. Recovery")]),e._v(" "),a("p",[e._v("The "),a("strong",[e._v("recovery")]),e._v(" middleware is executed. This middleware ensures that any unrecovered panic is handled. Instead of never returning a response in case of a panic, the server will then return an HTTP 500 Error. If debugging is enabled if the configuration, the response will contain the error message and the stacktrace will be printed in the console. It's important to keep this behavior in mind when handling errors in your handlers.")]),e._v(" "),a("h4",{attrs:{id:"_2-parsing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-parsing"}},[e._v("#")]),e._v(" 2. Parsing")]),e._v(" "),a("p",[e._v("The request is "),a("strong",[e._v("parsed")]),e._v(" by a second middleware. This middleware will automatically detect the request's body format based on the headers and attempt to parse it. If the request can't be parsed, the request's data is simply set to "),a("code",[e._v("nil")]),e._v(". This middleware supports JSON requests.")]),e._v(" "),a("h4",{attrs:{id:"_3-language"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-language"}},[e._v("#")]),e._v(" 3. Language")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("Accept-Language")]),e._v(" header is checked. If it's there, its value is parsed and the request's language attribute is set accordingly so localization is easy in the following handlers. If the header is missing, invalid, or asks for an unsupported language, the framework falls back to the default language defined in the configuration. Learn more "),a("a",{attrs:{href:"./advanced/localization"}},[e._v("here")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"_4-application-middlewares"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-application-middlewares"}},[e._v("#")]),e._v(" 4. Application middlewares")]),e._v(" "),a("p",[e._v("Application middlewares are executed. These middlewares are implemented and defined by the application developer. Note that some application middleware are already available in the framework. Learn more in the "),a("a",{attrs:{href:"./basics/middleware"}},[e._v("middlewares")]),e._v(" section. At this stage of the lifecycle, the request is not validated yet, so application middleware can be used for authentication or automatic string trimming for example. Bear in mind that manipulating unvalidated data can be dangerous, especially in form-data where the data types are not converted by the validator yet.")]),e._v(" "),a("h4",{attrs:{id:"_5-validation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-validation"}},[e._v("#")]),e._v(" 5. Validation")]),e._v(" "),a("p",[e._v("The data is validated last. The validation middleware immediately passes if no rules have been defined for the current route, else, it check if the data parsing was successful. An automatic response is sent if that is not the case. The data is passed through the validator, which converts the data types and validates it. The request is stopped if the validation is not successful, and the validation errors are sent as a response. Be careful when working with unvalidated requests (which you should never do!) because if the request's parsing fails, "),a("code",[e._v("request.Data")]),e._v(" will be "),a("code",[e._v("nil")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"_6-controller-handler"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-controller-handler"}},[e._v("#")]),e._v(" 6. Controller handler")]),e._v(" "),a("p",[e._v("Finally, if the request has not been stopped by a middleware, the controller handler is executed.\nIf the controller handler didn't write anything as a response, an empty response with the HTTP status code 204 \"No Content\" is automatically sent, so you don't have to do it yourself.")]),e._v(" "),a("h2",{attrs:{id:"directory-structure"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#directory-structure"}},[e._v("#")]),e._v(" Directory structure")]),e._v(" "),a("p",[e._v('Goyave follows the principle of "'),a("strong",[e._v("Convention is better than configuration")]),e._v('". That means that the framework will attempt to automatically get the resources it needs from predefined directories.\nThe typical and recommended directory structure for Goyave applications is as follows:')]),e._v(" "),a("pre",{staticClass:"vue-container"},[a("code",[a("p",[e._v(".\n├── database\n│   └── models\n│       └── "),a("em",[e._v("...")]),e._v("\n├── http\n│   ├── controllers\n│   │   └── "),a("em",[e._v("...")]),e._v("\n│   ├── middleware\n│   │   └── "),a("em",[e._v("...")]),e._v("\n│   ├── requests\n│   │   ├── placeholders.go ("),a("em",[e._v("optional")]),e._v(")\n│   │   ├── validation.go ("),a("em",[e._v("optional")]),e._v(")\n│   │   └── "),a("em",[e._v("...")]),e._v("\n│   └── routes\n│       └── routes.go\n│\n├── resources\n│   ├── lang\n│   │   └── en-US ("),a("em",[e._v("language name")]),e._v(")\n│   │       ├── fields.json ("),a("em",[e._v("optional")]),e._v(")\n│   │       ├── locale.json ("),a("em",[e._v("optional")]),e._v(")\n│   │       └── rules.json ("),a("em",[e._v("optional")]),e._v(")\n│   └── img ("),a("em",[e._v("optional")]),e._v(")\n│       └── "),a("em",[e._v("...")]),e._v("\n│ \n├── .gitignore\n├── config.json\n├── go.mod\n└── kernel.go")]),e._v("\n")])]),a("h3",{attrs:{id:"database-directory"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database-directory"}},[e._v("#")]),e._v(" Database directory")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("database")]),e._v(" directory stores the models. Each model should have its own file in the "),a("code",[e._v("models")]),e._v(" package. This directory can also contain database-related code such as repositories, if you want to use this pattern.")]),e._v(" "),a("h3",{attrs:{id:"http-directory"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-directory"}},[e._v("#")]),e._v(" HTTP directory")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("http")]),e._v(" directory contains all the HTTP-related code. This is where most of your code will be written.")]),e._v(" "),a("h4",{attrs:{id:"http-controllers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-controllers"}},[e._v("#")]),e._v(" HTTP controllers")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("http/controllers")]),e._v(" directory contains the controller packages. Each feature should have its own package. For example, if you have a controller handling user registration, user profiles, etc, you should create a "),a("code",[e._v("http/controllers/user")]),e._v(" package. Creating a package for each feature has the advantage of cleaning up route definitions a lot and helps keeping a clean structure for your project. Learn more "),a("a",{attrs:{href:"./basics/controllers"}},[e._v("here")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"http-middleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-middleware"}},[e._v("#")]),e._v(" HTTP middleware")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("http/middleware")]),e._v(" directory contains the application middleware. Each middleware should have its own file. Learn more "),a("a",{attrs:{href:"./basics/middleware"}},[e._v("here")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"http-requests"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-requests"}},[e._v("#")]),e._v(" HTTP requests")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("http/requests")]),e._v(" directory contains the requests validation rules sets. You should have one package per feature, regrouping all requests handled by the same controller.")]),e._v(" "),a("p",[e._v("This directory can also contain a "),a("code",[e._v("placeholders.go")]),e._v(" file, which will define validation rule messages placeholders. Learn more "),a("a",{attrs:{href:"./basics/validation#placeholders"}},[e._v("here")]),e._v(".")]),e._v(" "),a("p",[e._v("This directory can also contain a "),a("code",[e._v("validation.go")]),e._v(" file, which will define custom validation rules. Learn more "),a("a",{attrs:{href:"./basics/validation#custom-rules"}},[e._v("here")]),e._v(".")]),e._v(" "),a("h4",{attrs:{id:"http-routes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-routes"}},[e._v("#")]),e._v(" HTTP Routes")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("http/routes")]),e._v(" directory contains the routes définitions. By default, all routes are registered in the "),a("code",[e._v("routes.go")]),e._v(" file, but for bigger projects, split the route definitions into multiple files.")]),e._v(" "),a("h3",{attrs:{id:"resources-directory"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#resources-directory"}},[e._v("#")]),e._v(" Resources directory")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("resources")]),e._v(" directory is meant to store static resources such as images, HTML documents and language files. This directory shouldn't be used as a storage for dynamic content such as user profile pictures.")]),e._v(" "),a("h4",{attrs:{id:"language-resources-directory"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#language-resources-directory"}},[e._v("#")]),e._v(" Language resources directory")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("resources/lang")]),e._v(" directory contains your application's supported languages and translations. Each language has its own directory and should be named with an "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",target:"_blank",rel:"noopener noreferrer"}},[e._v("ISO 639-1"),a("OutboundLink")],1),e._v(" language code. You can also append a variant to your languages: "),a("code",[e._v("en-US")]),e._v(", "),a("code",[e._v("en-UK")]),e._v(", "),a("code",[e._v("fr-FR")]),e._v(", "),a("code",[e._v("fr-CA")]),e._v(", ... "),a("strong",[e._v("Case is important.")])]),e._v(" "),a("p",[e._v("Each language directory contains three files. Each file is "),a("strong",[e._v("optional")]),e._v(".")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("fields.json")]),e._v(": field names translations and field-specific rule messages.")]),e._v(" "),a("li",[a("code",[e._v("locale.json")]),e._v(": all other language lines.")]),e._v(" "),a("li",[a("code",[e._v("rules.json")]),e._v(": validation rules messages.")])]),e._v(" "),a("p",[e._v("Learn more about localization "),a("a",{attrs:{href:"./advanced/localization"}},[e._v("here")]),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"custom-directories"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#custom-directories"}},[e._v("#")]),e._v(" Custom directories")]),e._v(" "),a("p",[e._v("You may add custom directories for your custom utilities, as they don't belong to any of the above directories. For example, if you develop a service manipulating images, the image processing code shouldn't be written in controller handlers, they are not part of the business logic. You would then create a "),a("code",[e._v("processing")]),e._v(" directory, containing your code in "),a("code",[e._v("images.go")]),e._v(" for example.")]),e._v(" "),a("h2",{attrs:{id:"database"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database"}},[e._v("#")]),e._v(" Database")]),e._v(" "),a("p",[e._v("Database connections are managed by the framework and are long-lived. When the server shuts down, the database connections are closed automatically. So you don't have to worry about creating, closing or refreshing database connections in your application.")]),e._v(" "),a("p",[e._v("If automatic migrations are enabled, all registered models at the time of startup will be auto-migrated. They must be registered before the server starts, ideally from an "),a("code",[e._v("init()")]),e._v(" function next to each model definition.")]),e._v(" "),a("p",[e._v("Learn more in the "),a("a",{attrs:{href:"./basics/database"}},[e._v("database")]),e._v(" section.")])])}),[],!1,null,null,null);t.default=s.exports}}]);