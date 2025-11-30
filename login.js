window.onload = function() {
  const loginForm = document.getElementById('login-form');
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
      // Redirect to dashboard.html or next page
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    } else {
      error.textContent = 'Invalid credentials';
    }
  });
};
