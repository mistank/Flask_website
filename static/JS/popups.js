
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