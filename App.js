document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector('.add-symbol');
  const popupWindow = document.querySelector('.pop-window');
  const closeButton = popupWindow.querySelector('.add-button');
  const popUp_form = popupWindow.querySelector('.popUp-form');
// ========input popUp_form
  const popUp_image_input = document.querySelector("[name='imageUpload']");
  const popUp_full_Name_input = document.querySelector("[name='full_name']");
  const popUp_tele_input = document.querySelector("[name='telephone']");
  const popUp_job_input = document.querySelector("[name='job_position']");
  const popUp_email_input = document.querySelector("[name='email']");
  const popUp_address_input = document.querySelector("[name='address']");

/*----------------events----------------------------*/  
  addButton.addEventListener('click', showPopup);
  
  closeButton.addEventListener('click', function(event) {
    hidePopup();
    PopUp_validation(event);
    console.log(popUp_full_Name_input.value);
  });
/*-------------------------------------------------*/  
/*----------------------functions--------------------------*/  
  function showPopup() {
    popupWindow.style.display = 'block';
  }

  function hidePopup() {
    popupWindow.style.display = 'none';
  }

  function PopUp_validation(event) {
    let image_valid = false;
    let fullName_valid = false;
    let tele_valid = false;
    let email_valid = false;
    let job_valid = false;
    let address_valid = false;

    if (popUp_image_input.files.length > 0) {
      image_valid = true;
    }

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

    if (image_valid === false || fullName_valid === false || tele_valid === false || email_valid === false || job_valid === false || address_valid === false) {
      event.preventDefault();
      console.log("Form validation failed.");
    } else {
      console.log("Form validation successful.");
    }
  }
});




// Api connection
async function get() {
    const response = await fetch("user.json");
    const data = await response.json();
    console.log(data);

    const whatsappSpaceAreaDom = document.querySelector('.whatsappSpaceArea');

    data.results.forEach(user => {
      const newDivElement = document.createElement("div");
      newDivElement.classList.add("my-contact");
      newDivElement.innerHTML = `
        <div class="my-contact" id="list-1">
            <img class="person-img" src='${user.picture.large}' alt="myContact-image" style="width: 55px;">
            <div class="text">
                <p class="full-name">${user.name.first} ${user.name.last}</p>
                <p class="simple-message">Great ! keep up the good work</p>
            </div>
            <p class="message-time">10:35 pm</p>
        </div>
        `;
      whatsappSpaceAreaDom.appendChild(newDivElement);
    });
}

get();





