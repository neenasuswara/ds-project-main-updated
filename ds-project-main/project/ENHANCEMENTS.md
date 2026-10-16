DATA SCIENCE PORTAL - ENHANCEMENTS

Module pages now include a downloadable 15-page PDF study guide, vertical PDF reader, and a PDF.js-powered flip-book page view. PDF.js and Pyodide load from public CDNs and require an internet connection.

Experiment sub-pages now include an editable Python code panel, browser-based execution using Pyodide, output/error display, copy-code action, and a link to the Programiz online compiler. YouTube links are taken from the existing experiment data; populate js/data.js fields with specific video URLs for each experiment.

Open project/index.html in a browser or serve the project folder with a local static web server.


FIXES: The Python runner now detects common scientific imports and loads matching Pyodide packages before execution (NumPy, Pandas, Matplotlib, Seaborn, SciPy, scikit-learn). Sub-experiment YouTube buttons now open a topic-specific YouTube search instead of a placeholder, and GitHub buttons open a topic-specific repository search. Requires internet access.


Enhanced edition updates are documented in UPGRADE_NOTES.md.


## 3D Studio and compiler update
- Added a consistent premium 3D-inspired visual system with layered depth, raised controls, perspective, and hover transitions.
- Added a four-language compiler panel (Python, Java, C, C++) to each experiment overview and each sub-experiment.
- Compiler submissions use the Piston public execution API; a network connection and availability of that service are required. This static project does not include a private server-side compiler proxy.
- Updated sub-experiment labels to human-readable numbering such as 1A, 1B, 1C.
- Enhanced the module PDF flipbook frame and page-turn transition with perspective and page-stack depth.
