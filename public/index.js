//all of our fetch requests, and JV
const submitButtonEl = document.querySelector("#submit-note-btn");
const submitNoteForm = document.querySelector("#submit-note-form");

// 3 fields--title, body, author

const handleSubmitNote = (event) => {
    event.preventDefault();

    const title = submitNoteForm.querySelector("#title").value;
    const body = submitNoteForm.querySelector("#body").value;
    const author = submitNoteForm.querySelector("#author").value;
    const noteObject = { author, body, title };
    console.log(noteObject);

    // fetch here
    fetch("/api/notes", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteObject)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        alert("Error: " + response.statusText);
    }).then(renderNote());
}

const displayNote = (noteArray) => {
    // go thru the array of objects, all notes, and display them on the page.
    const noteSectionEl = document.querySelector("#note-section");
    console.log(noteArray);
    let str;
    for(i=0; i<noteArray.length; i++){
        str+=` <div>
                                <div>
                                <h1>
                                    ${noteArray[i].title}
                                </h1>
                                </div>
                                <div>
                                <h2>
                                    ${noteArray[i].body}
                                </h2>
                                </div>
                                <div>
                                <p>
                                    ${noteArray[i].author}
                                </p>
                                </div>
                                </div> 
                                <button type="submit" class="delete-note-btn" id="${noteArray[i].id}">Delete Note</button>`
                                ;
    }
    noteSectionEl.innerHTML=str;
};

// renderNote
const renderNote = () => {
    // fetch here
    fetch("/api/notes", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        console.log(data);
        console.log(data['data']);
        displayNote(data['data']);
    });
}

submitButtonEl.addEventListener("click", handleSubmitNote);
renderNote();