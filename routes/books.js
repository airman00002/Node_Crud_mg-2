const express = require("express");
const router = express.Router();
const Books = require("../model/model_books");

router.get("/", async (req, res, next) => {
  try {
    let result = await Books.find();
    if (result === undefined || result.length === 0) {
      res.render("books", { results: result });
    } else {
      res.render("books", { results: result });
    }
  } catch (errors) {
    req.flash("errors", errors.message);
    res.render("books");
  }
});

//* books-search display------------------------
router.get("/search/", async (req, res, next) => {
  let name = req.query.name;
  if (name) {
    console.log(name);
    try {
      let result = await Books.find({name: new RegExp(name)});
      if (result === undefined || result.length === 0) {
        res.render("books-search", { results: result,search:name});
      } else {
        res.render("books-search", { results: result,search:name});
      }
    } catch (errors) {
      req.flash("errors", errors.message);
      res.render("books");
    }
  }
});

//*Add Display
router.get("/add", (req, res, next) => {
  res.render("add", { name: "", author: "" });
});
//* Edit Display
router.get("/edit/:id", async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    req.flash("errors", "No such id was provided");
    res.redirect("/books");
  } else {
    try {
      let result = await Books.findById(id);
      if (result === undefined || result.length === 0) {
        req.flash("errors", "No have a Book ID");
        res.redirect("/books");
      } else {
        req.flash("success", "Get a book Success for the book id =" + id);
        res.render("edit", {
          id: result._id,
          name: result.name,
          author: result.author,
        });
      }
    } catch (errors) {
      req.flash("errors", errors.message);
      res.redirect("/books");
    }
  }
});

//TODO--------------------------------------------------------------------------------------------------------------------------------

//?   Add Book
router.post("/add", async (req, res, next) => {
  let name = req.body.name;
  let author = req.body.author;

  if (!name || !author) {
    req.flash("errors", "Please enter a name or author");
    res.render("add", { name: name, author: author });
  } else {
    let new_Book = new Books({
      name: name,
      author: author,
    });
    try {
      await new_Book.save();
      req.flash("success", "Success saved book successfully");
      res.redirect("/books");
    } catch (errors) {
      req.flash("errors", errors.message);
      res.render("add", { name: name, author: author });
    }
  }
});

//?   Update Book
router.post("/update/:id", async (req, res, next) => {
  let id = req.params.id;
  let name = req.body.name;
  let author = req.body.author;
  if (!id || !name || !author) {
    req.flash("errors", "Enter a name or author");
    res.render("edit", { id: id, name: name, author: author });
  } else {
    try {
      let result = await Books.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            author: author,
          },
        },
        { new: true }
      );
      req.flash("success", "Edit from books updated successfully ");
      res.redirect("/books");
    } catch (errors) {
      req.flash("errors", errors.message);
      res.render("edit", { id: id, name: name, author: author });
    }
  }
});

//? Delete Book
router.get("/delete/:id", async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    req.flash("errors", "Please enter Book ID");
    res.redirect("/books");
  } else {
    try {
      let result = await Books.findByIdAndDelete(id);
      req.flash("success", "Book deleted successfully");
      res.redirect("/books");
    } catch (errors) {
      req.flash("errors", errors.message);
      res.redirect("/books");
    }
  }
});

module.exports = router;
