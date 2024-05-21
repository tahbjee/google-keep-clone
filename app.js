const myLibrary = [];

const notes = document.querySelector("#notes");
let noteTitle = document.querySelector("#note-title");
let noteTitleValue = document.querySelector(".note h3");

let noteText = document.querySelector("#note-text");

let modalTitle = document.querySelector("#modal-title");
let modalText = document.querySelector("#modal-text");

const closeFormButton = document.querySelector("#form-close-button");
const closeModalButton = document.querySelector("#modal-close-button");

const form = document.querySelector("#form");
const formButton = document.querySelector("#form-buttons");
const formContainer = document.querySelector("#form-container");
const mainContainer = document.querySelector("#main-container");
const mainContainerContent = document.querySelector(".main-container-content");

const note = document.querySelector(".note");
const modal = document.querySelector(".modal");

const submitButton = document.querySelector("#submit-button");
const modalSubmitButton = document.querySelector("#modal-submit-button");

function Book() {
  // the constructor..
}

function addBookToLibrary() {
  // do stuff here

  function hasUserInput() {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    return title.length > 0 || text.length > 0;
  }

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (hasUserInput()) {
      createNotes();
    }
  });

  function createNotes(event) {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    const newBook = { title, text };
    myLibrary.push(newBook);

    if (title || text) {
      notes.innerHTML = myLibrary
        .map(
          (book, index) => `
      <div class="note" data-note="${index}">
        <h3>${book.title}</h3>
        <p>${book.text}</p>
      </div>
    `
        )
        .join(" ");
      clearInputText();
    }
  }
  function clearInputText() {
    noteTitle.value = "";
    noteText.value = "";
  }

  function clearModalInputText() {
    modalTitle.value = "";
    modalText.value = "";
  }
  /*   function createModalText(event) {
    let index = event.target.dataset.note;
    modalTitle.value = myLibrary[index].title;
    modalText.value = myLibrary[index].text;
  }

  function editModalText(event) {
    let index = event.target.dataset.note;
    console.log("index:" + index);
    myLibrary[index].title = modalTitle.value;
    myLibrary[index].text = modalText.value;
  } */

  function updateNotes(index) {
    const noteElement = document.querySelector(`.note[data-note="${index}"]`);
    console.log("Updatenotes: index " + index);
    const titleElement = noteElement.querySelector("h3");
    const textElement = noteElement.querySelector("p");

    titleElement.textContent = myLibrary[index].title;
    textElement.textContent = myLibrary[index].text;
  }

  function handleModal(event) {
    let index = event.target.dataset.note;
    modalTitle.value = myLibrary[index].title;
    modalText.value = myLibrary[index].text;

    console.log("handleModal: index " + index);

    modalSubmitButton.addEventListener("click", () => {
      const currentIndex = index;
      console.log("handleModal: currentIndex " + currentIndex);
      myLibrary[currentIndex].title = modalTitle.value;
      myLibrary[currentIndex].text = modalText.value;
      //console.log("modalTitle:" + modalTitle.value);
      //  console.log("modalText:" + modalText.value);
      updateNotes(currentIndex);
      closeModal();
    });
  }

  function openForm(event) {
    noteTitle.style.display = "block";
    formButton.style.display = "block";
    form.classList.add("form-open");
  }

  function closeForm(event) {
    noteTitle.style.display = "none";
    formButton.style.display = "none";
    form.classList.remove("form-open");
  }

  function openModal(event) {
    modal.classList.add("openModal");
    mainContainerContent.classList.add("blur-main-container");
    console.log("note");
  }

  function closeModal(e) {
    modal.classList.remove("openModal");
    mainContainerContent.classList.remove("blur-main-container");
  }

  mainContainer.addEventListener("click", (event) => {
    const clickedElement = event.target;
    event.preventDefault();
    if (clickedElement === noteText) {
      openForm();
    } else if (clickedElement === closeFormButton) {
      closeForm();
    } else if (clickedElement === submitButton) {
      closeForm();
    } else if (clickedElement === mainContainerContent && hasUserInput()) {
      createNotes();
      closeForm();
    } else if (clickedElement === mainContainer && !hasUserInput()) {
      closeForm();
    } else if (clickedElement.closest(".note")) {
      //   event.stopPropagation();
      openModal();
      handleModal(event);
    } else if (clickedElement === closeModalButton) {
      closeModal();
    }
    //  console.log(event.target);
  });
  // console.log(myLibrary);
}
addBookToLibrary();
