import express from "express";
import {
  getuserforSidebar,
  getMessages,
  SendMessages,

} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const route = express.Router();

route.get("/users", protectRoute, getuserforSidebar);
route.get("/:id", protectRoute, getMessages);

route.post("/send/:id", protectRoute, SendMessages);

export default route;
