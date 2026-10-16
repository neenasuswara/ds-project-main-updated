# Data Science Portal — Enhanced Edition

## Run locally
1. Extract this ZIP.
2. Open a terminal in the `project` folder.
3. Start a local static server, for example `python -m http.server 8000`.
4. Open `http://localhost:8000` in your browser.

The project uses HTML, CSS, JavaScript, and local PDF assets. Internet access is required for Google Fonts, PDF.js, Pyodide, and the online code execution service.

## Included upgrades
- Added Resources and Projects pages and navigation links.
- Added resource search/category filtering and resource creation.
- Added project search, add, edit, and delete UI.
- Added a four-language compiler panel for Python, Java, C, and C++ using the Piston execution API.
- Added quick links to Resources and Projects on Home.
- Updated the design with more depth, responsive cards, gradients, hover motion, and reduced-motion support.
- Improved the PDF flipbook area with a medium-size canvas, page navigation, zoom, and a page-turn transition.

## Important architecture notes
This ZIP is a **static front-end project** and does not include a server, database, or authentication system. Project/resource changes and profile edits are stored in the current browser's localStorage, so they are not shared between users or devices. The Edit controls are not secure role-based access control. To enforce "users can edit only their own details" securely, add authenticated backend APIs and server-side authorization before deploying for real students.

The compiler sends submitted code to the external Piston execution API. Availability depends on that third-party service and the user's internet connection. For a production deployment, route execution through a maintained, secured sandbox backend and configure rate, time, memory, and output limits. Do not submit secrets or sensitive code.
