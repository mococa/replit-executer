import dotenv from "dotenv";
import { Replit } from "./replit.js";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/:replitId", async (req, res) => {
  const { command, sid, doneAfter } = req.query;
  const { replitId } = req.params;
  try {
    const replit = await Replit.config(
      sid || process.env.SID,
      replitId
    ).connect();
    const response = await replit.exec(command, !!doneAfter);
    return res.send(response || "ok");
  } catch (err) {
    res.json({ message: "error" });
  }
});

app.listen(3000, () => console.log("App running"));
