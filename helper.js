import express, { Router } from "express";
const router = express.Router();
// router.route("/:id").get((req, res) => {
//   res.send("goushik");
// }).post()
router.get("/name", (req, res) => {
  res.send("goushik");
});
router.get("/:id", (req, res) => {
  res.send(`${req.params.id}`);
});

export default router;
