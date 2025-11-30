
function getActivities() {
  let data = localStorage.getItem('achievements');
  return data ? JSON.parse(data) : [];
}


function updateDashboard() {
  const activities = getActivities();
  document.getElementById("total-activities").textContent = activities.length;
  document.getElementById("approved-activities").textContent = activities.filter(a => a.status === "Approved").length;
  document.getElementById("pending-activities").textContent = activities.filter(a => a.status === "Pending").length;

  const recentList = document.getElementById("recent-activities-list");
  recentList.innerHTML = "";
  activities.slice(0, 5).forEach(act => {
    console.log('Activity:', act.title, '| Proof:', act.proof);
    const li = document.createElement("li");
    li.style.marginBottom = "1rem";
    li.innerHTML = `<div style='font-weight:600;'>${act.title}</div>
      <div style='font-size:0.95rem; color:#888;'>${act.date} | <span style='color:${act.status === "Approved" ? "#00b894" : "#fdcb6e"}; font-weight:600;'>${act.status}</span></div>
      ${act.proof ? `<div style='margin-top:0.5rem;'><img src='${act.proof}' alt='Proof' style='max-width:120px; max-height:80px; border-radius:8px; box-shadow:0 1px 4px rgba(80,80,180,0.10);'></div>` : ''}`;
    recentList.appendChild(li);
  });

  const categoryCounts = { Sports: 0, Technical: 0, Cultural: 0, Volunteering: 0 };
  activities.forEach(a => { if (categoryCounts[a.category] !== undefined) categoryCounts[a.category]++; });
  if (window.Chart) {
    const ctx = document.getElementById("activities-chart").getContext("2d");
    if (window.activitiesChart) window.activitiesChart.destroy();
    window.activitiesChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(categoryCounts),
        datasets: [{
          data: Object.values(categoryCounts),
          backgroundColor: ["#4078c0", "#00b894", "#fdcb6e", "#6c5ce7"],
        }]
      },
      options: {
        plugins: { legend: { position: "bottom" } },
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", updateDashboard);
