# 🚀 InspectraAI  
### AI-Powered Code Review Chrome Extension (Local AI + Full-Stack Architecture)

InspectraAI is a production-grade Chrome Extension that provides AI-powered code review and optimization using a locally hosted Large Language Model (LLM) via Ollama.

It enables developers to:

- 🔍 Detect logical bugs
- ⚡ Optimize performance
- 📊 Analyze time & space complexity
- 🧠 Improve code quality
- 🖥️ Use a full-screen editor mode
- 🔐 Run AI fully locally (no API costs)

---

## 🧠 Architecture

```
Chrome Extension (Frontend)
        ↓
Node.js + Express Backend (localhost:5000)
        ↓
Ollama Local LLM (localhost:11434)
```

### Why This Architecture?

- No external API costs
- No exposed API keys
- Fully offline AI inference
- Clean separation between frontend and backend
- Production-style backend routing
- Manifest V3 compliant extension

---

## 🔥 Features

### 🖥 Full Editor Mode
- Dedicated full-screen workspace
- Structured AI review output
- Clean developer-friendly UI

### 🔎 AI Code Review
- Logical bug detection
- Optimization suggestions
- Performance improvements
- Structured feedback sections

### ⚡ Code Optimization
- Refactored implementations
- Cleaner structure suggestions
- Improved readability

### 📦 Utilities
- Copy review output
- Download optimized code
- Local AI inference
- Zero cloud dependency

---

## 🛠 Tech Stack

### Frontend (Chrome Extension)
- HTML
- CSS
- JavaScript
- Chrome Extension Manifest V3
- Prism.js (Syntax Highlighting)

### Backend
- Node.js
- Express.js
- CORS Configuration
- REST API Routing

### AI Engine
- Ollama
- DeepSeek-Coder Model

---

## 💻 Local Setup Instructions

### 1️⃣ Install Ollama

Download from:

https://ollama.com

Verify installation:

```bash
ollama --version
```

---

### 2️⃣ Pull AI Model

For lightweight systems:

```bash
ollama pull deepseek-coder:1.3b
```

For stronger systems (16GB+ RAM):

```bash
ollama pull deepseek-coder:6.7b
```

---

### 3️⃣ Start Backend

Navigate to backend folder:

```bash
node server.js
```

You should see:

```
Server running on port 5000
```

---

### 4️⃣ Load Chrome Extension

1. Open Chrome
2. Go to:

```
chrome://extensions
```

3. Enable **Developer Mode**
4. Click **Load Unpacked**
5. Select extension folder

Extension is now ready.

---

## 🔐 Security Design

- No API keys required
- No cloud calls
- All AI inference runs locally
- No user code is stored
- CORS configured safely for extension communication

---



## 🎯 Use Cases

- Students preparing for coding interviews
- Competitive programmers
- Developers debugging algorithms
- Code quality improvement
- Offline AI-assisted development

---

## 🚀 Future Improvements

- Git-style diff viewer
- Complexity auto-detection
- AI streaming responses
- Language auto-detection
- Web version deployment
- SaaS version with authentication

---

## 👨‍💻 Author

Dhyan Shah  
Computer Science Student  
Full-Stack & AI Enthusiast  

---

## 📜 License

MIT License

---

## 🧠 What This Project Demonstrates

- Chrome Extension Development (Manifest V3)
- Full-Stack Architecture Design
- Local LLM Integration
- Backend API Routing
- CORS Configuration
- Secure System Design
- Production-Level Debugging

---

If you found this project interesting, feel free to fork and contribute.
