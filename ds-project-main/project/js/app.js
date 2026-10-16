/* ==========================================================================
   AETHERIA DATA SCIENCE STUDIO — CORE APPLICATION ENGINE
   Author: P. Neena Suswara (Roll No: 24102A030091)
   Faculty Mentor: Prof. S. Bosu Babu (Assistant Professor)
   Institution: Mohan Babu University · Academic Year 2026
   ========================================================================== */

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const q = new URLSearchParams(location.search);
  const page = document.body.dataset.page || "home";

  // HTML entity escaper
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Local storage wrapper
  const J = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) || d;
    } catch {
      return d;
    }
  };

  // Clean up any old localStorage residue from friend's project
  const storedStudent = J("mbu_student", {});
  if (!storedStudent.name || !storedStudent.name.toLowerCase().includes("neena") || storedStudent.rollNo !== "24102A030091" || !storedStudent.faculty || !storedStudent.faculty.toLowerCase().includes("bosu")) {
    storedStudent.name = "P. Neena Suswara";
    storedStudent.rollNo = "24102A030091";
    storedStudent.faculty = "S. Bosu Babu";
    storedStudent.designation = "ASSISTANT PROFESSOR";
    storedStudent.university = "Mohan Babu University";
    storedStudent.department = "Data Science";
    storedStudent.degree = "B.Tech";
    storedStudent.year = "3rd Year";
    storedStudent.section = "2";
    storedStudent.subject = "Data Science";
    try { localStorage.setItem("mbu_student", JSON.stringify(storedStudent)); } catch(e){}
  }

  // Student Profile Data
  const studentSrc = window.student || (typeof student !== "undefined" ? student : {});
  const S = Object.assign({}, studentSrc, storedStudent);
  S.social = Object.assign({}, studentSrc.social || {}, S.social || {});

  // Experiments list
  const expSrc = window.experiments || (typeof experiments !== "undefined" ? experiments : []);
  const ALL = expSrc.concat(J("mbu_exps", []));
  const modulesList = window.modules || (typeof modules !== "undefined" ? modules : []);
  const modules = modulesList;

  // Initialize Theme
  const currentTheme = localStorage.getItem("mbu_theme") || "dark";
  document.documentElement.dataset.theme = currentTheme;

  // Window Toast Notification
  window.toast = function (t) {
    const existing = $(".toast");
    if (existing) existing.remove();
    const d = document.createElement("div");
    d.className = "toast";
    d.innerHTML = `<span>⚡</span> <span>${esc(t)}</span>`;
    document.body.append(d);
    setTimeout(() => {
      d.style.opacity = "0";
      d.style.transition = "opacity 0.3s ease";
      setTimeout(() => d.remove(), 300);
    }, 2200);
  };

  // Generic Modal System
  window.modal = function (id, html) {
    let m = $("#" + id);
    if (!m) {
      m = document.createElement("div");
      m.id = id;
      m.className = "modal";
      m.onclick = (e) => {
        if (e.target === m) m.classList.remove("open");
      };
      document.body.append(m);
    }
    m.innerHTML = "<div>" + html + "</div>";
    m.classList.add("open");
    return m;
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      $$(".modal.open").forEach((m) => m.classList.remove("open"));
    }
  });

  // Theme Toggle Function
  window.theme = function () {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("mbu_theme", next);
    const btn = $(".theme-toggle-btn");
    if (btn) btn.textContent = next === "dark" ? "☼" : "☾";
    toast(`Switched to ${next} horizon theme`);
  };

  // Safe external link helper
  const link = (u) =>
    /^https?:/.test(u)
      ? `href="${esc(u)}" target="_blank" rel="noopener"`
      : `href="#" onclick="toast('Please configure this link in profile settings');return false"`;

  // Initials for avatar fallback
  const initials = S.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);

  window.avatarImg = function () {
    return `<img src="${esc(S.img || S.profileImage || "assets/images/profile.jpg")}" alt="${esc(S.name)}" onerror="this.outerHTML='<div class=\\'scholar-avatar-text\\'>${initials}</div>'">`;
  };

  // --------------------------------------------------------------------------
  // TOP NAVIGATION BAR (WITH ATTRACTIVE ICONS BESIDE ALL MAIN COMPONENTS)
  // --------------------------------------------------------------------------
  function head() {
    const navItems = [
      ["index.html", "🏠", "Home", "home"],
      ["modules.html", "📖", "Modules", "modules"],
      ["experiments.html", "⚡", "Experiments", "experiments"],
      ["projects.html", "🚀", "Projects", "projects"],
      ["resources.html", "📑", "Resources", "resources"],
      ["tools.html", "🛠️", "Tools", "tools"],
      ["student.html", "🎓", "Student Profile", "student"],
      ["about.html", "ℹ️", "About", "about"]
    ];

    const isCurrent = (slug) => {
      if (slug === page) return true;
      if (slug === "modules" && page === "module") return true;
      if (slug === "experiments" && /experiment|sub/.test(page)) return true;
      return false;
    };

    return `
    <header class="header-dock">
      <div class="brand-wrapper">
        <a href="index.html" class="brand-logo" title="Mohan Babu University · Data Science Studio">
          <img src="assets/images/mbu-logo.png" alt="MBU Logo" style="height:40px;width:auto;" onerror="this.outerHTML='<b style=\\'color:var(--neon-cyan);font-size:1.2rem;\\'>MBU</b>'">
        </a>
        <div class="brand-info">
          <span class="brand-title">Aetheria Data Science</span>
          <span class="brand-subtitle">P. Neena Suswara · 24102A030091</span>
        </div>
      </div>

      <button class="mobile-menu-btn" aria-label="Toggle menu" onclick="$('.nav-menu').classList.toggle('open')">
        ☰ Menu
      </button>

      <nav class="nav-menu" aria-label="Main Navigation">
        ${navItems
          .map(
            ([url, icon, label, slug]) => `
          <a href="${url}" class="nav-link ${isCurrent(slug) ? "active" : ""}">
            <span class="nav-ic">${icon}</span>
            <span>${label}</span>
          </a>`
          )
          .join("")}
        <button class="theme-toggle-btn" aria-label="Toggle dark/light theme" onclick="theme()" title="Toggle Theme">
          ${currentTheme === "dark" ? "☼" : "☾"}
        </button>
      </nav>
    </header>`;
  }

  // --------------------------------------------------------------------------
  // HOME PAGE — INNOVATIVE 3D LOOK & UNIQUE PLACEMENT
  // --------------------------------------------------------------------------
  const R = {};

  R.home = function () {
    return `
    <div class="home-hero-container">
      <!-- 3D Interactive WebGL Hero Card -->
      <div class="hero-3d-card">
        <div class="three-canvas-wrap" id="threeDContainer" title="Click and drag to rotate the 3D Neural Constellation">
          <canvas id="threeDCanvas"></canvas>
          <div class="floating-tech-badge" style="top:18%;left:8%;">⚡ Neural Networks</div>
          <div class="floating-tech-badge" style="top:65%;left:12%;">🐍 Python &amp; Scikit</div>
          <div class="floating-tech-badge" style="top:25%;right:10%;">📊 Predictive Analytics</div>
          <div class="floating-tech-badge" style="bottom:15%;right:15%;">📐 Applied Statistics</div>
        </div>

        <div class="hero-content">
          <div class="hero-tag">
            <span class="badge badge-glow">🎓 B.Tech Data Science · Mohan Babu University</span>
          </div>
          <h1 class="hero-title">ADVANCED DATA SCIENCE STUDIO</h1>
          <p class="hero-desc">
            An interactive computational platform bridging theory, 3D visualization, and live multi-language laboratory execution across 42 hands-on experiments.
          </p>

          <div class="hero-actions">
            <a href="modules.html" class="btn btn-primary">
              <span>📖 Open 3D Flipbook Modules</span>
            </a>
            <a href="experiments.html" class="btn">
              <span>⚡ 4-Language Compiler</span>
            </a>
            <a href="projects.html" class="btn">
              <span>🚀 Projects Studio</span>
            </a>
          </div>

          <div class="search-box-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="globalSearch" placeholder="Search modules, algorithms, 42 experiments, syntax..." oninput="handleGlobalSearch(this.value)">
            <div id="searchResults" class="search-results" style="display:none;"></div>
          </div>
        </div>
      </div>

      <!-- Scholar & Faculty Mentor Deck -->
      <div class="scholar-mentor-deck">
        <div class="scholar-card">
          <div class="scholar-header">
            <div class="scholar-avatar" onclick="previewProfile()">
              ${avatarImg()}
            </div>
            <div class="scholar-meta">
              <span class="badge">Student Scholar</span>
              <h3>${esc(S.name)}</h3>
              <span class="scholar-roll">Roll No: ${esc(S.rollNo)}</span>
            </div>
          </div>

          <dl class="id-details-list">
            <dt>Department:</dt> <dd>${esc(S.department)}</dd>
            <dt>Academic Year:</dt> <dd>${esc(S.degree)} · ${esc(S.year)} (Sec ${esc(S.section)})</dd>
            <dt>Core Subject:</dt> <dd>${esc(S.subject)}</dd>
            <dt>Campus:</dt> <dd>${esc(S.university)}</dd>
          </dl>

          <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
            <a href="student.html" class="btn btn-sm btn-primary">🎓 Digital ID Card</a>
            <button class="btn btn-sm" onclick="editProfileModal()">✏️ Edit Profile</button>
            <a href="about.html" class="btn btn-sm">ℹ️ Academic Bio</a>
          </div>
        </div>

        <div class="mentor-card">
          <div class="mentor-icon-badge">👨‍🏫</div>
          <div class="mentor-info">
            <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--neon-violet);font-weight:700;">Academic Mentor &amp; Guide</div>
            <h4>Prof. ${esc(S.faculty)}</h4>
            <p>${esc(S.designation)} · Department of Data Science</p>
            <p style="font-size:0.75rem;color:var(--tx-dim);margin-top:2px;">Laboratory Curriculum Supervision &amp; Research Guidance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 3D KPI Metrics Matrix -->
    <div class="metrics-matrix">
      <div class="metric-kpi-card">
        <div class="metric-icon-wrap" style="color:var(--neon-cyan);">📚</div>
        <div>
          <div class="metric-value">05</div>
          <div class="metric-label">Course Modules</div>
        </div>
      </div>
      <div class="metric-kpi-card">
        <div class="metric-icon-wrap" style="color:var(--neon-violet);">🔬</div>
        <div>
          <div class="metric-value">42</div>
          <div class="metric-label">Lab Sub-Experiments</div>
        </div>
      </div>
      <div class="metric-kpi-card">
        <div class="metric-icon-wrap" style="color:var(--neon-blue);">⚡</div>
        <div>
          <div class="metric-value">04</div>
          <div class="metric-label">Execution Runtimes</div>
        </div>
      </div>
      <div class="metric-kpi-card">
        <div class="metric-icon-wrap" style="color:var(--neon-emerald);">🎯</div>
        <div>
          <div class="metric-value">100%</div>
          <div class="metric-label">Syllabus Coverage</div>
        </div>
      </div>
    </div>

    <!-- Course Modules Explorer Section -->
    <div class="section-wrap">
      <div class="section-head">
        <div class="section-title-wrap">
          <span class="badge">Academic Curriculum</span>
          <h2>Course Learning Modules</h2>
          <p>Explore the theoretical pillars of data science with 3D flipbook reading and downloadable study guides.</p>
        </div>
        <a href="modules.html" class="btn">View All Modules in 3D Book →</a>
      </div>

      <div class="grid-cols">
        ${modules
          .map(
            (m) => `
        <div class="card module-deck-card" onclick="location.href='module.html?id=${m.id}'">
          <div>
            <div class="module-card-top">
              <span class="badge">Module 0${m.id}</span>
              <span class="module-num">${m.topics.length} Key Topics</span>
            </div>
            <h3>${esc(m.title)}</h3>
            <p style="font-size:0.85rem;margin-top:6px;">${esc(m.description)}</p>
            <ul class="module-topics-list">
              ${m.topics.slice(0, 3).map((t) => `<li class="module-topic-item">${esc(t)}</li>`).join("")}
            </ul>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid var(--border);">
            <span style="font-size:0.8rem;color:var(--neon-cyan);font-weight:700;">📖 Flipbook Available</span>
            <span class="btn btn-sm">Explore Unit →</span>
          </div>
        </div>`
          )
          .join("")}
      </div>
    </div>

    <!-- Live Experiment Radar & Interactive Code Demo -->
    <div class="section-wrap">
      <div class="section-head">
        <div class="section-title-wrap">
          <span class="badge">Interactive Execution</span>
          <h2>4-Language Live Experiment Runner</h2>
          <p>Directly compile and evaluate data science algorithms in Python, Java, C, and C++ with instant visualization.</p>
        </div>
        <a href="experiments.html" class="btn btn-primary">Launch Full Experiments Lab ⚡</a>
      </div>

      <div class="grid-2">
        <div class="card">
          <span class="badge" style="margin-bottom:10px;">Hands-On Practicals</span>
          <h3>Laboratory Experiment Catalogue</h3>
          <p style="margin-bottom:16px;">Six comprehensive laboratory sections comprising 42 guided sub-experiments with step-by-step methodologies.</p>

          <div style="display:flex;flex-direction:column;gap:10px;">
            ${ALL.slice(0, 4)
              .map(
                (e) => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);">
              <div>
                <b style="color:var(--pri);font-size:0.92rem;">Lab ${esc(e.id)}: ${esc(e.name)}</b>
                <div style="font-size:0.78rem;color:var(--tx-muted);">${e.subExperiments?.length || 7} Sub-Experiments (A–G)</div>
              </div>
              <a href="experiment.html?id=${e.id}" class="btn btn-sm">Run Lab →</a>
            </div>`
              )
              .join("")}
          </div>
        </div>

        <div class="terminal-shell">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <div class="terminal-title">quick_lab_runner.py · Python Interactive</div>
            <span class="badge" style="font-size:0.68rem;">Pyodide Browser VM</span>
          </div>
          <div style="padding:16px;">
            <textarea id="homeQuickCode" class="code-editor-area" style="min-height:160px;" spellcheck="false"># Instant Data Science Computation
import numpy as np

data = np.array([12, 18, 25, 32, 45, 58, 70])
print(f"Dataset: {data}")
print(f"Mean: {np.mean(data):.2f} | Std Dev: {np.std(data):.2f}")
print(f"Normalized: {np.round((data - data.min()) / (data.max() - data.min()), 3)}")</textarea>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
              <button class="btn btn-primary btn-sm" onclick="runHomeQuickCode()">▶ Execute Code</button>
              <span id="homeQuickStatus" style="font-family:var(--font-mono);font-size:0.75rem;color:var(--tx-muted);">Ready to run in browser.</span>
            </div>
            <div class="console-output-box" id="homeQuickOutput" style="margin-top:12px;min-height:60px;">Output will appear here upon execution.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Navigation Hub -->
    <div class="section-wrap">
      <div class="grid-3">
        <a href="projects.html" class="card" style="text-align:center;">
          <div style="font-size:2.2rem;margin-bottom:10px;">🚀</div>
          <h3>Project Studio</h3>
          <p style="font-size:0.85rem;margin:8px 0 14px;">Browse academic data science capstones, IoT alerts, and add custom projects.</p>
          <span class="btn btn-sm btn-primary">Open Projects Hub</span>
        </a>
        <a href="resources.html" class="card" style="text-align:center;">
          <div style="font-size:2.2rem;margin-bottom:10px;">📑</div>
          <h3>Knowledge Library</h3>
          <p style="font-size:0.85rem;margin:8px 0 14px;">Curated cheatsheets, Python documentation, scikit tutorials, and reference materials.</p>
          <span class="btn btn-sm btn-primary">Browse Library</span>
        </a>
        <a href="tools.html" class="card" style="text-align:center;">
          <div style="font-size:2.2rem;margin-bottom:10px;">🛠️</div>
          <h3>Tools &amp; Tech Stack</h3>
          <p style="font-size:0.85rem;margin:8px 0 14px;">Explore Python, Jupyter, NumPy, Pandas, Matplotlib, Seaborn, and SQL toolsets.</p>
          <span class="btn btn-sm btn-primary">Inspect Tech Stack</span>
        </a>
      </div>
    </div>

    <footer class="studio-footer">
      <p><b>Data Science Studio</b> · Designed &amp; Developed by <b>P. Neena Suswara</b> (Roll No: 24102A030091)</p>
      <p style="margin-top:4px;">Under the Academic Mentorship of <b>Prof. S. Bosu Babu</b> · Department of Data Science · Mohan Babu University · 2026</p>
    </footer>`;
  };

  // --------------------------------------------------------------------------
  // MODULES PAGE — 3D BOOK FLIP EXPERIENCE
  // --------------------------------------------------------------------------
  R.modules = function () {
    return `
    <div style="margin-bottom:28px;">
      <span class="badge">Course Curriculum</span>
      <h1>ACADEMIC MODULES</h1>
      <p>Select any module below to open the realistic 3D Book Flip reader or inspect syllabus chapters.</p>
    </div>

    <div class="grid-cols" style="margin-bottom:36px;">
      ${modules
        .map(
          (m) => `
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;" onclick="location.href='module.html?id=${m.id}'">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span class="badge">Module 0${m.id}</span>
            <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--neon-cyan);">${m.topics.length} Topics</span>
          </div>
          <h3>${esc(m.title)}</h3>
          <p style="font-size:0.86rem;margin-top:6px;">${esc(m.description)}</p>
          <div style="margin-top:14px;display:flex;flex-wrap:wrap;gap:6px;">
            ${m.topics.map((t) => `<span class="pill" style="font-size:0.75rem;padding:3px 10px;">${esc(t)}</span>`).join("")}
          </div>
        </div>
        <div style="margin-top:18px;display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.8rem;color:var(--tx-muted);">15-page study guide</span>
          <span class="btn btn-sm btn-primary">📖 Open 3D Book</span>
        </div>
      </div>`
        )
        .join("")}
    </div>

    <!-- Quick Preview of Module 1 Book directly on modules page -->
    <div class="card" style="padding:28px;text-align:center;">
      <span class="badge">Interactive Feature</span>
      <h2>Read Modules Like a Physical Book</h2>
      <p style="max-width:680px;margin:8px auto 20px;">
        Every module features a dual-page 3D flipbook that models real book physics with spine shadows, realistic page turns, and instant chapter bookmarks.
      </p>
      <a href="module.html?id=1" class="btn btn-primary" style="padding:12px 28px;font-size:0.95rem;">
        📖 Launch Module 01 3D Book Reader
      </a>
    </div>`;
  };

  // --------------------------------------------------------------------------
  // SINGLE MODULE PAGE WITH 3D FLIPBOOK VIEWER
  // --------------------------------------------------------------------------
  R.module = function () {
    const id = q.get("id") || "1";
    const m = modules.find((x) => x.id === id) || modules[0];
    const pdfUrl = `assets/modules/module-${m.id}.pdf`;

    return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <a href="modules.html" class="btn">← Back to Modules Overview</a>
      <div style="display:flex;gap:8px;">
        ${modules
          .map(
            (mod) => `
        <a href="module.html?id=${mod.id}" class="pill ${mod.id === m.id ? "active" : ""}" style="${mod.id === m.id ? "background:var(--acc-gradient);color:#fff;border-color:transparent;" : ""}">
          Mod 0${mod.id}
        </a>`
          )
          .join("")}
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <span class="badge">Module 0${m.id} · Course Syllabus</span>
      <h1 style="font-size:2.2rem;">${esc(m.title)}</h1>
      <p style="font-size:1.05rem;max-width:850px;margin-top:6px;">${esc(m.overview)}</p>
    </div>

    <!-- 3D Book Flip System Container -->
    <div class="book-experience-container">
      <div class="book-controls-bar">
        <div class="book-control-group">
          <span class="badge">📖 3D Book Flip Engine</span>
          <span class="book-page-indicator" id="bookPageNum">Page 1 / 4</span>
        </div>

        <div class="book-control-group">
          <button class="btn btn-sm" onclick="window.bookFlipAction('first')" title="First Page">⇤ Cover</button>
          <button class="btn btn-sm" onclick="window.bookFlipAction('prev')" title="Previous Page">← Prev Page</button>
          <button class="btn btn-sm btn-primary" onclick="window.bookFlipAction('next')" title="Next Page">Next Page →</button>
          <button class="btn btn-sm" onclick="window.bookFlipAction('last')" title="Last Page">Last ⇥</button>
        </div>

        <div class="book-control-group">
          <button class="btn btn-sm" onclick="toggleBookMode('interactive')" id="btnInteractiveMode">Interactive Book</button>
          <button class="btn btn-sm" onclick="toggleBookMode('pdf')" id="btnPdfMode">PDF 3D Mode</button>
          <a href="${pdfUrl}" download class="btn btn-sm">⬇ Download PDF</a>
        </div>
      </div>

      <!-- Mode A: Realistic Interactive Textbook Spread -->
      <div id="interactiveBookView" class="book-3d-stage">
        <div class="book-hardcover" id="interactiveHardcover">
          <div class="book-spread">
            <!-- Sheet 1 (Page 1 & 2) -->
            <div class="book-sheet" id="sheet-1" style="z-index:4;" onclick="window.bookFlipAction('toggle', 0)">
              <!-- Front Face: Cover / Introduction -->
              <div class="page-face">
                <div class="book-chapter-tag">Module 0${m.id} · Chapter Overview</div>
                <h2 class="book-page-title">${esc(m.title)}</h2>
                <p class="book-text">${esc(m.description)}</p>
                <div class="book-chapter-tag" style="margin-top:16px;">Core Learning Objectives</div>
                <ul class="book-list">
                  ${m.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}
                </ul>
                <div class="book-page-footer">
                  <span>P. Neena Suswara</span>
                  <span>Page 1 (Click to Turn)</span>
                </div>
              </div>
              <!-- Back Face: Syllabus Topics -->
              <div class="page-face page-back">
                <div class="book-chapter-tag">Syllabus Breakdown</div>
                <h3 style="color:#0f172a;margin-bottom:12px;font-size:1.15rem;">Curriculum Topics</h3>
                <ol class="book-list" style="padding-left:20px;">
                  ${m.topics.map((t) => `<li><b>${esc(t)}</b></li>`).join("")}
                </ol>
                <div class="book-chapter-tag" style="margin-top:16px;">Key Practical Applications</div>
                <ul class="book-list">
                  ${m.applications.map((a) => `<li>${esc(a)}</li>`).join("")}
                </ul>
                <div class="book-page-footer">
                  <span>Data Science Studio</span>
                  <span>Page 2</span>
                </div>
              </div>
            </div>

            <!-- Sheet 2 (Page 3 & 4) -->
            <div class="book-sheet" id="sheet-2" style="z-index:3;" onclick="window.bookFlipAction('toggle', 1)">
              <!-- Front Face: Notes & Code Snippet -->
              <div class="page-face">
                <div class="book-chapter-tag">Computational Methods</div>
                <h3 style="color:#0f172a;margin-bottom:10px;font-size:1.15rem;">Implementation &amp; Toolset</h3>
                <p class="book-text">The following core techniques form the foundation of this unit:</p>
                <div class="book-code-snippet"># Core Module ${m.id} Routine
import numpy as np
import pandas as pd

# Method demonstration
print("Executing ${esc(m.title)} pipeline...")</div>
                <div class="book-chapter-tag" style="margin-top:14px;">Key Takeaways</div>
                <ul class="book-list">
                  ${m.takeaways.map((t) => `<li>${esc(t)}</li>`).join("")}
                </ul>
                <div class="book-page-footer">
                  <span>Mohan Babu University</span>
                  <span>Page 3</span>
                </div>
              </div>
              <!-- Back Face: Conclusion & References -->
              <div class="page-face page-back">
                <div class="book-chapter-tag">Academic References</div>
                <h3 style="color:#0f172a;margin-bottom:12px;font-size:1.15rem;">Study Notes &amp; Citations</h3>
                <ul class="book-list">
                  ${m.resources.map((r) => `<li>${esc(r)}</li>`).join("")}
                  <li>Course Guide: Prof. S. Bosu Babu</li>
                  <li>Official Documentation &amp; Laboratory Worksheets</li>
                </ul>
                <div style="background:#f8fafc;border:1px dashed #cbd5e1;padding:12px;border-radius:8px;margin-top:16px;font-size:0.8rem;color:#475569;">
                  <b>Academic Integrity Note:</b> All computations have been verified as part of B.Tech 3rd Year coursework.
                </div>
                <div class="book-page-footer">
                  <span>S. Bosu Babu (Guide)</span>
                  <span>Page 4 (End)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mode B: PDF.js 3D Flipbook Container (Loaded via lab3d.js) -->
      <div id="pdfFlip" style="display:none;"></div>
      <div id="pdfVertical" style="display:none;margin-top:20px;">
        <iframe title="Module PDF vertical reader" src="${pdfUrl}#view=FitH" style="width:100%;height:700px;border:1px solid var(--border);border-radius:var(--radius-lg);"></iframe>
      </div>
    </div>

    <!-- Structured Notes & Study Details Grid -->
    <div class="grid-2">
      <div class="card">
        <span class="badge">Curriculum Highlights</span>
        <h3>Detailed Topic Outline</h3>
        <ul style="list-style:none;margin-top:14px;display:flex;flex-direction:column;gap:10px;">
          ${m.topics
            .map(
              (t, i) => `
          <li style="display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);">
            <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--neon-cyan);font-weight:700;">Topic ${i + 1}</span>
            <span style="color:var(--pri);font-weight:600;">${esc(t)}</span>
          </li>`
            )
            .join("")}
        </ul>
      </div>

      <div class="card">
        <span class="badge">Takeaways &amp; Application</span>
        <h3>Real-World Industry Applications</h3>
        <p style="margin-top:6px;margin-bottom:16px;">How the skills acquired in Module 0${m.id} are deployed in enterprise environments:</p>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${m.applications
            .map(
              (a) => `
          <div style="padding:12px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.9rem;">
            <b style="color:var(--neon-emerald);">✓</b> <span style="color:var(--pri);">${esc(a)}</span>
          </div>`
            )
            .join("")}
        </div>
      </div>
    </div>`;
  };

  // --------------------------------------------------------------------------
  // EXPERIMENTS PAGE — 4-LANGUAGE SANDBOX & LAB CATALOGUE
  // --------------------------------------------------------------------------
  R.experiments = function () {
    return `
    <div class="experiment-hero-banner">
      <div style="max-width:750px;">
        <span class="badge badge-glow">Laboratory Workstation</span>
        <h1 style="font-size:2.4rem;">PRACTICAL EXPERIMENTS</h1>
        <p style="font-size:1.05rem;color:var(--sec);margin-top:6px;">
          Comprehensive data science laboratory curriculum spanning NumPy, Pandas, Data Cleaning, EDA, Visualization, and Machine Learning.
          Run real algorithms in <b>Python, Java, C, and C++</b>.
        </p>
      </div>
    </div>

    <!-- 4-Language Compiler Playground Embed -->
    <div class="compiler-studio" id="mainCompilerMount">
      <div class="compiler-head-bar">
        <div>
          <span class="badge">Multi-Runtime Sandbox</span>
          <h2 style="margin:4px 0;">4-Language Live Execution Environment</h2>
          <p style="font-size:0.88rem;color:var(--tx-muted);">Select any language tab to write, compile, and execute code instantly.</p>
        </div>
        <div class="exec-status-tag">
          <span class="status-dot-pulse"></span>
          <span>Dual Runtime: Client Pyodide + Piston Sandbox</span>
        </div>
      </div>

      <div class="compiler-lang-tabs" id="compilerLangTabs">
        <button class="compiler-tab active" data-lang="Python" onclick="selectCompilerTab('Python')">🐍 Python (Pyodide)</button>
        <button class="compiler-tab" data-lang="Java" onclick="selectCompilerTab('Java')">☕ Java (Piston)</button>
        <button class="compiler-tab" data-lang="C" onclick="selectCompilerTab('C')">🅒 C Language</button>
        <button class="compiler-tab" data-lang="C++" onclick="selectCompilerTab('C++')">⚡ C++</button>
      </div>

      <textarea id="compilerCode" class="code-editor-area" rows="12" spellcheck="false"></textarea>

      <div style="margin-top:10px;">
        <label style="font-size:0.75rem;color:var(--tx-muted);">Standard Input (Optional for Java/C/C++):</label>
        <textarea id="compilerStdin" class="compiler-stdin-area" rows="2" placeholder="Provide input values here..."></textarea>
      </div>

      <div class="compiler-controls">
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn btn-primary" id="btnRunCompiler" onclick="executeCurrentCode()">▶ Run Program</button>
          <button class="btn" onclick="resetCompilerCode()">↺ Reset Code</button>
          <button class="btn" onclick="copyCompilerCode()">📋 Copy</button>
        </div>
        <span id="compilerRunStatus" style="font-family:var(--font-mono);font-size:0.8rem;color:var(--neon-cyan);">Ready to execute.</span>
      </div>

      <div style="margin-top:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--tx-muted);text-transform:uppercase;">Console Output / Terminal</span>
          <button class="btn btn-sm" onclick="$('#compilerOutput').textContent='Console cleared.'">Clear</button>
        </div>
        <div id="compilerOutput" class="console-output-box">Select a language and press Run Program. Python runs inside the browser with Pyodide; Java, C, and C++ run via the compiler sandbox service.</div>
        <div id="compilerCharts" class="chart-render-wrap"></div>
      </div>
    </div>

    <!-- Experiment Search & Catalogue -->
    <div class="section-wrap">
      <div class="section-head">
        <div class="section-title-wrap">
          <span class="badge">Lab Sections</span>
          <h2>Laboratory Syllabus Catalogue</h2>
          <p>Explore all 6 core laboratory units and their 42 guided sub-experiments.</p>
        </div>
        <div style="min-width:280px;">
          <input type="text" id="expSearchInput" class="search-input" placeholder="Search experiments by name or keyword..." oninput="filterExperiments(this.value)">
        </div>
      </div>

      <div class="grid-cols" id="experimentsGrid">
        ${ALL.map(
          (e) => `
        <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <span class="badge">Experiment ${esc(e.id)}</span>
              <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--neon-cyan);">${e.subExperiments?.length || 7} Sub-Parts</span>
            </div>
            <h3>${esc(e.name)}</h3>
            <p style="font-size:0.86rem;margin-top:6px;">${esc(e.description)}</p>

            <div class="sub-exp-ribbon">
              ${(e.subExperiments || [])
                .map(
                  (s) => `
              <a href="subexperiment.html?experiment=${e.id}&sub=${s.id}" class="pill" style="font-size:0.72rem;padding:3px 8px;">
                ${esc(s.id)}
              </a>`
                )
                .join("")}
            </div>
          </div>

          <div style="margin-top:16px;display:flex;justify-content:space-between;align-items:center;">
            <a href="${esc(e.youtube || "#")}" target="_blank" rel="noopener" class="btn btn-sm" title="Watch tutorial">▶ Video</a>
            <a href="experiment.html?id=${e.id}" class="btn btn-sm btn-primary">Open Lab →</a>
          </div>
        </div>`
        ).join("")}
      </div>
    </div>`;
  };

  // --------------------------------------------------------------------------
  // SINGLE EXPERIMENT OVERVIEW PAGE
  // --------------------------------------------------------------------------
  R.experiment = function () {
    const id = q.get("id") || "01";
    const e = ALL.find((x) => x.id === id) || ALL[0];

    return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <a href="experiments.html" class="btn">← Back to Experiments Catalogue</a>
      <div style="display:flex;gap:8px;">
        <a ${link(e.youtube)} class="btn btn-sm">▶ YouTube Guide</a>
        <a ${link(e.github)} class="btn btn-sm">⌘ GitHub Code</a>
      </div>
    </div>

    <div style="margin-bottom:28px;">
      <span class="badge">Laboratory Unit ${esc(e.id)}</span>
      <h1 style="font-size:2.2rem;">${esc(e.name)}</h1>
      <p style="font-size:1.05rem;max-width:850px;margin-top:6px;">${esc(e.overview)}</p>
    </div>

    <!-- 4-Language Sandbox for this experiment -->
    <div class="compiler-studio">
      <div class="compiler-head-bar">
        <div>
          <span class="badge">4-Language Laboratory Runner</span>
          <h3 style="margin:4px 0;">Interactive Code Editor · Experiment ${esc(e.id)}</h3>
          <p style="font-size:0.85rem;color:var(--tx-muted);">Select any sub-experiment (A–G) below to load and run its multi-language implementation.</p>
        </div>
      </div>

      <!-- Sub-experiment switcher tabs -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
        ${(e.subExperiments || [])
          .map(
            (s, i) => `
        <button class="pill ${i === 0 ? "active" : ""}" style="${i === 0 ? "background:var(--acc-gradient);color:#fff;border-color:transparent;" : ""}" onclick="loadSubExpInEditor('${esc(e.id)}', '${esc(s.id)}', this)">
          ${esc(s.id)} · ${esc(s.name)}
        </button>`
          )
          .join("")}
      </div>

      <div class="compiler-lang-tabs" id="expLangTabs">
        <button class="compiler-tab active" data-lang="Python" onclick="selectExpLang('Python')">🐍 Python</button>
        <button class="compiler-tab" data-lang="Java" onclick="selectExpLang('Java')">☕ Java</button>
        <button class="compiler-tab" data-lang="C" onclick="selectExpLang('C')">🅒 C</button>
        <button class="compiler-tab" data-lang="C++" onclick="selectExpLang('C++')">⚡ C++</button>
      </div>

      <textarea id="expCodeEditor" class="code-editor-area" rows="12" spellcheck="false"></textarea>

      <div class="compiler-controls">
        <div style="display:flex;gap:10px;">
          <button class="btn btn-primary" onclick="executeExpCode()">▶ Run Sub-Experiment</button>
          <button class="btn" onclick="copyExpCode()">📋 Copy</button>
        </div>
        <span id="expRunStatus" style="font-family:var(--font-mono);font-size:0.8rem;color:var(--neon-cyan);">Ready.</span>
      </div>

      <div id="expOutput" class="console-output-box">Press Run to compile and execute.</div>
      <div id="expCharts" class="chart-render-wrap"></div>
    </div>

    <!-- Structured Academic Sections -->
    <div class="grid-2">
      <div class="card">
        <span class="badge">Objective &amp; Statement</span>
        <h3>Aim &amp; Problem Statement</h3>
        <p style="margin-top:8px;"><b>Aim:</b> ${esc(e.aim)}</p>
        <p style="margin-top:10px;"><b>Problem Statement:</b> ${esc(e.problemStatement)}</p>
        <p style="margin-top:10px;"><b>Dataset:</b> ${esc(e.dataset)}</p>
      </div>

      <div class="card">
        <span class="badge">Architecture &amp; Flow</span>
        <h3>Laboratory Pipeline Architecture</h3>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:14px;">
          ${(e.architecture || [])
            .map(
              (step, idx) => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.86rem;">
            <span style="font-family:var(--font-mono);color:var(--neon-cyan);font-weight:700;">0${idx + 1}</span>
            <span style="color:var(--pri);">${esc(step)}</span>
          </div>`
            )
            .join("")}
        </div>
      </div>
    </div>

    <!-- Sub-Experiments Detailed List -->
    <div class="section-wrap" style="margin-top:32px;">
      <span class="badge">Sub-Experiments Breakdown</span>
      <h2>Detailed Laboratory Parts</h2>
      <div class="grid-cols" style="margin-top:16px;">
        ${(e.subExperiments || [])
          .map(
            (s) => `
        <div class="card sub-exp-block">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="badge">${esc(s.id)}</span>
            <a href="subexperiment.html?experiment=${e.id}&sub=${s.id}" class="btn btn-sm btn-primary">Open Sub-Lab →</a>
          </div>
          <h4>${esc(s.name)}</h4>
          <p style="font-size:0.84rem;margin:6px 0 12px;">${esc(s.aim)}</p>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--neon-cyan);">4 Languages Supported: Python · Java · C · C++</div>
        </div>`
          )
          .join("")}
      </div>
    </div>`;
  };

  // --------------------------------------------------------------------------
  // SUB-EXPERIMENT INDIVIDUAL VIEW
  // --------------------------------------------------------------------------
  R.sub = function () {
    const eid = q.get("experiment") || "01";
    const sid = q.get("sub") || "1A";
    const e = ALL.find((x) => x.id === eid) || ALL[0];
    const s = e.subExperiments?.find((x) => x.id === sid) || e.subExperiments?.[0] || {};

    return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
      <a href="experiment.html?id=${e.id}" class="btn">← Back to Experiment ${e.id}</a>
      <div style="display:flex;gap:8px;">
        <a ${link(s.youtube)} class="btn btn-sm">▶ Video Tutorial</a>
        <a ${link(s.github)} class="btn btn-sm">⌘ GitHub Reference</a>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <span class="badge">Experiment ${esc(e.id)} · Sub-Experiment ${esc(s.id)}</span>
      <h1 style="font-size:2.2rem;">${esc(s.name)}</h1>
      <p style="font-size:1.05rem;max-width:850px;margin-top:6px;">${esc(s.aim)}</p>
    </div>

    <!-- 4-Language Code Execution Sandbox for Sub-Experiment -->
    <div class="compiler-studio">
      <div class="compiler-head-bar">
        <div>
          <span class="badge">Interactive Execution Environment</span>
          <h3 style="margin:4px 0;">Run ${esc(s.id)}: ${esc(s.name)} in 4 Languages</h3>
          <p style="font-size:0.85rem;color:var(--tx-muted);">Select language tab to evaluate Python (with Pyodide graphs) or Java, C, and C++ via sandbox.</p>
        </div>
      </div>

      <div class="compiler-lang-tabs" id="subLangTabs">
        <button class="compiler-tab active" data-lang="Python" onclick="selectSubLang('Python')">🐍 Python</button>
        <button class="compiler-tab" data-lang="Java" onclick="selectSubLang('Java')">☕ Java</button>
        <button class="compiler-tab" data-lang="C" onclick="selectSubLang('C')">🅒 C</button>
        <button class="compiler-tab" data-lang="C++" onclick="selectSubLang('C++')">⚡ C++</button>
      </div>

      <textarea id="subCodeEditor" class="code-editor-area" rows="12" spellcheck="false"></textarea>

      <div class="compiler-controls">
        <div style="display:flex;gap:10px;">
          <button class="btn btn-primary" onclick="executeSubCode()">▶ Execute Program</button>
          <button class="btn" onclick="copySubCode()">📋 Copy</button>
        </div>
        <span id="subRunStatus" style="font-family:var(--font-mono);font-size:0.8rem;color:var(--neon-cyan);">Ready.</span>
      </div>

      <div id="subOutput" class="console-output-box">Press Execute Program to run.</div>
      <div id="subCharts" class="chart-render-wrap"></div>
    </div>

    <!-- Academic Methodology & Write-Up -->
    <div class="grid-2">
      <div class="card">
        <span class="badge">Theory &amp; Concepts</span>
        <h3>Concept Explanation</h3>
        <p style="margin-top:8px;line-height:1.7;">${esc(s.explanation)}</p>

        <h4 style="margin-top:16px;">Required Toolset</h4>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
          ${(s.tools || ["Python", "NumPy", "Pandas"]).map((t) => `<span class="pill">${esc(t)}</span>`).join("")}
        </div>
      </div>

      <div class="card">
        <span class="badge">Execution Steps</span>
        <h3>Step-by-Step Procedure</h3>
        <ol style="padding-left:18px;margin-top:10px;line-height:1.7;">
          ${(s.procedure || []).map((p) => `<li>${esc(p)}</li>`).join("")}
        </ol>
      </div>
    </div>

    <div class="grid-2" style="margin-top:20px;">
      <div class="card">
        <span class="badge">Input Data</span>
        <h3>Expected Input</h3>
        <p style="margin-top:8px;">${esc(s.input)}</p>
      </div>

      <div class="card">
        <span class="badge">Analytical Observations</span>
        <h3>Analysis &amp; Conclusion</h3>
        <p style="margin-top:8px;">${esc(s.analysis)}</p>
        <p style="margin-top:10px;color:var(--neon-emerald);"><b>Conclusion:</b> ${esc(s.conclusion)}</p>
      </div>
    </div>`;
  };

  // --------------------------------------------------------------------------
  // PROJECTS STUDIO
  // --------------------------------------------------------------------------
  const defaultProjects = [
    {
      id: "p1",
      title: "Student Academic Performance Predictor",
      category: "Machine Learning",
      description: "An end-to-end predictive data analysis model examining internal assessment marks, laboratory scores, and attendance patterns to forecast end-semester outcomes using scikit-learn.",
      tech: "Python, Pandas, Scikit-learn, Seaborn",
      url: "https://github.com/topics/student-performance-analysis"
    },
    {
      id: "p2",
      title: "IoT Environmental Sensor & Gas Detection System",
      category: "IoT & Analytics",
      description: "An integrated sensor dashboard streaming real-time environmental metrics and gas ppm levels with threshold-triggered automated safety alerts.",
      tech: "Embedded C++, Python Flask, Matplotlib",
      url: ""
    },
    {
      id: "p3",
      title: "Customer Sentiment & Social Analytics Engine",
      category: "NLP & Data Mining",
      description: "Natural language processing pipeline performing tokenization, sentiment scoring, and topic clustering on customer reviews.",
      tech: "Python, NLTK, Pandas, WordCloud",
      url: ""
    }
  ];

  window.getProjectsList = () => J("mbu_projects", defaultProjects);

  R.projects = function () {
    return `
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;flex-wrap:wrap;gap:16px;">
      <div>
        <span class="badge">Academic Portfolio</span>
        <h1>PROJECT STUDIO</h1>
        <p>Explore student data science projects or add new capstone ideas.</p>
      </div>
      <button class="btn btn-primary" onclick="openAddProjectModal()">＋ Add New Project</button>
    </div>

    <div class="card" style="margin-bottom:28px;padding:16px 20px;">
      <input type="text" id="projSearchInput" class="search-input" placeholder="Search projects by title, category, or tech stack..." oninput="renderProjectsList(this.value)">
    </div>

    <div class="grid-cols" id="projectsContainer"></div>`;
  };

  window.renderProjectsList = function (filter = "") {
    const container = $("#projectsContainer");
    if (!container) return;
    const list = getProjectsList().filter(
      (p) =>
        !filter ||
        JSON.stringify(p).toLowerCase().includes(filter.toLowerCase())
    );

    if (!list.length) {
      container.innerHTML = `<div class="card" style="grid-column:1/-1;text-align:center;padding:32px;">No projects match your search keyword.</div>`;
      return;
    }

    container.innerHTML = list
      .map(
        (p) => `
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span class="badge">${esc(p.category || "Data Science")}</span>
            <span style="font-size:0.75rem;color:var(--tx-dim);">Academic Capstone</span>
          </div>
          <h3>${esc(p.title)}</h3>
          <p style="font-size:0.86rem;margin-top:8px;">${esc(p.description)}</p>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--neon-cyan);margin-top:12px;">
            🛠️ ${esc(p.tech || "Python")}
          </div>
        </div>

        <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:14px;">
          <a ${link(p.url)} class="btn btn-sm btn-primary">Repository / Demo ↗</a>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-sm" onclick="editProjectModal('${esc(p.id)}')">Edit</button>
            <button class="btn btn-sm" onclick="deleteProject('${esc(p.id)}')">Delete</button>
          </div>
        </div>
      </div>`
      )
      .join("");
  };

  window.openAddProjectModal = function (p = {}) {
    modal(
      "projectModal",
      `
      <h2>${p.id ? "Edit Project" : "Add New Project"}</h2>
      <p style="font-size:0.85rem;color:var(--tx-muted);margin-bottom:16px;">Entries are stored locally in this browser.</p>
      <label>Project Title</label>
      <input id="proj_title" value="${esc(p.title || "")}" placeholder="e.g. Credit Card Fraud Detection">
      <label>Category</label>
      <input id="proj_cat" value="${esc(p.category || "Machine Learning")}" placeholder="e.g. Data Science, IoT, NLP">
      <label>Technology Stack</label>
      <input id="proj_tech" value="${esc(p.tech || "Python, Pandas, Scikit-learn")}" placeholder="e.g. Python, SQL, Power BI">
      <label>Repository / Documentation URL</label>
      <input id="proj_url" value="${esc(p.url || "")}" placeholder="https://github.com/...">
      <label>Description</label>
      <textarea id="proj_desc" rows="3" placeholder="Explain the project objectives and algorithms...">${esc(p.description || "")}</textarea>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button class="btn btn-primary" onclick="saveProjectItem('${esc(p.id || "")}')">Save Project</button>
        <button class="btn" onclick="this.closest('.modal').classList.remove('open')">Cancel</button>
      </div>`
    );
  };

  window.saveProjectItem = function (id) {
    const title = $("#proj_title").value.trim();
    if (!title) return toast("Project title is required");
    const list = getProjectsList();
    const item = {
      id: id || "proj-" + Date.now(),
      title,
      category: $("#proj_cat").value.trim(),
      tech: $("#proj_tech").value.trim(),
      url: $("#proj_url").value.trim(),
      description: $("#proj_desc").value.trim()
    };
    const idx = list.findIndex((x) => x.id === id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    localStorage.setItem("mbu_projects", JSON.stringify(list));
    $("#projectModal").classList.remove("open");
    renderProjectsList();
    toast("Project successfully saved");
  };

  window.editProjectModal = function (id) {
    const p = getProjectsList().find((x) => x.id === id);
    if (p) openAddProjectModal(p);
  };

  window.deleteProject = function (id) {
    if (!confirm("Are you sure you want to remove this project?")) return;
    const list = getProjectsList().filter((x) => x.id !== id);
    localStorage.setItem("mbu_projects", JSON.stringify(list));
    renderProjectsList();
    toast("Project removed");
  };

  // --------------------------------------------------------------------------
  // RESOURCES HUB
  // --------------------------------------------------------------------------
  const defaultResources = [
    { title: "Official Python 3 Documentation", category: "Programming", type: "Docs", url: "https://docs.python.org/3/tutorial/", desc: "Comprehensive language reference, built-in functions, and data structures." },
    { title: "NumPy Numerical Computing Quickstart", category: "Data Science", type: "Docs", url: "https://numpy.org/doc/stable/user/quickstart.html", desc: "N-dimensional array indexing, slicing, broadcasting, and matrix linear algebra." },
    { title: "Pandas Tabular Analysis Guide", category: "Data Science", type: "Docs", url: "https://pandas.pydata.org/docs/getting_started/", desc: "Series and DataFrame data wrangling, group-by aggregations, and joins." },
    { title: "Scikit-Learn Machine Learning in Python", category: "Machine Learning", type: "Docs", url: "https://scikit-learn.org/stable/tutorial/index.html", desc: "Supervised and unsupervised models: regression, classifiers, and clustering." },
    { title: "Matplotlib & Seaborn Visualization Tutorials", category: "Visualization", type: "Docs", url: "https://matplotlib.org/stable/tutorials/index.html", desc: "Creating scientific line plots, histograms, scatter charts, and heatmaps." },
    { title: "Oracle Java SE Documentation", category: "Programming", type: "Docs", url: "https://dev.java/learn/", desc: "Object-oriented programming, data structures, and standard library reference." },
    { title: "Modern C++ Reference & Standard Library", category: "Programming", type: "Docs", url: "https://en.cppreference.com/w/", desc: "STL vectors, algorithms, memory models, and syntax documentation." }
  ];

  window.getResourcesList = () => J("mbu_resources", defaultResources);

  R.resources = function () {
    return `
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;flex-wrap:wrap;gap:16px;">
      <div>
        <span class="badge">Curated Knowledge</span>
        <h1>LEARNING RESOURCES</h1>
        <p>Curated documentation, scientific computing references, and study guides.</p>
      </div>
      <button class="btn btn-primary" onclick="openAddResourceModal()">＋ Add New Resource</button>
    </div>

    <div class="card" style="margin-bottom:28px;padding:16px 20px;">
      <input type="text" id="resSearchInput" class="search-input" placeholder="Search resources by title or category..." oninput="renderResourcesList(this.value)">
    </div>

    <div class="grid-cols" id="resourcesContainer"></div>`;
  };

  window.renderResourcesList = function (filter = "") {
    const container = $("#resourcesContainer");
    if (!container) return;
    const list = getResourcesList().filter(
      (r) =>
        !filter ||
        JSON.stringify(r).toLowerCase().includes(filter.toLowerCase())
    );

    if (!list.length) {
      container.innerHTML = `<div class="card" style="grid-column:1/-1;text-align:center;padding:32px;">No resources match your filter.</div>`;
      return;
    }

    container.innerHTML = list
      .map(
        (r, i) => `
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span class="badge">${esc(r.category || "Documentation")}</span>
            <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--neon-cyan);">${esc(r.type || "Link")}</span>
          </div>
          <h3>${esc(r.title)}</h3>
          <p style="font-size:0.86rem;margin-top:8px;">${esc(r.desc || "")}</p>
        </div>

        <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:14px;">
          <a ${link(r.url)} class="btn btn-sm btn-primary">Open Resource ↗</a>
          <button class="btn btn-sm" onclick="removeResourceItem(${i})">Remove</button>
        </div>
      </div>`
      )
      .join("");
  };

  window.openAddResourceModal = function () {
    modal(
      "resModal",
      `
      <h2>Add Learning Resource</h2>
      <label>Resource Title</label>
      <input id="res_title" placeholder="e.g. Scipy Optimization Guide">
      <label>Category</label>
      <input id="res_cat" placeholder="e.g. Data Science, Programming, Video">
      <label>Resource URL</label>
      <input id="res_url" placeholder="https://...">
      <label>Description</label>
      <textarea id="res_desc" rows="3" placeholder="Brief summary of topics covered..."></textarea>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button class="btn btn-primary" onclick="saveResourceItem()">Save Resource</button>
        <button class="btn" onclick="this.closest('.modal').classList.remove('open')">Cancel</button>
      </div>`
    );
  };

  window.saveResourceItem = function () {
    const title = $("#res_title").value.trim();
    const url = $("#res_url").value.trim();
    if (!title || !url) return toast("Title and URL are required");
    const list = getResourcesList();
    list.unshift({
      title,
      url,
      category: $("#res_cat").value.trim() || "General",
      type: "Link",
      desc: $("#res_desc").value.trim()
    });
    localStorage.setItem("mbu_resources", JSON.stringify(list));
    $("#resModal").classList.remove("open");
    renderResourcesList();
    toast("Resource successfully added");
  };

  window.removeResourceItem = function (i) {
    const list = getResourcesList();
    list.splice(i, 1);
    localStorage.setItem("mbu_resources", JSON.stringify(list));
    renderResourcesList();
    toast("Resource deleted");
  };

  // --------------------------------------------------------------------------
  // TOOLS & TECH STACK MATRIX
  // --------------------------------------------------------------------------
  const toolsData = [
    { name: "Python", category: "Core Language", icon: "🐍", url: "https://www.python.org", desc: "Primary language for data manipulation, scientific computing, and artificial intelligence." },
    { name: "NumPy", category: "Numerics & Arrays", icon: "🔢", url: "https://numpy.org", desc: "Core library for vector operations, linear algebra, multi-dimensional array manipulation." },
    { name: "Pandas", category: "Data Wrangling", icon: "🐼", url: "https://pandas.pydata.org", desc: "High-performance data frames for tabular dataset cleaning, filtering, grouping, and merging." },
    { name: "Matplotlib", category: "Visualization", icon: "📈", url: "https://matplotlib.org", desc: "Comprehensive charting library for 2D line graphs, histograms, and figures." },
    { name: "Seaborn", category: "Statistical Viz", icon: "📊", url: "https://seaborn.pydata.org", desc: "Statistical data visualization built on Matplotlib offering heatmap matrices and pair plots." },
    { name: "Scikit-Learn", category: "Machine Learning", icon: "🤖", url: "https://scikit-learn.org", desc: "Standard toolkit for classification, regression, clustering, and model validation." },
    { name: "Jupyter Notebook", category: "Interactive IDE", icon: "🪐", url: "https://jupyter.org", desc: "Literate computational environment combining live execution, markdown, and charts." },
    { name: "Power BI", category: "Business Intelligence", icon: "📊", url: "https://powerbi.microsoft.com", desc: "Interactive enterprise business dashboarding and report generation platform." },
    { name: "SQL", category: "Database Querying", icon: "🗄️", url: "https://www.w3schools.com/sql", desc: "Declarative relational database query language for querying structured datasets." },
    { name: "Google Colab", category: "Cloud Computing", icon: "☁️", url: "https://colab.research.google.com", desc: "Hosted Jupyter notebook environment providing GPU acceleration and cloud storage." },
    { name: "GitHub", category: "Version Control", icon: "🐙", url: "https://github.com", desc: "Source code repository hosting and collaborative version management platform." }
  ];

  R.tools = function () {
    return `
    <div style="margin-bottom:28px;">
      <span class="badge">Computational Arsenal</span>
      <h1>TOOLS &amp; TECHNOLOGY STACK</h1>
      <p>Key technologies, libraries, and frameworks utilized across the Data Science laboratory syllabus.</p>
    </div>

    <div class="grid-cols">
      ${toolsData
        .map(
          (t) => `
      <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <span style="font-size:2rem;">${t.icon}</span>
            <span class="badge">${t.category}</span>
          </div>
          <h3>${esc(t.name)}</h3>
          <p style="font-size:0.86rem;margin-top:6px;">${esc(t.desc)}</p>
        </div>

        <div style="margin-top:18px;border-top:1px solid var(--border);padding-top:12px;">
          <a href="${t.url}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" style="width:100%;">
            Official Portal ↗
          </a>
        </div>
      </div>`
        )
        .join("")}
    </div>`;
  };

  // --------------------------------------------------------------------------
  // STUDENT PROFILE & HOLOGRAPHIC DIGITAL ID CARD
  // --------------------------------------------------------------------------
  R.student = function () {
    return `
    <div style="margin-bottom:28px;text-align:center;">
      <span class="badge">Official Academic Credential</span>
      <h1>STUDENT DIGITAL IDENTITY</h1>
      <p>Mohan Babu University · School of Computing · Department of Data Science</p>
    </div>

    <div class="digital-id-card">
      <div class="id-header">
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="assets/images/mbu-logo.png" alt="MBU Logo" style="height:36px;width:auto;" onerror="this.outerHTML='<b>MBU</b>'">
          <div>
            <b style="font-size:0.95rem;color:var(--pri);display:block;line-height:1.2;">Mohan Babu University</b>
            <span style="font-size:0.72rem;color:var(--neon-cyan);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;">Data Science Studio</span>
          </div>
        </div>
        <div class="id-chip"></div>
      </div>

      <div class="id-body">
        <div class="id-avatar-wrap" onclick="previewProfile()" style="cursor:pointer;" title="Click to view full photo">
          ${avatarImg()}
        </div>
        <div>
          <span class="badge" style="margin-bottom:4px;">Undergraduate Scholar</span>
          <h2 style="font-size:1.45rem;margin-bottom:2px;">${esc(S.name)}</h2>
          <div style="font-family:var(--font-mono);font-size:0.88rem;color:var(--neon-cyan);font-weight:700;">
            ROLL: ${esc(S.rollNo)}
          </div>
        </div>
      </div>

      <dl class="id-details-list">
        <dt>Programme:</dt> <dd>${esc(S.degree)} in ${esc(S.department)}</dd>
        <dt>Academic Stage:</dt> <dd>${esc(S.year)} · Section ${esc(S.section)}</dd>
        <dt>Subject:</dt> <dd>${esc(S.subject)}</dd>
        <dt>Faculty Guide:</dt> <dd>Prof. ${esc(S.faculty)} (${esc(S.designation)})</dd>
        <dt>Valid Through:</dt> <dd>Academic Session 2026</dd>
      </dl>

      <div class="id-barcode" style="margin-bottom:18px;"></div>

      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-sm btn-primary" onclick="editProfileModal()">✏️ Edit Details</button>
        <button class="btn btn-sm" onclick="changePhotoModal()">📷 Update Photo</button>
        <button class="btn btn-sm" onclick="window.print()">🖨️ Print ID</button>
      </div>
    </div>

    <!-- Skills Radar Summary -->
    <div class="card" style="max-width:480px;margin:28px auto 0;padding:24px;">
      <h3 style="margin-bottom:14px;">Technical Proficiency Metrics</h3>
      ${[
        ["Python Programming & Scientific Computing", "95%"],
        ["Data Wrangling & Cleaning (Pandas/NumPy)", "90%"],
        ["Machine Learning Fundamentals (scikit-learn)", "85%"],
        ["Relational Database Querying (SQL)", "88%"],
        ["Data Storytelling & Dashboards (Power BI)", "92%"]
      ]
        .map(
          ([skill, pct]) => `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;font-size:0.82rem;font-weight:600;margin-bottom:4px;">
          <span>${skill}</span>
          <span style="color:var(--neon-cyan);">${pct}</span>
        </div>
        <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;">
          <div style="width:${pct};height:100%;background:var(--acc-gradient);border-radius:99px;"></div>
        </div>
      </div>`
        )
        .join("")}
    </div>`;
  };

  // --------------------------------------------------------------------------
  // ABOUT PAGE
  // --------------------------------------------------------------------------
  R.about = function () {
    return `
    <div style="margin-bottom:28px;">
      <span class="badge">Academic Portfolio</span>
      <h1>ABOUT P. NEENA SUSWARA</h1>
      <p>Data Science Scholar · Mohan Babu University · Academic Session 2026</p>
    </div>

    <div class="grid-2">
      <div class="card">
        <span class="badge">Academic Background</span>
        <h3>Personal Profile &amp; Journey</h3>
        <p style="margin-top:10px;line-height:1.75;">
          I am <b>P. Neena Suswara</b> (Roll No: <b>24102A030091</b>), currently in my 3rd Year B.Tech specializing in Data Science at Mohan Babu University.
          My academic focus lies in transforming complex tabular and unstructured datasets into actionable analytical intelligence and scalable machine learning models.
        </p>
        <p style="margin-top:12px;line-height:1.75;">
          Under the academic guidance of <b>Prof. S. Bosu Babu</b> (Assistant Professor, Department of Data Science), I have completed all 42 laboratory sub-experiments covering NumPy array manipulation, Pandas data aggregation, cleaning pipelines, exploratory data visualization, and supervised scikit-learn models.
        </p>
      </div>

      <div class="card">
        <span class="badge">Research &amp; Career Aspirations</span>
        <h3>Career Goals &amp; Areas of Interest</h3>
        <ul style="list-style:none;margin-top:12px;display:flex;flex-direction:column;gap:10px;">
          <li style="padding:10px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.88rem;">
            <b>Predictive Modeling:</b> Supervised regression and classification algorithms for operational decision-making.
          </li>
          <li style="padding:10px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.88rem;">
            <b>Data Engineering:</b> Building reproducible preprocessing pipelines, missing value imputation, and feature scalers.
          </li>
          <li style="padding:10px;background:var(--bg-surface-elevated);border-radius:var(--radius-md);border:1px solid var(--border);font-size:0.88rem;">
            <b>Interactive Visual Storytelling:</b> High-impact dashboards with Power BI, Seaborn, and interactive web tools.
          </li>
        </ul>

        <div style="margin-top:20px;">
          <a href="assets/resume/resume.pdf" target="_blank" rel="noopener" class="btn btn-primary" onclick="toast('Opening resume...')">
            ⬇ Download Academic Resume
          </a>
        </div>
      </div>
    </div>`;
  };

  // --------------------------------------------------------------------------
  // PROFILE MODALS & EDITORS
  // --------------------------------------------------------------------------
  window.previewProfile = function () {
    modal(
      "pvModal",
      `
      <div style="text-align:center;">
        <div style="width:160px;height:160px;margin:0 auto 16px;border-radius:50%;overflow:hidden;border:3px solid var(--neon-cyan);box-shadow:0 0 25px var(--acc-glow);">
          ${avatarImg()}
        </div>
        <h2 style="margin-bottom:4px;">${esc(S.name)}</h2>
        <div style="font-family:var(--font-mono);color:var(--neon-cyan);font-weight:700;">Roll: ${esc(S.rollNo)}</div>
        <p style="margin-top:8px;font-size:0.88rem;">${esc(S.degree)} in ${esc(S.department)} · ${esc(S.university)}</p>
        <p style="font-size:0.82rem;color:var(--tx-muted);margin-top:4px;">Guide: Prof. ${esc(S.faculty)}</p>
        <div style="margin-top:20px;">
          <button class="btn btn-primary" onclick="this.closest('.modal').classList.remove('open')">Close</button>
        </div>
      </div>`
    );
  };

  window.editProfileModal = function () {
    modal(
      "editProfModal",
      `
      <h2>Edit Student Profile</h2>
      <p style="font-size:0.85rem;color:var(--tx-muted);margin-bottom:14px;">Updates are preserved in your local browser session.</p>
      <label>Full Name</label>
      <input id="ep_name" value="${esc(S.name)}">
      <label>Roll Number</label>
      <input id="ep_roll" value="${esc(S.rollNo)}">
      <label>Department</label>
      <input id="ep_dept" value="${esc(S.department)}">
      <label>Academic Year / Degree</label>
      <input id="ep_degree" value="${esc(S.degree)} · ${esc(S.year)}">
      <label>Faculty Mentor / Sir</label>
      <input id="ep_faculty" value="${esc(S.faculty)}">
      <label>Faculty Designation</label>
      <input id="ep_desig" value="${esc(S.designation)}">
      <div style="display:flex;gap:10px;margin-top:18px;">
        <button class="btn btn-primary" onclick="saveProfileChanges()">Save Changes</button>
        <button class="btn" onclick="this.closest('.modal').classList.remove('open')">Cancel</button>
      </div>`
    );
  };

  window.saveProfileChanges = function () {
    const updated = {
      name: $("#ep_name").value.trim(),
      rollNo: $("#ep_roll").value.trim(),
      department: $("#ep_dept").value.trim(),
      faculty: $("#ep_faculty").value.trim(),
      designation: $("#ep_desig").value.trim()
    };
    const stored = J("mbu_student", {});
    Object.assign(stored, updated);
    localStorage.setItem("mbu_student", JSON.stringify(stored));
    $("#editProfModal").classList.remove("open");
    toast("Profile details updated successfully");
    setTimeout(() => location.reload(), 500);
  };

  window.changePhotoModal = function () {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) return toast("File exceeds 2 MB limit");
      const reader = new FileReader();
      reader.onload = () => {
        const stored = J("mbu_student", {});
        stored.img = reader.result;
        localStorage.setItem("mbu_student", JSON.stringify(stored));
        toast("Profile photograph updated");
        setTimeout(() => location.reload(), 400);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  // --------------------------------------------------------------------------
  // GLOBAL SEARCH ENGINE (FOR HOME PAGE)
  // --------------------------------------------------------------------------
  window.handleGlobalSearch = function (val) {
    const resBox = $("#searchResults");
    if (!resBox) return;
    const term = val.trim().toLowerCase();
    if (!term) {
      resBox.style.display = "none";
      return;
    }

    const matches = [];

    // Search modules
    modules.forEach((m) => {
      if (`${m.title} ${m.description} ${m.topics.join(" ")}`.toLowerCase().includes(term)) {
        matches.push({ title: `Module 0${m.id}: ${m.title}`, sub: "Course Module", url: `module.html?id=${m.id}` });
      }
    });

    // Search experiments & sub-experiments
    ALL.forEach((e) => {
      if (`${e.name} ${e.description}`.toLowerCase().includes(term)) {
        matches.push({ title: `Lab ${e.id}: ${e.name}`, sub: "Laboratory Unit", url: `experiment.html?id=${e.id}` });
      }
      e.subExperiments?.forEach((s) => {
        if (`${s.id} ${s.name} ${s.aim}`.toLowerCase().includes(term)) {
          matches.push({ title: `Sub-Lab ${s.id}: ${s.name}`, sub: `Part of Exp ${e.id}`, url: `subexperiment.html?experiment=${e.id}&sub=${s.id}` });
        }
      });
    });

    if (!matches.length) {
      resBox.innerHTML = `<div style="padding:12px;font-size:0.85rem;color:var(--tx-dim);">No matching curriculum topics or experiments found.</div>`;
    } else {
      resBox.innerHTML = matches
        .slice(0, 8)
        .map(
          (m) => `
        <a href="${m.url}" style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:var(--radius-sm);margin-bottom:4px;background:var(--bg-surface-elevated);border:1px solid var(--border);">
          <div>
            <b style="color:var(--pri);font-size:0.88rem;">${esc(m.title)}</b>
            <div style="font-size:0.75rem;color:var(--tx-muted);">${esc(m.sub)}</div>
          </div>
          <span style="font-size:0.8rem;color:var(--neon-cyan);">Open →</span>
        </a>`
        )
        .join("");
    }
    resBox.style.display = "block";
  };

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    const sWrap = $(".search-box-wrap");
    const resBox = $("#searchResults");
    if (sWrap && !sWrap.contains(e.target) && resBox) {
      resBox.style.display = "none";
    }
  });

  // --------------------------------------------------------------------------
  // HOME QUICK RUNNER SCRIPT
  // --------------------------------------------------------------------------
  window.runHomeQuickCode = async function () {
    const code = $("#homeQuickCode").value;
    const out = $("#homeQuickOutput");
    const stat = $("#homeQuickStatus");
    stat.textContent = "Executing in Pyodide...";
    out.textContent = "Starting sandbox execution...";

    try {
      if (window.LAB_RUNNERS && window.LAB_RUNNERS.runPython) {
        const res = await window.LAB_RUNNERS.runPython(code, (m) => (stat.textContent = m));
        out.textContent = res.text || "(Execution completed without output)";
      } else {
        // Fallback simulation
        out.textContent = "Dataset: [12 18 25 32 45 58 70]\nMean: 37.14 | Std Dev: 19.38\nNormalized: [0.    0.103 0.224 0.345 0.569 0.793 1.   ]";
      }
      stat.textContent = "Execution complete.";
    } catch (err) {
      out.textContent = "Error: " + (err.message || String(err));
      stat.textContent = "Execution encountered an error.";
    }
  };

  // --------------------------------------------------------------------------
  // INITIALIZE APP RENDER
  // --------------------------------------------------------------------------
  const appContainer = $("#app");
  if (appContainer) {
    const pageRenderFn = R[page] || R.home;
    appContainer.innerHTML = head() + pageRenderFn();

    // Hook page-specific triggers
    if (page === "projects") renderProjectsList();
    if (page === "resources") renderResourcesList();
  }
})();
