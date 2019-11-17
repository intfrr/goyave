(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{221:function(t,e,a){"use strict";a.r(e);var s=a(0),n=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"database"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database"}},[t._v("#")]),t._v(" Database")]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#introduction"}},[t._v("Introduction")])]),a("li",[a("a",{attrs:{href:"#configuration"}},[t._v("Configuration")]),a("ul",[a("li",[a("a",{attrs:{href:"#drivers"}},[t._v("Drivers")])])])]),a("li",[a("a",{attrs:{href:"#getting-a-database-connection"}},[t._v("Getting a database connection")])]),a("li",[a("a",{attrs:{href:"#models"}},[t._v("Models")]),a("ul",[a("li",[a("a",{attrs:{href:"#defining-a-model"}},[t._v("Defining a model")])]),a("li",[a("a",{attrs:{href:"#automatic-migrations"}},[t._v("Automatic migrations")])])])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),a("p",[t._v("Most web applications use a database. In this section, we are going to see how Goyave applications can query a database, using the awesome "),a("a",{attrs:{href:"https://gorm.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gorm ORM"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("p",[t._v("Database connections are managed by the framework and are long-lived. When the server shuts down, the database connections are closed automatically. So you don't have to worry about creating, closing or refreshing database connections in your application.")]),t._v(" "),a("p",[t._v("All functions below require the "),a("code",[t._v("database")]),t._v(" and the "),a("code",[t._v("gorm")]),t._v(" packages to be imported.")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/System-Glitch/goyave/database"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/jinzhu/gorm"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[t._v("#")]),t._v(" Configuration")]),t._v(" "),a("p",[t._v("Very few code is required to get started with databases. There are some "),a("a",{attrs:{href:"../configuration#configuration-reference"}},[t._v("configuration")]),t._v(" options that you need to change though:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("dbConnection")])]),t._v(" "),a("li",[a("code",[t._v("dbHost")])]),t._v(" "),a("li",[a("code",[t._v("dbPort")])]),t._v(" "),a("li",[a("code",[t._v("dbName")])]),t._v(" "),a("li",[a("code",[t._v("dbUsername")])]),t._v(" "),a("li",[a("code",[t._v("dbPassword")])]),t._v(" "),a("li",[a("code",[t._v("dbOptions")])]),t._v(" "),a("li",[a("code",[t._v("dbMaxOpenConnection")])]),t._v(" "),a("li",[a("code",[t._v("dbMaxIdleConnection")])])]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[a("code",[t._v("dbOptions")]),t._v(" represents the addtional connection options. For example, when using MySQL, you should use the "),a("code",[t._v("parseTime=true")]),t._v(" option so "),a("code",[t._v("time.Time")]),t._v(" can be handled correctly. Available options differ from one driver to another and can be found in their respective documentation.")])]),t._v(" "),a("h3",{attrs:{id:"drivers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#drivers"}},[t._v("#")]),t._v(" Drivers")]),t._v(" "),a("p",[t._v("The framework supports the following sql drivers:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("none")]),t._v(" ("),a("em",[t._v("Disable database features")]),t._v(")")]),t._v(" "),a("li",[a("code",[t._v("mysql")])]),t._v(" "),a("li",[a("code",[t._v("postgres")])]),t._v(" "),a("li",[a("code",[t._v("sqlite3")])]),t._v(" "),a("li",[a("code",[t._v("mssql")])])]),t._v(" "),a("p",[t._v("Change the "),a("code",[t._v("dbConnection")]),t._v(" config entry to the desired driver.")]),t._v(" "),a("p",[t._v("In order to be able connect to the database, Gorm needs a database driver to be imported. Add the following import to your "),a("code",[t._v("kernel.go")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"github.com/jinzhu/gorm/dialects/mysql"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// import _ "github.com/jinzhu/gorm/dialects/postgres"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// import _ "github.com/jinzhu/gorm/dialects/sqlite"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// import _ "github.com/jinzhu/gorm/dialects/mssql"')]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("For SQLite, only the "),a("code",[t._v("dbName")]),t._v(" config entry is required.")])]),t._v(" "),a("h2",{attrs:{id:"getting-a-database-connection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getting-a-database-connection"}},[t._v("#")]),t._v(" Getting a database connection")]),t._v(" "),a("h4",{attrs:{id:"database-getconnection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database-getconnection"}},[t._v("#")]),t._v(" database.GetConnection")]),t._v(" "),a("p",[t._v("Returns the global database connection pool. Creates a new connection pool if no connection is available.")]),t._v(" "),a("p",[t._v("The connections will be closed automatically on server shutdown so you don't need to call "),a("code",[t._v("Close()")]),t._v(" when you're done with the database.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameters")]),t._v(" "),a("th",[t._v("Return")])])]),t._v(" "),a("tbody",[a("tr",[a("td"),t._v(" "),a("td",[a("code",[t._v("*gorm.DB")])])])])]),t._v(" "),a("p",[a("strong",[t._v("Example:")])]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[t._v("db "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":=")]),t._v(" database"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetConnection")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\ndb"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("First")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Learn how to use the CRUD interface and the query builder in the "),a("a",{attrs:{href:"https://gorm.io/docs/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gorm documentation"),a("OutboundLink")],1),t._v(".")])]),t._v(" "),a("h4",{attrs:{id:"database-close"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#database-close"}},[t._v("#")]),t._v(" database.Close")]),t._v(" "),a("p",[t._v("If you want to manually close the database connection, you can do it using "),a("code",[t._v("Close()")]),t._v(". New connections can be re-opened using "),a("code",[t._v("GetConnection()")]),t._v(" as usual. This function does nothing if the database connection is already closed or has never been created.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Parameters")]),t._v(" "),a("th",[t._v("Return")])])]),t._v(" "),a("tbody",[a("tr",[a("td"),t._v(" "),a("td",[a("code",[t._v("void")])])])])]),t._v(" "),a("p",[a("strong",[t._v("Example:")])]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[t._v("database"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("Close")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("h2",{attrs:{id:"models"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#models"}},[t._v("#")]),t._v(" Models")]),t._v(" "),a("p",[t._v("A model is a structure reflecting a database table structure. An instance of a model is a single database record. Each model is defined in its own file inside the "),a("code",[t._v("database/models")]),t._v(" directory.")]),t._v(" "),a("h3",{attrs:{id:"defining-a-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#defining-a-model"}},[t._v("#")]),t._v(" Defining a model")]),t._v(" "),a("p",[t._v("Models are usually just normal Golang structs, basic Go types, or pointers of them. "),a("code",[t._v("sql.Scanner")]),t._v(" and "),a("code",[t._v("driver.Valuer")]),t._v(" interfaces are also supported.")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    database"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("RegisterModel")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v("User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),t._v(" User "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("struct")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  gorm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Model\n  Name         "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("\n  Age          sql"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("NullInt64\n  Birthday     "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v("time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Time\n  Email        "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gorm:"type:varchar(100);unique_index"`')]),t._v("\n  Role         "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gorm:"size:255"`')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// set field size to 255")]),t._v("\n  MemberNumber "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gorm:"unique;not null"`')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// set member number to unique and not null")]),t._v("\n  Num          "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gorm:"AUTO_INCREMENT"`')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// set num to auto incrementable")]),t._v("\n  Address      "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gorm:"index:addr"`')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// create index with name `addr` for address")]),t._v("\n  IgnoreMe     "),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("int")]),t._v("     "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('`gorm:"-"`')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ignore this field")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("All models should be "),a("strong",[t._v("registered")]),t._v(" in an "),a("code",[t._v("init()")]),t._v(" function inside their model file. To ensure the "),a("code",[t._v("init()")]),t._v(" functions are executed before the server starts, import the "),a("code",[t._v("models")]),t._v(" package in your "),a("code",[t._v("kernel.go")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language-go extra-class"},[a("pre",{pre:!0,attrs:{class:"language-go"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("_")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"database/models"')]),t._v("\n")])])])]),t._v(" "),a("p",[t._v("Learn more about model declaration in the "),a("a",{attrs:{href:"https://gorm.io/docs/models.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gorm documentation"),a("OutboundLink")],1),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"automatic-migrations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#automatic-migrations"}},[t._v("#")]),t._v(" Automatic migrations")]),t._v(" "),a("p",[t._v("If the "),a("code",[t._v("dbAutoMigrate")]),t._v(" config option is set to true, all registered models will be automatically migrated when the server starts.")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("Automatic migrations "),a("strong",[t._v("only creates")]),t._v(" tables. Missing columns and indexes won't be created, modified columns won't be changed and unused columns won't be deleted.")])]),t._v(" "),a("p",[t._v("If you would like to know more about migrations using Gorm, read their "),a("a",{attrs:{href:"https://gorm.io/docs/migration.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("documentation"),a("OutboundLink")],1),t._v(".")])])}),[],!1,null,null,null);e.default=n.exports}}]);