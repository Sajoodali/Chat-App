import express from "express";

const route = express();

route.get("/singin", (req, res) => {
  res.send("this is singin page!");
});

route.get("/login", (req, res) => {
  res.send("this is login page!");
});

route.get("/logout", (req, res) => {
  res.send("log out");
});

export default route;
