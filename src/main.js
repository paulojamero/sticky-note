const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");


getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content){ //create the notes area elements
    const element = document.createElement("textarea");

    element.classList.add("note"); //add the css class 'note'
    element.value = content; //populate data in textarea
    element.placeholder = "Empty sticky Note";

    element.addEventListener("change", () => { //when updating
        updateNote(id, element.value);
    });

   element.addEventListener("wheel", () => {
     //when the user double clicks to delete
        const doDelete = confirm("are you sure you want to delete?");
        if (doDelete){
            deleteNote(id, element);
        }
    
   });


    return element;

}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);

}

function updateNote(id, newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
   const notes = getNotes().filter(note => note.id != id);

   saveNotes(notes);
   notesContainer.removeChild(element);
}