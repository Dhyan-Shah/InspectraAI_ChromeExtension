document.addEventListener("DOMContentLoaded", function () {

  const codeArea = document.getElementById("codeArea");
  const reviewBtn = document.getElementById("reviewBtn");
  const optimizeBtn = document.getElementById("optimizeBtn");
  const expandBtn = document.getElementById("expandBtn");
  const openEditor = document.getElementById("openEditor");

  const loader = document.getElementById("loader");
  const copyBtn = document.getElementById("copyBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  const originalBlock = document.getElementById("originalBlock");
  const optimizedBlock = document.getElementById("optimizedBlock");

  // =============================
  // OPEN FULL EDITOR (FIXED)
  // =============================
  openEditor?.addEventListener("click", function () {
    chrome.tabs.create({
      url: chrome.runtime.getURL("editor.html")
    });
  });

  // =============================
  // Escape HTML
  // =============================
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // =============================
  // Language Detection
  // =============================
  function detectLanguage(code) {
    if (code.includes("#include") || code.includes("cout <<")) return "cpp";
    if (code.includes("System.out.println") || code.includes("public class")) return "java";
    if (code.includes("def ")) return "python";
    if (code.includes("function ") || code.includes("console.log")) return "javascript";
    return "javascript";
  }

  // =============================
  // Trim Large Code
  // =============================
  function trimLargeCode(code, maxLength = 3000) {
    if (code.length <= maxLength) return code;
    return code.slice(0, maxLength) +
      "\n\n// NOTE: Code truncated due to length limits.";
  }

  // =============================
  // Expand Mode
  // =============================
  expandBtn?.addEventListener("click", function () {
    document.body.classList.toggle("expanded");
    expandBtn.textContent =
      document.body.classList.contains("expanded")
        ? "Collapse"
        : "Expand";
  });

  // =============================
  // REVIEW MODE
  // =============================
  reviewBtn?.addEventListener("click", async function () {

    const code = codeArea.value.trim();
    if (!code) return alert("No code to review.");

    const language = detectLanguage(code);
    const trimmedCode = trimLargeCode(code);

    loader.style.display = "block";
    originalBlock.innerHTML = "";
    optimizedBlock.innerHTML = "";
    copyBtn.style.display = "none";
    downloadBtn.style.display = "none";

    try {

      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: "Review this " + language + " code:\n\n" + trimmedCode
        })
      });

      const data = await response.json();
      loader.style.display = "none";

      if (!response.ok) {
        originalBlock.innerText = data.error || "Backend error";
        return;
      }

      const result = data.choices[0].message.content;

      originalBlock.innerHTML =
        `<pre><code class="language-${language}">` +
        escapeHTML(result) +
        `</code></pre>`;

      Prism.highlightAll();
      copyBtn.style.display = "block";

    } catch (error) {
      loader.style.display = "none";
      originalBlock.innerText = "Connection error.";
    }

  });

  // =============================
  // OPTIMIZE MODE
  // =============================
  optimizeBtn?.addEventListener("click", async function () {

    const code = codeArea.value.trim();
    if (!code) return alert("No code to optimize.");

    const language = detectLanguage(code);
    const trimmedCode = trimLargeCode(code);

    loader.style.display = "block";

    originalBlock.innerHTML =
      `<pre><code class="language-${language}">` +
      escapeHTML(code) +
      `</code></pre>`;

    optimizedBlock.innerHTML = "";
    copyBtn.style.display = "none";
    downloadBtn.style.display = "none";

    try {

      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: "Optimize this " + language + " code:\n\n" + trimmedCode
        })
      });

      const data = await response.json();
      loader.style.display = "none";

      if (!response.ok) {
        optimizedBlock.innerText = data.error || "Backend error";
        return;
      }

      const optimizedCode = data.choices[0].message.content;

      optimizedBlock.innerHTML =
        `<pre><code class="language-${language}">` +
        escapeHTML(optimizedCode) +
        `</code></pre>`;

      Prism.highlightAll();
      downloadBtn.style.display = "block";

      downloadBtn.onclick = function () {
        const blob = new Blob([optimizedCode], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "optimized_code.txt";
        a.click();
        URL.revokeObjectURL(url);
      };

    } catch (error) {
      loader.style.display = "none";
      optimizedBlock.innerText = "Connection error.";
    }

  });

  // =============================
  // COPY BUTTON
  // =============================
  copyBtn?.addEventListener("click", function () {
    navigator.clipboard.writeText(originalBlock.innerText).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy Review", 1500);
    });
  });

});
