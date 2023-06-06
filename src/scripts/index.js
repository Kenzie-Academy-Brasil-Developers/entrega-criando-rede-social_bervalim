import { users, posts, suggestUsers } from "./database.js";
import { createModal } from "./modal.js";

function renderCardPosts(arrayPosts) {
  const postsList = document.querySelector(".section__list");

  postsList.innerHTML = "";

  for (let i = 0; i < arrayPosts.length; i++) {
    const post = arrayPosts[i];
    const postCard = createPosts(post);
    postsList.appendChild(postCard);
  }
}

function createPosts(postObject) {
  const listItemPosts = document.createElement("li");
  const divContentPost = document.createElement("div");
  const imgContentPost = document.createElement("img");
  const divInformationPost = document.createElement("div");
  const titleInformationPost = document.createElement("h3");
  const paragraphInformationPost = document.createElement("p");
  const titlePost = document.createElement("h2");
  const divParagraphPost = document.createElement("div");
  const paragraphSubjectPost = document.createElement("p");
  const divButtonPost = document.createElement("div");
  const buttonPost = document.createElement("button");
  const buttonLike = document.createElement("button");
  const buttonLikeImage = document.createElement("img");
  const spanNumber = document.createElement("span");

  listItemPosts.classList.add("section__item");
  divContentPost.classList.add("section__content");

  imgContentPost.src = postObject.img;
  divInformationPost.classList.add("section__information");

  titleInformationPost.innerText = postObject.user;
  paragraphInformationPost.innerText = postObject.stack;
  titlePost.innerText = postObject.title;

  divParagraphPost.classList.add("section__paragraph");
  paragraphSubjectPost.innerText = postObject.text;

  divButtonPost.classList.add("section__button");
  buttonPost.innerText = "Abrir Post";
  buttonPost.classList.add("open__post");
  buttonPost.dataset.postId = postObject.id;

  buttonLike.classList.add("heart__section");
  buttonLikeImage.src = "./src/assets/img/unlike.png";
  buttonLikeImage.classList.add("grey__button");

  spanNumber.innerText = postObject.likes;
  spanNumber.id = "span__number";

  buttonLikeImage.addEventListener("click", function () {
    if (
      buttonLikeImage.src === "http://127.0.0.1:5500/src/assets/img/unlike.png"
    ) {
      spanNumber.innerText++;
      buttonLikeImage.src = "./src/assets/img/like.png";
    } else {
      spanNumber.innerText--;
      buttonLikeImage.src = "./src/assets/img/unlike.png";
    }
  });
  divInformationPost.append(titleInformationPost, paragraphInformationPost);
  divContentPost.append(imgContentPost, divInformationPost);
  divParagraphPost.append(titlePost, paragraphSubjectPost);
  buttonLike.append(buttonLikeImage, spanNumber);
  divButtonPost.append(buttonPost, buttonLike);
  listItemPosts.append(divContentPost, divParagraphPost, divButtonPost);

  return listItemPosts;
}

function renderAsidePosts(arraySuggestUsers) {
  const usersList = document.querySelector(".aside__suggestions");
  usersList.innerHTML = "";

  for (let i = 0; i < arraySuggestUsers.length; i++) {
    const suggestionUser = arraySuggestUsers[i];
    const asidePost = createAsidePosts(suggestionUser);
    usersList.appendChild(asidePost);
  }
}

function createAsidePosts(objectSuggestUsers) {
  const listItemAsidePosts = document.createElement("li");
  const divAsideContent = document.createElement("div");
  const imageAsideContent = document.createElement("img");
  const divAsideInformation = document.createElement("div");
  const nameAsideInformation = document.createElement("h3");
  const stackAsideInformation = document.createElement("p");
  const asideButton = document.createElement("button");

  listItemAsidePosts.classList.add("aside__item");
  listItemAsidePosts.dataset.postAsideId = objectSuggestUsers.id;

  divAsideContent.classList.add("aside__content");
  imageAsideContent.src = objectSuggestUsers.img;

  divAsideInformation.classList.add("aside__information");
  nameAsideInformation.innerText = objectSuggestUsers.user;
  stackAsideInformation.innerText = objectSuggestUsers.stack;

  asideButton.innerText = "Seguir";
  asideButton.classList.add("aside__button");

  asideButton.addEventListener("click", function () {
    if (asideButton.innerText == "Seguir") {
      asideButton.innerText = "Seguindo";
      asideButton.classList.remove("aside__button");
      asideButton.classList.add("aside__blue");
    } else {
      asideButton.innerText = "Seguir";
      asideButton.classList.remove("aside__blue");
      asideButton.classList.add("aside__button");
    }
  });

  divAsideContent.append(imageAsideContent, divAsideInformation);
  divAsideInformation.append(nameAsideInformation, stackAsideInformation);
  listItemAsidePosts.append(divAsideContent, asideButton);

  return listItemAsidePosts;
}

function handleModal() {
  const modalController = document.querySelector(".modal__controller");
  const buttonsCloseModal = document.querySelectorAll(".open__post");

  for (let i = 0; i < buttonsCloseModal.length; i++) {
    const buttonCloseModal = buttonsCloseModal[i];

    buttonCloseModal.addEventListener("click", function (event) {
      modalController.innerHTML = "";

      const modalContent = createModal(Number(event.target.dataset.postId));
      modalController.appendChild(modalContent);

      modalController.showModal();

      closeModal();
    });
  }
}

function closeModal() {
  const modalClose = document.querySelector(".modal__close");
  const modalController = document.querySelector(".modal__controller");
  console.log(modalClose);
  modalClose.addEventListener("click", function () {
    modalController.close();
  });
}

renderAsidePosts(suggestUsers);
renderCardPosts(posts);
handleModal();
