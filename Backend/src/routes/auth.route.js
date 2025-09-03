import express from "express";
import { login, logout, singin } from "../controllers/auth.controller.js";

const route = express();

route.get("/singin", singin);

route.get("/login", login);

route.get("/logout", logout);

export default route;
