
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    axios.get('/search-users', { params: { name: name } })
        .then(response => {
            let users = response.data;
            updateUsers(users);
        })
        .catch(error => {
            console.error(error);
        });
});

function updateUsers(users) {
    let userList = document.querySelector('.user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        let userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.innerHTML = `
            <span id="${user.id}" class="username">${user.username}</span>
            <div id="edit-delete-wrapper">
                <a id="edit-link">Edit</a>
                <a id="delete-link" onclick="return confirm('Are you sure you want to delete this user?');">Delete</a>
            </div>
        `;
        userList.appendChild(userDiv);
    });
}


// document.getElementById('search-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     let name = document.getElementById('name').value;
//     console.log(name)
//     axios.get('/search-users',name).then(
//         response => {
//
//         }
//     ).catch(
//         error => {
//
//         }
//     )
//
//     filterUsers(name);
// });
// function filterUsers(name) {
//     let users = document.querySelectorAll('.user');
//     users.forEach(user => {
//         let username = user.querySelector('.username').textContent.toLowerCase();
//         if (name === '' || username.includes(name.toLowerCase())) {
//             user.classList.remove('hidden');
//         } else {
//             user.classList.add('hidden');
//         }
//     });
// }

