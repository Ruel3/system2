// Registration
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username, password }));
      document.getElementById('registerMessage').textContent = 'Registration successful!';
      setTimeout(() => window.location.href = 'login.html', 1500);
    }
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'index.html';
    } else {
      document.getElementById('loginMessage').textContent = 'Invalid credentials.';
    }
  });
}
