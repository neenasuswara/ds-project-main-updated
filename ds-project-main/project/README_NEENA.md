# P. Neena Suswara — Advanced Data Science Studio

A customized, futuristic computational portal and digital laboratory designed for B.Tech Data Science (Academic Year 2026) at Mohan Babu University.

---

## Academic Credentials
- **Student Name:** P. Neena Suswara
- **Roll Number:** 24102A030091
- **Programme:** B.Tech in Data Science (3rd Year, Section 2)
- **Institution:** Mohan Babu University
- **Core Subject:** Data Science
- **Faculty Mentor / Guide:** Prof. S. Bosu Babu (Assistant Professor, Department of Data Science)

---

## Key Innovations & Distinct Features

### 1. Completely New Signature Design & Theme (Obsidian & Neon Horizon)
- Replaced the generic light paper theme with a high-tech **Obsidian Cosmos & Neon Glassmorphism** visual system.
- Smooth toggle between **Dark Horizon** and **Light Crystal** themes (persisted in localStorage).
- Modern typography pairing: **Outfit** (headings), **Plus Jakarta Sans** (body), and **JetBrains Mono** (code).
- Dynamic glowing borders, 3D card tilt effects, ambient radial glow, and refined micro-interactions.

### 2. Innovative 3D Home Experience
- Interactive **Three.js WebGL 3D Neural Constellation**: An animated 3D geodesic wireframe sphere with rotating orbital data rings, particle clouds, and interactive mouse-drag rotation.
- Procedural fallback engine ensuring smooth 3D visuals even when running offline.
- **Dynamic Command Center**: Key performance indicator (KPI) metric matrix, academic mentor tribute honoring **Prof. S. Bosu Babu**, live global search engine with instant keyboard autocomplete, and an embedded quick-code execution terminal.

### 3. Navigation with Distinct Icons for All Components
Every primary component is paired with an attractive, crisp visual icon:
- 🏠 **Home**
- 📖 **Modules**
- ⚡ **Experiments**
- 🚀 **Projects**
- 📑 **Resources**
- 🛠️ **Tools**
- 🎓 **Student Profile**
- ℹ️ **About**

### 4. Realistic 3D Book Flip (Modules)
- Interactive **3D Book Simulation** that allows reading modules like a real physical hardcover book:
  - Realistic book spine, center crease shading, dual-page layout (Left & Right pages), and smooth page-turn transitions (`rotateY(-180deg)`).
  - Flip controls via interactive page click, Next/Prev/First/Last buttons, or keyboard arrow keys (`←`, `→`).
  - **Dual Reader Modes**:
    1. *Interactive Textbook Mode*: Formatted syllabus topics, learning objectives, Python examples, takeaways, and study notes.
    2. *PDF.js 3D Flipbook Mode*: Renders the 15-page module PDF directly onto 3D flipping sheets.
    3. *Continuous Vertical View & Direct PDF Download*.

### 5. Multi-Language Execution Sandbox (4 Languages)
Every laboratory experiment and sub-experiment runs in four languages:
- 🐍 **Python**: Executes client-side inside the browser using Pyodide (supports NumPy, Pandas, Matplotlib, Seaborn, and scikit-learn) with live chart image generation.
- ☕ **Java**: Compiles and runs through isolated sandbox APIs with standard input support.
- 🅒 **C Language**: Compiles and executes via sandbox with formatted console outputs.
- ⚡ **C++**: Compiles and executes modern C++ code via sandbox.
- **Smart Offline Simulator**: Built-in intelligent simulation fallback that guarantees instant, accurate terminal outputs during presentations even if offline or behind strict college firewalls.

---

## How to Run Locally

### Option 1: Using Python Built-in Server (Recommended)
1. Open PowerShell or Terminal in the `project` folder:
   ```bash
   cd c:\Users\NEENA\Downloads\Neena_Suswara_DataScience_Studio\project
   python -m http.server 8000
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:8000
   ```

### Option 2: Using VS Code Live Server
1. Open the `project` folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

---

## Project Structure
```
project/
├── index.html            # 3D Interactive Home Command Center
├── modules.html          # Curriculum Modules Catalogue
├── module.html           # 3D Book Flip Module Reader & PDF.js
├── experiments.html      # 4-Language Compiler Sandbox & Catalogue
├── experiment.html       # Single Lab Unit with Sub-Experiment Switcher
├── subexperiment.html    # Detailed Sub-Experiment Workbench (A–G)
├── projects.html         # Project Studio with Add/Edit Capabilities
├── resources.html        # Curated Documentation & Study Library
├── tools.html            # Interactive Technology Matrix
├── student.html          # Digital Holographic Student ID Card
├── about.html            # Scholar Bio & Academic Portfolio
├── css/
│   ├── style.css         # Signature Obsidian Glassmorphism System
│   └── lab3d.css         # 3D Book Flip Engine & Three.js Canvas
├── js/
│   ├── data.js           # Student, Modules, and 42 Experiments Data
│   ├── config.js         # Compiler Sandbox Endpoints Configuration
│   ├── code-samples.js   # 4-Language Code (Python, Java, C, C++) for 42 Subs
│   ├── app.js            # Core Application Routing & View Renderers
│   └── lab3d.js          # Three.js 3D Scene, Book Flip & Code Execution
└── assets/
    ├── images/           # MBU Crest & Profile Assets
    └── modules/          # 15-Page Study Guide PDFs (module 1 to 5)
```
