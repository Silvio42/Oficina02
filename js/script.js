function register() {
    console.log("Função register chamada");
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, dateOfBirth, role })
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        window.location.href = 'login.html';
    })
    .catch(error => console.error('Erro:', error));
}
