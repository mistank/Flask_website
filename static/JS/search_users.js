document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    // console.log("uspesno");
    filterUsers(name);
});
function filterUsers(name) {
    let users = document.querySelectorAll('.user');
    users.forEach(user => {
        let username = user.querySelector('.username').textContent.toLowerCase();
        if (name === '' || username.includes(name.toLowerCase())) {
            user.classList.remove('hidden');
        } else {
            user.classList.add('hidden');
        }
    });
}

