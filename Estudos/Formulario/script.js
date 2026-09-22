const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;

    if (name && email) {
        console.log(`Name: ${name}, Email: ${email}`);
        // You can add further processing here, like sending the data to a server
    } else {
        console.log('Please fill in both fields.');
    }
});