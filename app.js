var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//TODO----------------------------------------------------------------
const flash = require("express-flash");
const session = require("express-session");

var indexRouter = require("./routes/index");
var booksRouter = require("./routes/books");

var app = express();

//TODO----------------------------------
app.use(flash());
app.use(
  session({
    secret: "keyboard cat",
    resave: "false",
    saveUninitialized: "true",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/books", booksRouter);



module.exports = app;
