import express from "express";
import { login, logout, singup, updateProfile, checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const route = express();

route.post("/singup", singup);
route.post("/login", login);
route.post("/logout", logout);

route.put("/update-profile", protectRoute, updateProfile);

route.get("/check", protectRoute, checkAuth);

export default route;
