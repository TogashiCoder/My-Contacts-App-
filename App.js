document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector('.add-symbol');
  const popupWindow = document.querySelector('.pop-window');
  const closeButton = popupWindow.querySelector('.add-button');
  const popUp_form = popupWindow.querySelector('.popUp-form');
  const whatsappSpaceAreaDom = document.querySelector('.whatsappSpaceArea');

  // Attach click event listener to the parent container
  whatsappSpaceAreaDom.addEventListener('click', function(event) {
    const targetDiv = event.target.closest('.my-contact');
    if (targetDiv) {
      Display(targetDiv);
    }
  });

  addButton.addEventListener('click', showPopup);
  addButton.addEventListener('click', addContactFromURL);
  closeButton.addEventListener('click', function(event) {
    hidePopup();
    PopUp_validation(event);
    addContactFromURL();
  });


  fillFormFieldsFromURLParams();

  // add contact addContact
  // Function to add contact using URL parameters
function addContactFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const fullName = urlParams.get('full_name');
  const tele = urlParams.get('telephone');
  const email = urlParams.get('email');
  const job = urlParams.get('job_position');
  const address = urlParams.get('address');
  const imageUploadParam = urlParams.get('imageUpload');


  if (fullName && tele && email && job && address) {
    const newDivElement = document.createElement("div");
    newDivElement.classList.add("my-contact");
    newDivElement.innerHTML = `
      <div class="my-contact">
          <img class="person-img" src='Images/contact-1.png' alt="myContact-image" style="width: 55px;">
          <div class="text">
              <p class="full-name">${fullName}</p>
              <p class="simple-message">Great! Keep up the good work</p>
              <p class="emailHidden" style="display: none;">${email}</p>
              <p class="teleHidden" style="display: none;">${tele}</p>
              <p class="addressHidden" style="display: none;">${address}</p>
              <p class="JobHidden" style="display: none;">${job}</p>
          </div>
          <p class="message-time">10:35 pm</p>
      </div>
      `;
    whatsappSpaceAreaDom.appendChild(newDivElement);
    hidePopup();
  } else {
    console.log('Form validation failed.');
  }
}

  


  // Function to create a new .my-contact div
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

  async function getAndCreateContacts() {
    const response = await fetch("user.json");
    const data = await response.json();

    data.results.forEach(user => {
      createContactDiv(user);
    });
  }

  getAndCreateContacts();

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

    
    console.log('Full Name:', fullName);
    console.log('Simple Message:', simpleMessage);
    console.log('Message Time:', messageTime);
    console.log('Address:', address);
    console.log('Telephone:', tele);
    console.log('Email:', email);
  
    // Update display elements with the fetched data
  document.querySelector('.display-name').textContent = fullName;
  document.querySelector('.display-tele').textContent = tele;
  document.querySelector('.display-job').textContent = job;
  document.querySelector('.display-map').textContent = address; 
  document.querySelector('.display-email').textContent = email; 
  document.querySelector('.image-display').src = imageUrl;

}






function fillFormFieldsFromURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const fullName = urlParams.get('full_name');
  const telephone = urlParams.get('telephone');
  const email = urlParams.get('email');
  const jobPosition = urlParams.get('job_position');
  const address = urlParams.get('address');
  const imageUploadParam = urlParams.get('imageUpload');

  if (fullName && telephone && email && jobPosition && address) {
    if (imageUploadParam) {
      const imageUploadValue = decodeURIComponent(imageUploadParam);
      const newContactDiv = document.createElement('div');
      newContactDiv.classList.add('my-contact');
      newContactDiv.innerHTML = `
        <div class="my-contact">
          <img class="person-img" src="${imageUploadValue}" alt="myContact-image">
          <div class="text">
            <p class="full-name">${fullName}</p>
            <p class="simple-message">Great! Keep up the good work</p>
            <p class="emailHidden" style="display: none;">${email}</p>
            <p class="teleHidden" style="display: none;">${telephone}</p>
            <p class="addressHidden" style="display: none;">${address}</p>
            <p class="JobHidden" style="display: none;">${jobPosition}</p>
          </div>
          <p class="message-time">10:35 pm</p>
        </div>
      `;
      const whatsappSpaceArea = document.querySelector('.whatsappSpaceArea');
      if (whatsappSpaceArea) {
        whatsappSpaceArea.appendChild(newContactDiv);
      } else {
        console.error('.whatsappSpaceArea not found.');
      }
    } else {
      console.log('Image upload parameter missing.');
    }
  } else {
    console.log('URL parameters missing or incomplete.');
  }
}

// Call the function when the page loads
fillFormFieldsFromURLParams();

  
  
  
});
