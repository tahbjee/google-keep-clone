const myLibrary = [];

const notes = document.querySelector("#notes");
const noteTitle = document.querySelector("#note-title");
const closeFormButton = document.querySelector("#form-close-button");
const noteText = document.querySelector("#note-text");
const form = document.querySelector("#form");
const formButton = document.querySelector("#form-buttons");
const formContainer = document.querySelector("#form-container");
const mainContainer = document.querySelector("#main-container");
const note = document.querySelector(".note");

const submitButton = document.querySelector("#submit-button");

function Book() {
  // the constructor..
}

function addBookToLibrary() {
  // do stuff here

  function hasUserInput() {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    return title.length > 0 || text.length > 0; // Check if either has length
  }

  submitButton.addEventListener("click", (e) => {
    e.stopImmediatePropagation;
    e.preventDefault();
    if (hasUserInput()) {
      createNotes();
    }
  });

  function createNotes() {
    const title = noteTitle.value.trim();
    const text = noteText.value.trim();
    const newBook = { title, text };

    if (title || text) {
      notes.innerHTML = myLibrary
        .map(
          (book) => `
      <div class="note">
        <h3>${book.title}</h3>
        <p>${book.text}</p>
      </div>
    `
        )
        .join(" ");
    }
    myLibrary.push(newBook);
    console.log(myLibrary);
    clearInputText();
  }

  function clearInputText() {
    noteText.value = "";
    noteTitle.value = "";
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

  mainContainer.addEventListener("click", (event) => {
    const clickedElement = event.target; // Access the clicked element

    if (clickedElement === noteText) {
      openForm();
    } else if (clickedElement === closeFormButton) {
      closeForm();
    } else if (clickedElement === submitButton) {
      closeForm();
      console.log(event.target);
    } else if (clickedElement === mainContainer && hasUserInput()) {
      createNotes();
      closeForm();
      console.log(event.target);
    } else if (clickedElement === mainContainer && !hasUserInput()) {
      closeForm();
      console.log(event.target);
    }
  });
}
addBookToLibrary();
