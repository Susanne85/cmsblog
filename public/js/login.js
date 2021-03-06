const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('No details exist please signup');
    }
  } else {
    alert('Enter email and password or click on Signup instead');
  }
};
const signupFormHandler = async (event) => {
  event.preventDefault();
  document.location.replace('/signup');
}

document.querySelector('.login-form').addEventListener('click', loginFormHandler);
document.querySelector('.signup-form').addEventListener('click', signupFormHandler);