const registerForm = document.getElementById('register-form');

console.log(registerForm);

registerForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const registerFormData = new FormData(registerForm);
    const registerPayload = Object.fromEntries(registerFormData);

    try {
        const response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(registerPayload)
        });
        console.log(response);
        window.location.href = '/profile';
    }
    catch (error) {
        console.log(error);
        window.location.href = '/';
    }
});