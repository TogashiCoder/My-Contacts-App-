// Get the add symbol element
const addSymbol = document.getElementById('addSymbol');

// Get the popup element
const popup = document.getElementById('popup');

// Add event listener to open popup when add symbol is clicked
addSymbol.addEventListener('click', function() {
    popup.style.display = 'block';
});

// Function to add information (you can modify this function as needed)
function addInformation() {
    // Get values from the form
    const fullname = document.getElementById('fullname').value;
    const tele = document.getElementById('tele').value;
    const address = document.getElementById('address').value;
    const job = document.getElementById('job').value;

    // For image upload, you would typically handle this differently using FileReader or FormData

    // Display the values (you can replace this with your desired logic)
    alert(`Full Name: ${fullname}\nTelephone: ${tele}\nAddress: ${address}\nJob: ${job}`);

    // Close the popup after adding information
    popup.style.display = 'none';
}