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

  closeButton.addEventListener('click', function(event) {
    hidePopup();
    PopUp_validation(event);
  });

  // Function to create a new .my-contact div
  function createContactDiv(user) {
    const newDivElement = document.createElement("div");
    newDivElement.classList.add("my-contact");
    newDivElement.innerHTML = `
      <div class="my-contact">
          <img class="person-img" src='${user.picture.large}' alt="myContact-image" style="width: 55px;">
          <div class="text">
              <p class="full-name">${user.name.first} ${user.name.last}</p>
              <p class="simple-message">Great! Keep up the good work</p>
              <p class="emailHidden" style="display: none;">${user.email}</p>
              <p class="teleHidden" style="display: none;">${user.phone}</p>
              <p class="addressHidden" style="display: none;">${user.location.country} ${user.location.city}</p>
          </div>
          <p class="message-time">10:35 pm</p>
      </div>
      `;
    whatsappSpaceAreaDom.appendChild(newDivElement);
  }

  // Function to fetch data and create .my-contact divs
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
    console.log('Full Name:', fullName);
    console.log('Simple Message:', simpleMessage);
    console.log('Message Time:', messageTime);
    console.log('Address:', address);
    console.log('Telephone:', tele);
    console.log('Email:', email);
  }
});
