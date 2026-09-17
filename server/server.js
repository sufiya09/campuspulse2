require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 5001;

// ================= GEMINI AI =================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());

// ================= USERS =================

const users = [];

// ================= EVENTS =================

const events = [];

// ================= TEST BACKEND =================

app.get("/", (req, res) => {
  res.json({
    message: "Campus Pulse backend is running!",
  });
});

// ==================================================
// REGISTER
// ==================================================

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill in all fields.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters.",
    });
  }

  const existingUser = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return res.status(400).json({
      message:
        "An account with this email already exists.",
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
  };

  users.push(newUser);

  console.log(
    "New user registered:",
    email
  );

  res.status(201).json({
    message: "Registration successful.",

    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

// ==================================================
// LOGIN
// ==================================================

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message:
        "Email and password are required.",
    });
  }

  const user = users.find(
    (user) =>
      user.email.toLowerCase() ===
        email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password.",
    });
  }

  console.log(
    "User logged in:",
    email
  );

  res.json({
    message: "Login successful.",

    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// ==================================================
// AI CHAT
// ==================================================

app.post("/api/ai", async (req, res) => {
  console.log(
    "AI REQUEST RECEIVED:",
    req.body
  );

  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a message.",
      });
    }

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash",

        contents: `
You are Campus Pulse AI, an assistant
for a college campus events website.

Be friendly, concise, and helpful.

You can help users with:
- campus events
- event categories
- event dates
- event locations
- general questions about Campus Pulse

Do not invent specific campus events
or details that were not provided.

If you do not know something,
say so clearly.

User message:
${message}
        `,
      });

    res.json({
      reply: response.text,
    });

  } catch (error) {

    console.error(
      "AI ERROR:",
      error
    );

    res.status(500).json({
      message: "AI service failed.",
    });
  }
});

// ==================================================
// CREATE EVENT
// ==================================================

app.post("/api/events", (req, res) => {

  const {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    location,
    organizer,
    image,
  } = req.body;

  // Check required fields

  if (
    !title ||
    !description ||
    !category ||
    !date ||
    !location ||
    !organizer
  ) {

    return res.status(400).json({
      message:
        "Please fill in all required fields.",
    });

  }

  // Create event

  const newEvent = {

    id: Date.now(),

    title,

    description,

    category,

    date,

    startTime:
      startTime || "",

    endTime:
      endTime || "",

    location,

    organizer,

    image:
      image || "",

    registered: 0,

    createdAt:
      new Date(),
  };

  // Save event

  events.push(newEvent);

  console.log(
    "New event created:",
    newEvent.title
  );

  // Send response

  res.status(201).json({

    message:
      "Event created successfully.",

    event: newEvent,

  });
});

// ==================================================
// GET ALL EVENTS
// ==================================================

app.get("/api/events", (req, res) => {

  res.json(events);

});

// ==================================================
// DELETE EVENT
// ==================================================

app.delete(
  "/api/events/:id",
  (req, res) => {

    const id =
      Number(req.params.id);

    const index =
      events.findIndex(
        (event) =>
          event.id === id
      );

    if (index === -1) {

      return res.status(404).json({
        message:
          "Event not found.",
      });

    }

    events.splice(index, 1);

    console.log(
      "Event deleted:",
      id
    );

    res.json({

      message:
        "Event deleted successfully.",

    });

  }
);

// ==================================================
// START SERVER
// ==================================================

app.listen(
  PORT,
  () => {

    console.log(
      `Campus Pulse server running on http://localhost:${PORT}`
    );

  }
);