import "./index.css";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0307662c-e5c7-4385-9413-db52ab77dee9",
    "Content-Type": "application/json",
  },
});

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__head-edit");
const editProfileClose = editProfileModal.querySelector(".modal__close-btn");

const editAvatarModal = document.querySelector("#avatar-modal");
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarClose = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarSubmitBtn = document.querySelector("#avatar-form-button");
const avatarForm = document.querySelector("#avatar-form");
const avatarInput = document.querySelector("#avatar-input");

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-button");
const newPostClose = newPostModal.querySelector(".modal__close-btn");

const profileAvatarActive = document.querySelector(".profile__image");
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

const deleteModal = document.querySelector("#delete-modal");
const deleteModalClose = deleteModal.querySelector(".modal__close-btn");
const deleteModalForm = deleteModal.querySelector(".modal__form");
const deleteModalBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteModalCancel = deleteModal.querySelector(".modal__cancel-btn");

const modalList = document.querySelectorAll(".modal");

let selectedCard, selectedCardId;

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__text");

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  const likeButton = cardElement.querySelector(".card__like-btn");

  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_liked");
  } else {
    likeButton.classList.remove("card__like-btn_liked");
  }

  const deleteButton = cardElement.querySelector(".card__delete-btn");

  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  cardImage.addEventListener("click", function () {
    imageModalImage.setAttribute("src", data.link);
    imageModalImage.setAttribute("alt", data.name);
    imageModalCaption.textContent = data.name;
    openModal(imageModal);
  });

  return cardElement;
}

api
  .getAppInfo()
  .then(([cards, user]) => {
    cards.forEach((card) => {
      const initialCard = getCardElement(card);
      cardsList.append(initialCard);
    });

    profileNameActive.textContent = user.name;
    profileBioActive.textContent = user.about;
    profileAvatarActive.src = user.avatar;
  })
  .catch(console.error);

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

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

editAvatarClose.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

deleteModalClose.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteModalCancel.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  deleteModalBtn.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteModalBtn.textContent = "Delete";
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  profileFormSaveBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileBioInput.value,
    })
    .then((data) => {
      profileNameActive.textContent = data.name;
      profileBioActive.textContent = data.about;

      disableButton(profileFormSaveBtn, settings);

      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      profileFormSaveBtn.textContent = "Save";
    });
});

postForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  postSubmitBtn.textContent = "Saving...";

  api
    .addNewCard(cardCaptionInput.value, cardImageInput.value)
    .then((data) => {
      const cardEl = getCardElement(data);
      cardsList.prepend(cardEl);

      closeModal(newPostModal);
      disableButton(postSubmitBtn, settings);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      postSubmitBtn.textContent = "Save";
    });
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  editAvatarSubmitBtn.textContent = "Saving...";

  api
    .editUserAvatar(avatarInput.value)
    .then((data) => {
      profileAvatarActive.src = data.avatar;

      closeModal(editAvatarModal);
      disableButton(editAvatarSubmitBtn, settings);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      editAvatarSubmitBtn.textContent = "Save";
    });
});

deleteModalForm.addEventListener("submit", handleDeleteSubmit);

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

enableValidation(settings);
