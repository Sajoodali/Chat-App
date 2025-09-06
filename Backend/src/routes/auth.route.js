import express from "express";
import { login, logout, singup } from "../controllers/auth.controller.js";

const route = express();

route.post("/singup", singup);

route.get("/login", login);

route.get("/logout", logout);

export default route;
