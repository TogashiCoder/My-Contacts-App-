document.addEventListener("DOMContentLoaded", () => 
{
  async function ApiConnection() {
    const response = await fetch("user.json");
    const data = await response.json();
  
    data.results.forEach(user => {
      createContactDiv(user);
    });
  }
  
  ApiConnection();

  function createContactDiv(user) {
    const newDivElement = document.createElement("div");
    newDivElement.classList.add("my-contact");
    newDivElement.innerHTML = `
      <div class="my-contact">
          <img class="person-img" src='${user.picture.large}' alt="myContact-image" style="width: 55px; height: 55px; border-radius: 50%;margin-left: -10px;">
          <div class="text">
              <p class="full-name">${user.name.first} ${user.name.last}</p>
              <p class="simple-message">Great! Keep up the good work</p>
              <p class="emailHidden" style="display: none;">${user.email}</p>
              <p class="teleHidden" style="display: none;">${user.phone}</p>
              <p class="addressHidden" style="display: none;">${user.location.country} ${user.location.city}</p>
              <p class="JobHidden" style="display: none;">${user.job}</p>
          </div>
          <p class="message-time" style=" float : left;">10:35 pm</p>
      </div>
      `;
    whatsappSpaceAreaDom.appendChild(newDivElement);
  }


  const addButton = document.querySelector('.add-symbol');
  const popupWindow = document.querySelector('.pop-window');
  const closeButton = document.querySelector('.add-button');
  const popUp_form = document.querySelector('.popUp-form');
  const whatsappSpaceAreaDom = document.querySelector('.whatsappSpaceArea');


  /*-------------------events--------------------------*/
  // Attach click event listener to the parent container
  whatsappSpaceAreaDom.addEventListener('click', function(event) {
    const targetDiv = event.target.closest('.my-contact');
    if (targetDiv) {
      Display(targetDiv);
    }
  });

  addButton.addEventListener('click', showPopup);

  closeButton.addEventListener('click', function(event) {
    hidePopup();
    PopUp_validation(event);
  });

  popUp_form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    storeFormData();
  
    hidePopup();
  });

  searchInput.addEventListener('input', search);




  

  /*-------------------functions--------------------------*/

  function showPopup() {
    popupWindow.style.display = 'block';
  }

  function hidePopup() {
    popupWindow.style.display = 'none';
  }

  function PopUp_validation(event) {
    const popUp_full_Name_input = popupWindow.querySelector("[name='full_name']");
    const popUp_tele_input = popupWindow.querySelector("[name='telephone']");
    const popUp_email_input = popupWindow.querySelector("[name='email']");
    const popUp_job_input = popupWindow.querySelector("[name='job_position']");
    const popUp_address_input = popupWindow.querySelector("[name='address']");

    let fullName_valid = false;
    let tele_valid = false;
    let email_valid = false;
    let job_valid = false;
    let address_valid = false;

    if (popUp_full_Name_input.value !== "" && /^[A-Za-z]+$/.test(popUp_full_Name_input.value)) {
      fullName_valid = true;
    }

    let tele_pattern = /^[0-9]{10}$/;
    if (popUp_tele_input.value.match(tele_pattern)) {
      tele_valid = true;
    }

    let email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (popUp_email_input.value.match(email_pattern)) {
      email_valid = true;
    }

    if (popUp_job_input.value !== "") {
      job_valid = true;
    }

    if (popUp_address_input.value !== "") {
      address_valid = true;
    }

    if (fullName_valid === false || tele_valid === false || email_valid === false || job_valid === false || address_valid === false) {
      event.preventDefault();
      console.log("Form validation failed.");
    } else {
      console.log("Form validation successful.");
    }
  }

  function Display(div) {
    const fullName = div.querySelector('.full-name').textContent;
    const simpleMessage = div.querySelector('.simple-message').textContent;
    const messageTime = div.querySelector('.message-time').textContent;
    const address = div.querySelector('.addressHidden').textContent;
    const tele = div.querySelector('.teleHidden').textContent;
    const email = div.querySelector('.emailHidden').textContent;
    const imageUrl = div.querySelector('.person-img').src;
    const job = div.querySelector('.JobHidden').textContent;

  
    // Update display elements with the fetched data
  document.querySelector('.display-name').textContent = fullName;
  document.querySelector('.display-tele').textContent = tele;
  document.querySelector('.display-job').textContent = job;
  document.querySelector('.display-map').textContent = address; 
  document.querySelector('.display-email').textContent = email; 
  document.querySelector('.image-display').src = imageUrl;

}



function storeFormData() {
  const form = document.querySelector('.popUp-form');
  const fullName = form.querySelector("[name='full_name']").value;
  const telephone = form.querySelector("[name='telephone']").value;
  const email = form.querySelector("[name='email']").value;
  const jobPosition = form.querySelector("[name='job_position']").value;
  const address = form.querySelector("[name='address']").value;

// Get the uploaded image file
const imageUploadInput = form.querySelector('#imageUpload');
const uploadedImageFile = imageUploadInput.files[0];
const url =  URL.createObjectURL(uploadedImageFile);
const img = new Image();
const imagePath = img.src;




  // Create an object to hold the form data including the image path
  const formData = {
    fullName,
    telephone,
    email,
    jobPosition,
    address,
    imagePath // Add the image path to the form data object
  };

  // Retrieve existing data from local storage or initialize an empty array
  const existingData = JSON.parse(localStorage.getItem('formDataArray')) || [];

  // Add the new form data to the existing array
  existingData.push(formData);

  // Convert the array back to JSON format
  const jsonData = JSON.stringify(existingData);

  // Store the updated JSON data in local storage under the key 'formDataArray'
  localStorage.setItem('formDataArray', jsonData);

  // Optionally, you can display a message or perform other actions after storing the data
  alert('Form data stored in local storage!');
}


function addFromLocalStorge()
{
  // Retrieve the JSON data from local storage
const storedData = localStorage.getItem('formDataArray');

// Convert the JSON data back to a JavaScript array or initialize an empty array if null
const formDataArray = storedData ? JSON.parse(storedData) : [];
// Check if formDataArray is not null before attempting to iterate
if (formDataArray) 
{
  
  formDataArray.forEach(formData => {
  const newContactDiv = document.createElement('div');
  newContactDiv.classList.add('my-contact');
  newContactDiv.innerHTML = `
    <div class="my-contact">
      <img class="person-img" src="${formData.imagePath}" alt="myContact-image">
      <div class="text">
        <p class="full-name">${formData.fullName}</p>
        <p class="simple-message">Great! Keep up the good work</p>
        <p class="emailHidden" style="display: none;">${formData.email}</p>
        <p class="teleHidden" style="display: none;">${formData.telephone}</p>
        <p class="addressHidden" style="display: none;">${formData.address}</p>
        <p class="JobHidden" style="display: none;">${formData.jobPosition}</p>
      </div>
      <p class="message-time">10:35 pm</p>
    </div>
  `;
  const whatsappSpaceArea = document.querySelector('.whatsappSpaceArea');
    whatsappSpaceArea.appendChild(newContactDiv);

  });
}

}

addFromLocalStorge();



function clearLocalStorage() {
  localStorage.clear();
  console.log('Local storage data cleared.');
}

// clearLocalStorage();
  







function search() {
  const user_search_input = searchInput.value.trim().toLowerCase();

  const allContactDivs = document.querySelectorAll('.my-contact');

  allContactDivs.forEach(contactDiv => {
    const fullName = contactDiv.querySelector('.full-name').textContent.toLowerCase();
    const tele = contactDiv.querySelector('.teleHidden').textContent.toLowerCase();

    if (fullName.includes(user_search_input) || tele.includes(user_search_input)) {
      contactDiv.style.display = 'block'; 
    } else {
      contactDiv.style.display = 'none'; 
    }
  });
}







  
});
