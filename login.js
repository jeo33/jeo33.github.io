    const API_BASE = 'http://35.183.132.145:5000';
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const navLogin = document.getElementById('navLogin');

    // Tab switching
    loginTab.addEventListener('click', () => {
      loginTab.classList.add('active'); registerTab.classList.remove('active');
      loginForm.classList.add('active'); registerForm.classList.remove('active');
    });
    registerTab.addEventListener('click', () => {
      registerTab.classList.add('active'); loginTab.classList.remove('active');
      registerForm.classList.add('active'); loginForm.classList.remove('active');
    });

    // Replace nav login link with username
  function setUsernameNav(username) {
  // 1) persist it for other pages
  localStorage.setItem('username', username);
  // 2) update the current nav immediately
  navLogin.innerHTML = `<a href="#">${username}</a>`;
}
  function settag(tag) {
  // 1) persist it for other pages
  localStorage.setItem('tag', tag);
}

    // Login submission
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      if (!email || !password) { alert('Please enter both email and password.'); return; }
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data)
        if (res.ok) {
        const user = data.username ;
        setUsernameNav(user);
        settag(data.tag);
        // now send them to the search page so that page’s DOMContentLoaded
        // can pick up localStorage.username and render the nav correctly
        window.location.href = 'coc_index.html';
        return;
        } else {
          alert(data.message || 'Login failed.');
        }
      } catch (err) { console.error(err); alert('Error connecting to server.'); }
    });

    // Register submission
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const password = document.getElementById('regPassword').value.trim();
      if (!name || !email || !password) { alert('Please fill out all fields.'); return; }
      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
          alert('Registration successful! Please log in.');
          loginTab.click();
        } else {
          alert(data.message || 'Registration failed.');
        }
      } catch (err) { console.error(err); alert('Error connecting to server.'); }
    });