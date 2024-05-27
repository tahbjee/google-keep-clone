// const myLibrary = [];
const myLibrary = JSON.parse(localStorage.getItem("note")) || [];

const removeNotes = document.querySelector("#remove-button");

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

const blurMainContainer = document.querySelector(
  ".main-container .blur-main-container"
);

const yellow = document.querySelector(".color-button-1");
const green = document.querySelector(".color-button-2");
const red = document.querySelector(".color-button-3");

//

let index;

const noteElement = document.querySelector(`[data-note="${index}"]`);

function Book() {}

function addBookToLibrary() {
  function hasUserInput() {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    return title.length > 0 || text.length > 0;
  }

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (hasUserInput()) {
      createNotes();
    }
  });

  function loadNotesFromLocalStorage() {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    console.log(storedNotes);
    if (storedNotes) {
      myLibrary.push(...storedNotes);
      renderNotes();
    }
  }

  function renderNotes() {
    notes.innerHTML = myLibrary
      .map(
        (book, index) => `
      <div class="note" data-note="${index}"  style="background-color: ${book.color}">
        <h3 data-note="${index}">${book.title}</h3>
        <p data-note="${index}">${book.text}</p>
      </div>
    `
      )
      .join(" ");
  }

  function createNotes(index) {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    const color = "";

    const newBook = { title, text, color };
    myLibrary.push(newBook);

    if (title || text) {
      renderNotes();
      saveToLocalStorage();
      clearInputText();
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(myLibrary));
  }

  function removeFromLocalStorage(index) {
    localStorage.removeItem(index);
  }
  function clearInputText() {
    noteTitle.value = "";
    noteText.value = "";
  }

  function clearModalInputText() {
    modalTitle.value = "";
    modalText.value = "";
  }
  function HasModalText() {
    const modalTitleInput = modalTitle.value.trim();
    const modalTextInput = modalText.value.trim();
    return modalTitleInput.length > 0 || modalTextInput.length > 0;
  }

  function updateNotes(index) {
    const noteElement = document.querySelector(`.note[data-note="${index}"]`);
    console.log("Updatenotes: index " + index);
    const titleElement = noteElement.querySelector("h3");
    const textElement = noteElement.querySelector("p");

    titleElement.textContent = myLibrary[index].title;
    textElement.textContent = myLibrary[index].text;

    myLibrary[index].color = noteElement.style.backgroundColor;
  }

  modalSubmitButton.addEventListener("click", () => {
    const currentIndex = index;
    console.log("handleModal: currentIndex " + currentIndex);
    if (currentIndex >= 0 && currentIndex < myLibrary.length) {
      myLibrary[currentIndex].title = modalTitle.value;
      myLibrary[currentIndex].text = modalText.value;

      updateNotes(currentIndex);
      closeModal();
    } else {
      console.error("Invalid index:", currentIndex);
    }
  });
  /*  removeNotes.addEventListener("click", () => {
     delete myLibrary[index].title;
    delete myLibrary[index].text;
    delete myLibrary[index].color;
     
    noteElement.remove();

    // Remove the corresponding object from myLibrary array
    myLibrary.splice(index, 1);
    saveToLocalStorage();
  }); */

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
    const noteElement = document.querySelector(`.note[data-note="${index}"]`);

    console.log(clickedElement);
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
    } else if (
      (clickedElement === mainContainerContent ||
        clickedElement === mainContainerContent) &&
      !hasUserInput()
    ) {
      closeForm();
    } else if (
      clickedElement.closest(".note") ||
      clickedElement === noteElement
    ) {
      openModal();
      handleModal(event);
    } else if (clickedElement === closeModalButton) {
      clearModalInputText();
      closeModal();
    } else if (
      clickedElement === blurMainContainer ||
      clickedElement === notes ||
      clickedElement === mainContainer ||
      clickedElement === mainContainerContent
    ) {
      closeModal();
    } else if (clickedElement === removeNotes) {
      myLibrary.splice(index, 1);
      removeFromLocalStorage(noteElement);
      saveToLocalStorage();
      renderNotes();
      closeModal();
    } else if (clickedElement === yellow || red || green) {
      if (clickedElement === yellow) {
        noteElement.style.backgroundColor = "yellow";
        myLibrary[index].color = "yellow";
        saveToLocalStorage();
      } else if (clickedElement === red) {
        noteElement.style.backgroundColor = "red";
        myLibrary[index].color = "red";
        saveToLocalStorage();
      } else if (clickedElement === green) {
        noteElement.style.backgroundColor = "green";
        myLibrary[index].color = "green";
        saveToLocalStorage();
      }
    }
  });

  function handleModal(event) {
    index = event.target.dataset.note;
    modalTitle.value = myLibrary[index].title;
    modalText.value = myLibrary[index].text;
  }
  window.addEventListener("load", () => {
    loadNotesFromLocalStorage();
    renderNotes();
  });
}
addBookToLibrary();
