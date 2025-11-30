// Achievements demo data

function getAchievements() {
  let data = localStorage.getItem('achievements');
  if (data) return JSON.parse(data);
  // If localStorage is empty, return an empty array (no demo data after delete)
  return [];
}

function renderAchievements() {
  const list = document.getElementById("achievements-list");
  if (!list) return;
  const search = document.getElementById("achievement-search").value.toLowerCase();
  const cat = document.getElementById("achievement-category-filter").value;
  const stat = document.getElementById("achievement-status-filter").value;
  list.innerHTML = "";
  const achievements = getAchievements();
  achievements.filter(a => {
    return (!search || a.title.toLowerCase().includes(search)) &&
      (!cat || a.category === cat) &&
      (!stat || a.status === stat);
  }).forEach(a => {
    const card = document.createElement("div");
    card.style.background = "#fff";
    card.style.borderRadius = "14px";
    card.style.boxShadow = "0 2px 8px rgba(80,80,180,0.10)";
    card.style.padding = "1.2rem 1.5rem";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.gap = "0.7rem";
    card.innerHTML = `
      <div style='font-weight:700; font-size:1.1rem;'>${a.title}</div>
      <div><span style='padding:0.3rem 0.8rem; border-radius:8px; font-size:0.95rem; font-weight:600; background:${badgeColor(a.category)}; color:#fff;'>${a.category}</span></div>
      <div style='color:#888;'>${a.date}</div>
      <div>
        <label style='font-weight:600;'>Proof:</label>
        ${a.proof ? (a.proof.startsWith('data:') ? `<a href='${a.proof}' target='_blank' style='color:#4078c0;'>View</a>` : `<a href='${a.proof}' target='_blank' style='color:#4078c0;'>View</a>`) : `<input type='file' class='proof-upload' style='margin-top:0.3rem;'>`}
      </div>
      <div><span style='padding:0.3rem 0.8rem; border-radius:8px; font-size:0.95rem; font-weight:600; background:${statusColor(a.status)}; color:#fff;'>${a.status}</span></div>
    `;
    list.appendChild(card);
    // Proof upload handler
    const fileInput = card.querySelector('.proof-upload');
    if (fileInput) {
      fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(evt) {
            a.proof = evt.target.result;
            // Save updated proof to localStorage
            const achievements = getAchievements();
            const idx = achievements.findIndex(act => act.title === a.title && act.date === a.date);
            if (idx !== -1) {
              achievements[idx].proof = a.proof;
              localStorage.setItem('achievements', JSON.stringify(achievements));
            }
            renderAchievements();
          };
          reader.readAsDataURL(file);
        }
      });
    }
  });
}

function badgeColor(cat) {
  return cat === "Sports" ? "#4078c0" : cat === "Technical" ? "#00b894" : cat === "Cultural" ? "#fdcb6e" : "#6c5ce7";
}
function statusColor(stat) {
  return stat === "Approved" ? "#00b894" : stat === "Pending" ? "#fdcb6e" : "#d63031";
}

window.addEventListener("DOMContentLoaded", function() {
  ["achievement-search", "achievement-category-filter", "achievement-status-filter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderAchievements);
    if (el && el.tagName === "SELECT") el.addEventListener("change", renderAchievements);
  });
  renderAchievements();
});
