
const deleteLinks =Array.from(document.querySelectorAll('#delete-link'))

deleteLinks.forEach(link => link.addEventListener('click', (event) => {
    event.preventDefault()
    let userId = link.previousElementSibling.id
    console.log(userId)
    axios.delete('/delete-user/' + userId).then((response) => {
        link.parentElement.remove()
        console.log("Korisnik uspesno obrisan")
    }).catch(
        (error) => {
            console.log(error)
        }
    )
}))

