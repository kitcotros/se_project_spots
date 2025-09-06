//Edit Profile Functionality

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__head-edit");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

const editProfileClose = editProfileModal.querySelector(".modal__close-btn");

editProfileClose.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

//New Post Functionality

const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-button");

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

const newPostClose = newPostModal.querySelector(".modal__close-btn");

newPostClose.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});
