import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const port = 3000;
const upload = multer({ dest: "uploads/" });

let harData = null; // store HAR JSON after upload

app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true,
  })
);
app.use(express.json());

app.use(express.static("public"));
app.use(cookieParser());

// Upload HAR file
app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading HAR file:", err);
      return res.status(500).json({ error: "Failed to read HAR file" });
    }

    try {
      harData = JSON.parse(data); // store HAR JSON globally
      res.json({ message: "HAR file uploaded successfully" });
    } catch (parseErr) {
      console.error("Error parsing HAR file:", parseErr);
      res.status(500).json({ error: "Invalid HAR file" });
    }
  });
});

// Get analytics from HAR file
app.get("/data", (req, res) => {
  if (!harData) {
    return res.status(400).json({ error: "No HAR file uploaded yet" });
  }

  let totalLogsToday = 0;
  let successCount = 0;
  let activeServers = new Set();
  let activeAlerts = 0;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  for (const entry of harData.log.entries) {
    const entryDate = new Date(entry.startedDateTime)
      .toISOString()
      .split("T")[0];

    
      totalLogsToday++;
    

    if (entry.response.status == 200) {
      successCount++;
    }

    if (entry.serverIPAddress) {
      activeServers.add(entry.serverIPAddress);
    }

    if (entry.response && entry.response.status >= 400) {
      activeAlerts++;
    }
  }

  res.json({
    totalLogsToday,
    successCount,
    activeServers: activeServers.size,
    activeAlerts,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
