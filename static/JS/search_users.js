document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    axios.get('/search-users', {params: {name: name}})
        .then(response => {
            let users = response.data;
            updateUsers(users);
        })
        .catch(error => {
            console.error(error);
        });
});

function updateUsers(users) {
    let userList = document.querySelectorAll('.user');
    userList.forEach(
        userDiv => {
            const div_username = userDiv.querySelector('.username').textContent
            if (!users.map(user => user.username).includes(div_username)) {
                userDiv.style.display = 'none'
            }
        }
    )
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

