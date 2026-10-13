# Certificates Directory

Place your certificate files (PDF, JPG, or PNG) here with the following filenames:

1. **Smart India Hackathon (SIH)**:
   - File: `certificates/sih.pdf` (or `sih.jpg`, `sih.png`)
2. **"Unlocking Agentic AI" Workshop (GDG)**:
   - File: `certificates/agentic-ai.pdf` (or `agentic-ai.jpg`, `agentic-ai.png`)
3. **IBM: Data Science Methodology**:
   - File: `certificates/ibm-data-science-methodology.pdf`
4. **IBM: Data Visualization**:
   - File: `certificates/ibm-data-visualization.pdf`

---

### How to Enable Viewing in `script.js`:
Once you place a certificate file in this folder:
1. Open `script.js` in your editor.
2. Find `certificatesConfig` near the top (Line ~43).
3. Change `available: false` to `available: true` for the corresponding certificate:
   ```javascript
   {
     id: "sih",
     title: "Smart India Hackathon (SIH)",
     file: "certificates/sih.pdf",
     available: true // <-- set to true!
   }
   ```
4. If your file is an image instead of a PDF (e.g. `sih.png`), simply change `file: "certificates/sih.png"`.
5. That's it! The button on the website will now open your certificate in a new tab. If left as `false`, the website politely tells visitors "Certificate coming soon!" with a sleek toast message instead of a broken 404 page.
