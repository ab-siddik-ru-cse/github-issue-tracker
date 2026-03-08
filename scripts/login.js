const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click',()=> {
    const inputUsername = document.getElementById('inputUsername');
    const usernameValue = inputUsername.value;

    const inputPassword = document.getElementById('inputPassword');
    const passwordValue = inputPassword.value;

    if (usernameValue === 'admin' && passwordValue === 'admin123') {
        window.location.assign('/home.html');
    }
    else {
        const demoDiv = document.getElementById('login-error');
        demoDiv.classList.remove('hidden');
        inputUsername.value = '';
        passwordValue.value = '';
        return;
    }

});