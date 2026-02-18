document.addEventListener("DOMContentLoaded", function () {

  const codeArea = document.getElementById("codeArea");
  const reviewBtn = document.getElementById("reviewBtn");
  const optimizeBtn = document.getElementById("optimizeBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const loader = document.getElementById("loader");

  const originalBlock = document.getElementById("originalBlock");
  const optimizedBlock = document.getElementById("optimizedBlock");

  function escapeHTML(str) {
    return str.replace(/&/g,"&amp;")
              .replace(/</g,"&lt;")
              .replace(/>/g,"&gt;");
  }

  function detectLanguage(code) {
    if (code.includes("#include")) return "cpp";
    if (code.includes("System.out")) return "java";
    if (code.includes("def ")) return "python";
    if (code.includes("function ")) return "javascript";
    return "javascript";
  }

  reviewBtn.addEventListener("click", async function () {

    const code = codeArea.value.trim();
    if (!code) return alert("Enter code first.");

    const language = detectLanguage(code);

    loader.style.display = "block";
    originalBlock.innerHTML = "";
    optimizedBlock.innerHTML = "";

    try {

      const response = await fetch("http://localhost:5000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Review this " + language + " code:\n\n" + code
        })
      });

      const data = await response.json();
      loader.style.display = "none";

      if (!response.ok) {
        originalBlock.innerText = data.error || "Backend error";
        return;
      }

      originalBlock.innerHTML =
        `<pre><code class="language-${language}">` +
        escapeHTML(data.choices[0].message.content) +
        `</code></pre>`;

      Prism.highlightAll();

    } catch (err) {
      loader.style.display = "none";
      originalBlock.innerText = "Connection error.";
    }

  });

  optimizeBtn.addEventListener("click", async function () {

    const code = codeArea.value.trim();
    if (!code) return alert("Enter code first.");

    const language = detectLanguage(code);

    loader.style.display = "block";

    originalBlock.innerHTML =
      `<pre><code class="language-${language}">` +
      escapeHTML(code) +
      `</code></pre>`;

    try {

        const response = await fetch("http://localhost:5000/review", {
          method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: "Optimize this " + language + " code:\n\n" + code
        })
      });

      const data = await response.json();
      loader.style.display = "none";

      if (!response.ok) {
        optimizedBlock.innerText = data.error || "Backend error";
        return;
      }

      const optimized = data.choices[0].message.content;

      optimizedBlock.innerHTML =
        `<pre><code class="language-${language}">` +
        escapeHTML(optimized) +
        `</code></pre>`;

      Prism.highlightAll();

      downloadBtn.style.display = "block";
      downloadBtn.onclick = function () {
        const blob = new Blob([optimized], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "optimized_code.txt";
        a.click();
        URL.revokeObjectURL(url);
      };

    } catch (err) {
      loader.style.display = "none";
      optimizedBlock.innerText = "Connection error.";
    }

  });

});
