// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";

// import notesRoutes from "./routes/notesRoutes.js";
// import { connectDB } from "./config/db.js";

//  dotenv.config();


// const app = express();
// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// // middleware
// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: "https://mern-thinkboard-eight.vercel.app/",
//       credentials: true
      
//     })
//   );
// }
// app.use(express.json()); // this middleware will parse JSON bodies: req.body

// app.use("/api/notes", notesRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("Server started on PORT:", PORT);
//   });
// });


// mongodb+srv://vkugatheesan:8ld54RtdSbpYAGbE@cluster0.3ghphly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// === MIDDLEWARES ===

// Enable CORS always for Vercel frontend
app.use(
  cors({
    origin: "https://mern-thinkboard-eight.vercel.app",
    credentials: true,
  })
);

// JSON parser
app.use(express.json());

// API routes
app.use("/api/notes", notesRoutes);

// Root test route - for Render base URL
app.get("/", (req, res) => {
  res.send(" Backend API is running on Render");
});

// === Serve static frontend build (optional) ===
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// === Connect DB and Start Server ===
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
