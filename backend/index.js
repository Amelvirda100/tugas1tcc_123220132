import express from "express";
import cors from "cors";
import UserRouters from "./routes/UserRoutes.js";
import router from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["https://g-13-450802.uc.r.appspot.com"], // <- Diganti sama alamat front-end
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRouters);
app.use(router);   

app.listen(5000, () => console.log("Server connected"));
