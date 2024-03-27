document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('.add-symbol');
    const popupWindow = document.querySelector('.pop-window');
    const closeButton = popupWindow.querySelector('.add-button');
    const form = popupWindow.querySelector('form');
  
    // Function to show the popup window
    function showPopup() {
      popupWindow.style.display = 'block';
    }
  
    // Function to hide the popup window
    function hidePopup() {
      popupWindow.style.display = 'none';
    }
  
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent form submission
      if (form.checkValidity()) {
        // Form is valid, you can submit the data
        console.log('Form submitted:', {
          fullName: form.querySelector('#full_name').value,
          telephone: form.querySelector('#telephone').value,
          jobPosition: form.querySelector('#job_position').value,
          address: form.querySelector('#address').value
        });
        // Here, you can send the form data to a server using AJAX or fetch API
        // For example:
        // fetch('your-api-endpoint', {
        //   method: 'POST',
        //   body: new FormData(form)
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error));
        hidePopup(); // Hide the popup after successful form submission
      } else {
        // Form is invalid, display error messages or handle accordingly
        form.classList.add('was-validated');
      }
    }
  
    // Add click event listener to show the popup when .add-symbol is clicked
    addButton.addEventListener('click', showPopup);
  
    // Add click event listener to hide the popup when "Add" is clicked
    closeButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent form submission
      hidePopup();
    });
  
    // Add submit event listener to the form to handle submission
    form.addEventListener('submit', handleFormSubmit);
  });
  