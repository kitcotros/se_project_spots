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
const profileFormSave = document.querySelector("#profile-form-button");

const postForm = document.querySelector("#post-form");
const postFormSave = document.querySelector("#post-form-button");

const cardImageInput = document.querySelector("#card-image-input");
const cardCaptionInput = document.querySelector("#card-caption-input");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
});

editProfileClose.addEventListener("click", function () {
  closeModal(editProfileModal);
  profileNameInput.value = profileNameActive.textContent;
  profileBioInput.value = profileBioActive.textContent;
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostClose.addEventListener("click", function () {
  closeModal(newPostModal);
});

initialCards.forEach(function (card) {
  console.log(card.name);
});

profileNameInput.value = profileNameActive.textContent;
profileBioInput.value = profileBioActive.textContent;

profileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  profileNameActive.textContent = profileNameInput.value;
  profileBioActive.textContent = profileBioInput.value;

  closeModal(editProfileModal);
});

postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(cardImageInput.value);
  console.log(cardCaptionInput.value);

  closeModal(newPostModal);

  postForm.reset();
});
