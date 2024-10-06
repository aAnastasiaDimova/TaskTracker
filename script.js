const password = document.getElementById("password")
const username = document.getElementById("email")
const button = document.getElementById("vxod")

button.addEventListener('click', () => {
    fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify({
    username: username.value,
    password: password.value
    }),
    headers: {
    'Content-type': 'application/json',
    }
    }).then(response => {
        if (response.status == "200"){
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href='index.html';
            window.localStorage.setItem('username', document.getElementById("email").value);
        }
        else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'Неверный логин или пароль';
            errorMessage.style.color = 'red';
            button.insertAdjacentElement('beforebegin', errorMessage);
            
        }
    })
})