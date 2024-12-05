import express, { Router } from "express";
import router from "./helper.js";
import cors from "cors";
import { checkEmail, insertDetails } from "./database.js";
// const express = require("express");
// const router = require("./helper")
// app.set("view engine", "ejs");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/submit", async (req, res) => {
  const { name, dob, email, gender } = req.body;
  const emailExists = await checkEmail(email);
  if (emailExists) {
    return res.status(400).json({ errorEmail: "Email already exists" });
  }
  await insertDetails(name, dob, email, gender);
  console.log(req.body);
  res.send(req.body);
});
app.listen(PORT, () => {
  console.log("server started successfully");
});
