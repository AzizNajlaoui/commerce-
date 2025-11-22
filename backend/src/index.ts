import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import productsRouter from "@/modules/product.routes";
import cors from "cors";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use("/api/products", productsRouter);
/*
app.get("/api/products", productsRouter);
*/
app.get("/", (req, res) => {
  console.log(req.path);
  res.send("hello");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is runing on  port ${PORT}`);
});
