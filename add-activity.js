// Save new activity to localStorage and achievements list
function getAchievements() {
  let data = localStorage.getItem('achievements');
  return data ? JSON.parse(data) : [];
}
function saveAchievements(list) {
  localStorage.setItem('achievements', JSON.stringify(list));
}

document.getElementById('add-activity-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('activity-title').value.trim();
  const category = document.getElementById('activity-category').value;
  const date = document.getElementById('activity-date').value;
  const description = document.getElementById('activity-description').value.trim();
  const proofInput = document.getElementById('activity-proof');
  let proof = '';
  if (proofInput.files[0]) {
    const file = proofInput.files[0];
    const reader = new FileReader();
    reader.onload = function(evt) {
      proof = evt.target.result;
      saveActivity();
    };
    reader.readAsDataURL(file);
  } else {
    saveActivity();
  }

  function saveActivity() {
    // Get user profile name from localStorage (assume key 'profileName')
    let profileName = localStorage.getItem('profileName');
    if (!profileName) {
      // fallback: try to get from profile popup if available
      const nameEl = document.getElementById('profile-name-view');
      profileName = nameEl ? nameEl.textContent : 'Unknown';
    }
    const newActivity = {
      title,
      category,
      date,
      description,
      proof,
      status: 'Pending',
      student: profileName
    };
    console.log('Saving new activity:', newActivity);
    const achievements = getAchievements();
    achievements.unshift(newActivity);
    saveAchievements(achievements);
    console.log('Achievements after save:', achievements);
    document.getElementById('add-success').style.display = 'block';
    document.getElementById('add-activity-form').reset();
    setTimeout(() => {
      document.getElementById('add-success').style.display = 'none';
    }, 2000);
  }
});
