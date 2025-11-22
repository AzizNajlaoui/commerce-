import { Router } from "express";
import { getAllPorducts } from "./product.controller";
import { isAdmin } from "@/middlewares/auth.middleware";

const router: Router = Router();

router.get("/", isAdmin, getAllPorducts);

export default router;
