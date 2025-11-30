// Achievements demo data
let achievements = [
  { title: "Football Tournament", category: "Sports", date: "2025-09-20", proof: "", status: "Approved" },
  { title: "Hackathon", category: "Technical", date: "2025-09-18", proof: "", status: "Pending" },
  { title: "Music Fest", category: "Cultural", date: "2025-09-15", proof: "", status: "Approved" },
  { title: "Blood Donation", category: "Volunteering", date: "2025-09-10", proof: "", status: "Approved" },
  { title: "Robotics Workshop", category: "Technical", date: "2025-09-05", proof: "", status: "Rejected" }
];

function renderAchievements() {
  const list = document.getElementById("achievements-list");
  if (!list) return;
  const search = document.getElementById("achievement-search").value.toLowerCase();
  const cat = document.getElementById("achievement-category-filter").value;
  const stat = document.getElementById("achievement-status-filter").value;
  list.innerHTML = "";
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
        ${a.proof ? `<a href='${a.proof}' target='_blank' style='color:#4078c0;'>View</a>` : `<input type='file' class='proof-upload' style='margin-top:0.3rem;'>`}
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
          a.proof = URL.createObjectURL(file);
          renderAchievements();
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
  // ...existing code...
  ["achievement-search", "achievement-category-filter", "achievement-status-filter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", renderAchievements);
    if (el && el.tagName === "SELECT") el.addEventListener("change", renderAchievements);
  });
  renderAchievements();
});
function showSection(section) {
  document.getElementById("dashboard-summary").style.display = section === "dashboard" ? "block" : "none";
  document.getElementById("dashboard-section").style.display = section === "dashboard" ? "block" : "none";
  document.getElementById("achievements-section").style.display = section === "achievements" ? "block" : "none";
  document.getElementById("add-activity-section").style.display = section === "add-activity" ? "block" : "none";
  document.getElementById("profile-section").style.display = section === "profile" ? "block" : "none";
}

// Attach showSection to dashboard nav link
window.addEventListener("DOMContentLoaded", function() {
  updateDashboard();
  // Default: show dashboard
  showSection("dashboard");
  // Attach to nav links
  const dashboardLink = document.querySelector('[onclick*="showSection(\'dashboard\')"]');
  if (dashboardLink) {
    dashboardLink.addEventListener("click", function(e) {
      e.preventDefault();
      showSection("dashboard");
    });
  }
});
// Dashboard demo data
const activities = [
  { title: "Football Tournament", date: "2025-09-20", status: "Approved", category: "Sports" },
  { title: "Hackathon", date: "2025-09-18", status: "Pending", category: "Technical" },
  { title: "Music Fest", date: "2025-09-15", status: "Approved", category: "Cultural" },
  { title: "Blood Donation", date: "2025-09-10", status: "Approved", category: "Volunteering" },
  { title: "Robotics Workshop", date: "2025-09-05", status: "Pending", category: "Technical" }
];

function updateDashboard() {
  // Stat cards
  document.getElementById("total-activities").textContent = activities.length;
  document.getElementById("approved-activities").textContent = activities.filter(a => a.status === "Approved").length;
  document.getElementById("pending-activities").textContent = activities.filter(a => a.status === "Pending").length;

  // Recent activities
  const recentList = document.getElementById("recent-activities-list");
  recentList.innerHTML = "";
  activities.slice(0, 5).forEach(act => {
    const li = document.createElement("li");
    li.style.marginBottom = "1rem";
    li.innerHTML = `<div style='font-weight:600;'>${act.title}</div>
      <div style='font-size:0.95rem; color:#888;'>${act.date} | <span style='color:${act.status === "Approved" ? "#00b894" : "#fdcb6e"}; font-weight:600;'>${act.status}</span></div>`;
    recentList.appendChild(li);
  });

  // Chart data
  const categoryCounts = { Sports: 0, Technical: 0, Cultural: 0, Volunteering: 0 };
  activities.forEach(a => { categoryCounts[a.category]++; });
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
window.onload = function() {
  setupAuthEvents();
};

function setupAuthEvents() {
  let showSignUp = false;
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const toggleBtn = document.getElementById('toggle-form');
  const formTitle = document.getElementById('form-title');

  toggleBtn.addEventListener('click', function() {
    showSignUp = !showSignUp;
    if (showSignUp) {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      formTitle.textContent = 'Sign Up';
      toggleBtn.textContent = 'Already have an account? Login';
    } else {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
      formTitle.textContent = 'Login';
      toggleBtn.textContent = "Don't have an account? Sign Up";
    }
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const error = document.getElementById('login-error');
    error.textContent = '';
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      error.textContent = 'Login successful!';
      // Redirect or show dashboard here
    } else {
      error.textContent = 'Invalid credentials';
    }
  });

  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const error = document.getElementById('signup-error');
    error.textContent = '';
    if (password !== confirm) {
      error.textContent = 'Passwords do not match';
      return;
    }
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      error.textContent = 'Email already exists';
      return;
    }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    error.textContent = 'Sign up successful! You can now login.';
    setTimeout(() => {
      toggleBtn.click();
    }, 1000);
  });
}
