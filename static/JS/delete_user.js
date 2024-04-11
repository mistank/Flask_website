
const deleteLinks =Array.from(document.querySelectorAll('#delete-link'))

deleteLinks.forEach(link => link.addEventListener('click', (event) => {
    event.preventDefault()
    let userId = link.parentNode.previousElementSibling.id
    console.log("blablabla")
    console.dir(userId)
    axios.delete('/delete-user/' + userId).then((response) => {
        link.closest('.user').remove()
        console.log("Korisnik uspesno obrisan")
    }).catch(
        (error) => {
            console.log(error)
        }
    )
}))

