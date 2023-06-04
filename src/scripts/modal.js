import { posts } from "./database.js";

export function createModal(postId) {
  let post = {};

  for (let i = 0; i < posts.length; i++) {
    if (postId === posts[i].id) {
      post = posts[i];
    }
  }

  const modalContainer = document.createElement("div");
  const modalContent = document.createElement("div");
  const userImageModal = document.createElement("img");
  const modalInformation = document.createElement("div");
  const userNameModal = document.createElement("h3");
  const stackNameModal = document.createElement("p");
  const buttonCloseModal = document.createElement("button");
  const articleTitleModal = document.createElement("h2");
  const modalParagraph = document.createElement("div");
  const articleSubjectModal = document.createElement("p");

  modalContainer.classList.add("modal__container");
  modalContent.classList.add("modal__content");
  userImageModal.src = post.img;
  modalInformation.classList.add("modal__information");

  userNameModal.innerText = post.user;
  stackNameModal.innerText = post.stack;
  buttonCloseModal.classList.add("modal__close");
  buttonCloseModal.innerText = "X";

  articleTitleModal.innerText = post.title;
  modalParagraph.classList.add("modal__paragraph");
  articleSubjectModal.innerText = post.text;

  modalInformation.append(userNameModal, stackNameModal);
  modalContent.append(userImageModal, modalInformation, buttonCloseModal);
  modalParagraph.append(articleSubjectModal);
  modalContainer.append(modalContent, articleTitleModal, modalParagraph);

  return modalContainer;
}
