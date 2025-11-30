window.onload = function() {
  const signupForm = document.getElementById('signup-form');
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
      window.location.href = 'login.html';
    }, 1000);
  });
};
