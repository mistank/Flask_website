const editLinks = Array.from(document.querySelectorAll('#edit-link'))
const submitBtns = Array.from(document.querySelectorAll('#submit-btn'))
submitBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.preventDefault()
        const form = btn.closest('form')
        const username_input = form.querySelector('#username')
        const email = form.querySelector('#email')
        const user = {
            username: username_input.value,
            email: email.value
        }
        const userId = form.id.split('edit-form-')[1]
        axios.patch(`/users/${userId}`, user).then(
            (response) => {
                const formWrapper = form.parentElement
                const usernameLabel = formWrapper.previousElementSibling.querySelector('.username')
                usernameLabel.textContent = user.username
                formWrapper.classList.toggle('invisible')
                alert(response.data.message)
            }
        ).catch(
            (error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    alert(error.response.data.message);
                } else if (error.request) {
                    // The request was made but no response was received
                    alert('No response received from the server.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    alert('Error', error.message);
                }
            }
        )
    })
})

editLinks.forEach(link => {
    link.addEventListener('click', () => {
        const form = link.closest('.user').nextElementSibling;
        form.classList.toggle('invisible')
    })
})