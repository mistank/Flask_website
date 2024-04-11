
const submitBtn = document.getElementById('submit-btn')
const form = document.getElementById('create-user-frm')
submitBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    //FormData je objekat koji kupi podatke iz forme i priprema ih za http request.
    //form je form element iz html koda i njega saljemo u konstruktor za FormData
    const fd = new FormData(form)
    axios.post('/users',fd).then(
        response => {
            console.log("Korisnik uspesno kreiran")
            showSuccessPopup("User created")
        }
    ).catch(
        error=>{
            showErrorPopup(error.response.data.message)
        }
    )
})
function showErrorPopup(message) {
    document.getElementById("errorMessage").innerText = message;
    document.getElementById("errorPopup").style.display = "block";
}

function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

function showSuccessPopup(message) {
    document.getElementById("successMessage").innerText = message;
    document.getElementById("successPopup").style.display = "block";
}