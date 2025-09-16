import express from "express";
import { login, logout, singup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const route = express();

route.post("/singup", singup);
route.post("/login", login);
route.post("/logout", logout);

route.get("/update-profile", protectRoute, updateProfile);

export default route;
