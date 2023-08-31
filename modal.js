function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements selector
const modalbg = document.querySelector(".bground.register");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.querySelector(".bground .content");
const form = document.querySelector("#form");
const formData = document.querySelectorAll(".formData");
const closingModalBg = document.querySelector(".bground.register .close");

const modalThanks = document.querySelector(".bground.thanks");
const closingModalThanks = document.querySelectorAll(
  ".bground.thanks .thanksBtnClosing"
);

// Form input selector
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const tournementQuantity = document.querySelector("#quantity");
const locationTournement = document.getElementsByName("location");
const radioLabel = document.querySelector(".text-label");
const cguCheckBox = document.querySelector("#checkbox1");
const cguLabel = document.querySelector("#checkbox1 ~ label");
const newsCheckBox = document.querySelector("#checkbox2");

// only CGU error selector because all
const cguError = document.querySelector("#cguError");

// launch modal register event
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    launchModal(modalbg);
  })
);

// close modals register events
closingModalBg.addEventListener("click", () => closeModal(modalbg));
modalbg.addEventListener("click", (event) => {
  if (!modalContent.contains(event.target)) {
    closeModal(modalbg);
  }
});

closingModalThanks.forEach((element) => {
  element.addEventListener("click", () => {
    modalThanks.style.display = "none";
  });
});

// control modal
function launchModal(modal) {
  modal.style.display = "block";
}

function closeModal(modal) {
  modal.style.display = "none";
}

// regEx
const txtCheckerRegEx = new RegExp("^[A-Za-z0-9]{2,}");
const mailRegex = new RegExp(
  "^([a-zA-Z0-9.-_S]{2,})+[@]+([a-zA-Z0-9.-_S]{2,})+([.]{1})+([a-zA-Z]{2,10})"
);

// event checking
firstName.addEventListener("change", () => {
  console.log(txtCheck(firstName, txtCheckerRegEx));
});
lastName.addEventListener("change", () => {
  console.log(txtCheck(lastName, txtCheckerRegEx));
});
email.addEventListener("change", () => {
  console.log(txtCheck(email, mailRegex));
});
birthdate.addEventListener("change", () => {
  birthChecker(birthdate);
});
tournementQuantity.addEventListener("change", () => {
  quantityZorM(tournementQuantity);
});

// form event checker functions
function txtCheck(input, regEx) {
  const parentData = input.closest(".formData");
  if (regEx.test(input.value)) {
    parentData.dataset.errorvisible = "false";
    return true;
  } else {
    parentData.dataset.errorvisible = "true";
    return false;
  }
}

function birthChecker(input) {
  const parentData = input.closest(".formData");
  const birth = new Date(input.value);
  const currentDate = new Date();

  if(!birth || birth <= currentDate) {
    parentData.dataset.errorvisible = "false";
    return true
  } else {
    parentData.dataset.errorvisible = "true";
    return false;
  }
}



function quantityZorM(input) {
  const parentData = input.closest(".formData");
  if (input.value >= 0 && input.value != "") {
    parentData.dataset.errorvisible = "false";
    return true;
  } else {
    parentData.dataset.errorvisible = "true";
    return false;
  }
}

function radioChecking(checkList, label) {
  const parentData = label.closest(".formData");
  for (let index = 0; index < checkList.length; index++) {
    const checked = checkList[index].checked;
    if (checked) {
      parentData.dataset.errorvisible = "false";
      return true;
    } else {
      parentData.dataset.errorvisible = "true";
    }
  }
}

function checkBoxChecking(checkBox, label) {
  if (checkBox.checked) {
    label.style.color = "white";
    label.innerHTML = "<span class='checkbox-icon'></span> J\'ai lu et accepté les conditions d\'utilisation."
    return true;
  } else {
    label.style.color = "red";
    label.innerHTML = "<span class='checkbox-icon'></span>Merci de lire et d'accepter nos CGU.";
    return false;
  }
}

// retest form after button click
function validate(event) {
  event.preventDefault();
  if (
    !txtCheck(firstName, txtCheckerRegEx) ||
    !txtCheck(lastName, txtCheckerRegEx) ||
    !txtCheck(email, mailRegex) ||
    !birthChecker(birthdate) ||
    !quantityZorM(tournementQuantity) ||
    !radioChecking(locationTournement, radioLabel) ||
    !checkBoxChecking(cguCheckBox, cguLabel)
  ) {
    txtCheck(firstName, txtCheckerRegEx);
    txtCheck(lastName, txtCheckerRegEx);
    txtCheck(email, mailRegex);
    birthChecker(birthdate);
    quantityZorM(tournementQuantity);
    radioChecking(locationTournement, radioLabel);
    checkBoxChecking(cguCheckBox, cguLabel);
  } else {
    closeModal(modalbg);
    launchModal(modalThanks);
  }
}

// close thanks modal control
closingModalThanks.forEach(element => {
  element.addEventListener("click", () => {
    form.submit();
    console.log("submit")
  })
});