import express from "express";
import cors from "cors";
import UserRouters from "./routes/UserRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(UserRouters);

app.listen(5000, () => console.log("Server running on port 5000"));
