// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (replace with your connection string)
mongoose.connect("mongodb://localhost:27017/scamDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema for scam reports
const reportSchema = new mongoose.Schema({
  phone: String,
  bankAccount: String,
  socialHandle: String,
  description: String,
  date: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// API route: search reports
app.get("/api/search", async (req, res) => {
  const { phone, bankAccount, socialHandle } = req.query;
  const query = {};

  if (phone) query.phone = phone;
  if (bankAccount) query.bankAccount = bankAccount;
  if (socialHandle) query.socialHandle = socialHandle;

  const results = await Report.find(query);
  res.json(results);
});

// API route: submit report
app.post("/api/report", async (req, res) => {
  const newReport = new Report(req.body);
  await newReport.save();
  res.json({ message: "Report submitted successfully!" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
