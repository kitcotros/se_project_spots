const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__head-edit");
const editProfileClose = editProfileModal.querySelector(".modal__close-btn");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostClose = newPostModal.querySelector(".modal__close-btn");

const profileNameActive = document.querySelector(".profile__head-text-name");
const profileBioActive = document.querySelector(".profile__head-text-bio");

const profileNameInput = document.querySelector("#profile-name-input");
const profileBioInput = document.querySelector("#profile-description-input");

const profileForm = document.querySelector("#profile-form");
const profileFormSaveBtn = document.querySelector("#profile-form-button");

const postForm = document.querySelector("#post-form");
const postSubmitBtn = document.querySelector("#post-form-button");

const cardImageInput = document.querySelector("#card-image-input");
const cardCaptionInput = document.querySelector("#card-caption-input");

const imageModal = document.querySelector("#image-modal");
const imageModalImage = imageModal.querySelector(".modal__image");
const imageModalCaption = imageModal.querySelector(".modal__image-caption");
const imageModalCloseBtn = imageModal.querySelector(".modal__close-image-btn");

const modalList = document.querySelectorAll(".modal");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  const likeButton = cardElement.querySelector(".card__like-btn");

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like-btn_liked");
  });

  const deleteButton = cardElement.querySelector(".card__delete-btn");

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    imageModalImage.setAttribute("src", data.link);
    imageModalImage.setAttribute("alt", data.name);
    imageModalCaption.textContent = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", handleOverlayCloseModal);
  document.addEventListener("keydown", handleEscapeCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", handleOverlayCloseModal);
  document.removeEventListener("keydown", handleEscapeCloseModal);
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  profileNameInput.value = profileNameActive.textContent;
  profileBioInput.value = profileBioActive.textContent;
  resetValidation(profileForm, [profileNameInput, profileBioInput], settings);
  disableButton(profileFormSaveBtn, settings);
});

editProfileClose.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostClose.addEventListener("click", function () {
  closeModal(newPostModal);
});

initialCards.forEach(function (card) {
  const initialCard = getCardElement(card);

  cardsList.append(initialCard);
});

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileNameActive.textContent = profileNameInput.value;
  profileBioActive.textContent = profileBioInput.value;

  disableButton(profileFormSaveBtn, settings);

  closeModal(editProfileModal);
});

postForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const postCardData = {
    name: cardCaptionInput.value,
    link: cardImageInput.value,
  };
  const cardEl = getCardElement(postCardData);
  cardsList.prepend(cardEl);

  closeModal(newPostModal);
  disableButton(postSubmitBtn, settings);
  evt.target.reset();
});

imageModalCloseBtn.addEventListener("click", function () {
  closeModal(imageModal);
});

function handleOverlayCloseModal(event) {
  modalList.forEach((modal) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
}

function handleEscapeCloseModal(event) {
  modalList.forEach((modal) => {
    if (event.key === "Escape") {
      closeModal(modal);
    }
  });
}
