const express = require("express");
const app = express();
const path = require("path");
var methodOverride = require("method-override");
const port = 8484;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let posts = [
  { id: 1, name: "Ubaid", post: "started node js its fun" },
  { id: 2, name: "Kamran", post: "also learning ejs" },
  { id: 3, name: "hamad", post: "today started and work on crud operation" },
];

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log("delete ", id);
  posts = posts.filter((p) => p.id != id);
  console.log(posts);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const curPost = posts.filter((post) => post.id == id);
  console.log(id);
  res.render("edit.ejs", { curPost });
});

app.patch("/posts/:id", (req, res) => {
  const post = req.body.post;
  const { id } = req.params;
  const oldData = posts.find((p) => p.id == id);
  //   const newData = { ...oldData, post: post.post };
  oldData.post = post;
  console.log(oldData);
  res.redirect("/posts");
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  const { name, post } = req.body;
  posts.push({ id: crypto.randomUUID(), name, post });

  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const data = posts.filter((post) => post.id == id);
  //   console.log(data);
  res.render("post.ejs", { data });
});

app.get("/posts", (req, res) => {
  res.render("posts.ejs", { posts });
});

app.listen(port, () => {
  console.log("app running on port 8484");
});
