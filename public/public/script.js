async function searchVendor() {
  const query = document.getElementById("searchInput").value;
  const res = await fetch(`/api/search?phone=${query}&bankAccount=${query}&socialHandle=${query}`);
  const data = await res.json();

  const resultsDiv = document.getElementById("searchResults");
  if (data.length === 0) {
    resultsDiv.innerHTML = "<p>No scam reports found.</p>";
  } else {
    resultsDiv.innerHTML = data.map(r => `
      <div>
        <p><strong>Phone:</strong> ${r.phone || "N/A"}</p>
        <p><strong>Bank Account:</strong> ${r.bankAccount || "N/A"}</p>
        <p><strong>Social Handle:</strong> ${r.socialHandle || "N/A"}</p>
        <p><strong>Description:</strong> ${r.description}</p>
        <p><em>Date:</em> ${new Date(r.date).toLocaleString()}</p>
      </div>
      <hr>
    `).join("");
  }
}

async function submitReport() {
  const report = {
    phone: document.getElementById("phone").value,
    bankAccount: document.getElementById("bankAccount").value,
    socialHandle: document.getElementById("socialHandle").value,
    description: document.getElementById("description").value,
  };

  const res = await fetch("/api/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  const data = await res.json();
  document.getElementById("reportStatus").innerText = data.message;
}
