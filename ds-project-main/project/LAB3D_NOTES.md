# Lab3D update

## What changed
- **3D theme everywhere** (`css/lab3d.css`): glass cards with depth, raised 3D buttons, tilt-on-hover cards, spinning 3D cube + perspective grid on Home, light/dark modes.
- **4 languages for every experiment** (`js/lab3d.js`, `js/code-samples.js`): every experiment page and every sub-experiment page (1A, 1B, 1C ...) has a Python / Java / C / C++ lab. Each of the 42 sub-experiments has real code in all four languages. Edit it in the browser, press Run (Ctrl+Enter).
  - Python runs inside the browser (Pyodide: NumPy, Pandas, Matplotlib, Seaborn, scikit-learn). Charts appear under the output.
  - Java, C and C++ are compiled by an online service (Piston, with Judge0 as automatic fallback).
- **3D PDF flipbook** on every Module page: real page-turn animation (click a page, Next/Prev, or arrow keys). The "Vertical view" and "Download PDF" are still there.
- **Bug fix:** a stray `async` in `app.js` threw an error and stopped the script, which left pages blank. Removed.

## Run it
Serve the folder (`python -m http.server 8000`) and open http://localhost:8000. Internet is needed for fonts, PDF.js, Pyodide and the Java/C/C++ compiler service.

## Compiler service
Public compiler services can change or rate-limit. For a real deployment run your own Piston server and set `customUrl` in `js/config.js`:
`docker run -d --privileged -p 2000:2000 ghcr.io/engineer-man/piston`, install the languages, then use `http://YOUR_HOST:2000/api/v2/execute`.

## Edit content
- Sub-experiment code: `js/code-samples.js` (`K['1A'] = [C, C++, Java]`; Python comes from `js/data.js`).
- Experiments/modules text: `js/data.js` (unchanged).
