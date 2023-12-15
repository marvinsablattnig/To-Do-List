import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let activeList = "To-Do List";
const listItem = [];
let doneList = [];

var activeToDoList = true;
var activeListBtn = "active";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {});

app.get("/", (req, res) => {
  res.render("index.ejs", {
    activeList: activeList,
    doneList: doneList,
    listItem: listItem,
    activeListBtn: activeListBtn,
    id: listItem.length - 1,
  });
});

app.post("/add", (req, res) => {
  listItem.push(req.body["activity"]);
  console.log("lexngth: " + listItem.length);
  res.render("index.ejs", {
    activeList: activeList,
    doneList: doneList,
    listItem: listItem,
    activeListBtn: activeListBtn,
    id: listItem.length - 1,
  });
});

app.post("/deletePost", (req, res) => {
  console.log("Delete activated");
  console.log("id: " + req.body.id);
  // console.log(req);
  let name = req.body.name;

  doneList.push(listItem[req.body.id]);
  listItem.splice(req.body.id);

  res.render("index.ejs", {
    activeList: activeList,
    doneList: doneList,
    listItem: listItem,
    activeListBtn: activeListBtn,
    id: listItem.length - 1,
  });
});
app.post("/getDoList", (req, res) => {
  activeListBtn = "";
  if (!activeToDoList) {
    activeListBtn = "active";
    activeToDoList = true;
  } else {
    activeToDoList = false;
  }
  console.log(req.body.listItem);
  //   req.body["todoBtn"].classList.remove("active");
  res.render("index.ejs", {
    activeList: activeList,
    doneList: doneList,
    listItem: listItem,
    activeListBtn: activeListBtn,
    id: listItem.length - 1,
  });
});

app.get("/refresh", (req, res) => {
  doneList = [];
  res.render("index.ejs", {
    activeList: activeList,
    doneList: doneList,
    listItem: listItem,
    activeListBtn: activeListBtn,
    id: listItem.length - 1,
  });
});
