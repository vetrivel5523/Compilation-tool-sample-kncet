
function navigate() {
    var input = document.getElementById('select').value;
    if (input === 'CGPA') {
        window.location.href = 'CGPA CALCULATOR/index.html';
    } else if (input === 'SGPA') {
        window.location.href = 'SGPA CALCULATOR/index.html';
    }
}
//Reset Function
function resetInputs() {
    document.getElementById("select").selectedIndex = 0;
}