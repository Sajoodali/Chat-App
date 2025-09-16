import express from "express";
import { login, logout, singup } from "../controllers/auth.controller.js";

const route = express();

route.post("/singup", singup);

route.post("/login", login);

route.post("/logout", logout);

export default route;
