console.log("this my first js project ");

showNotes();

//if user adds a note , add it to the local storage
let addBtn = document.getElementById('addBtn');
//this line of code to get id (add note) button 
addBtn.addEventListener('click', function (e) {
    //apply for click event to (add note) button and execute function 
    let addTxt = document.getElementById('addTxt');
    //this line of code to get id for the textarea
    let notes = localStorage.getItem('notes');
    //this line of code to get localstorage key value to storing notes variable
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        //this line of code json.parse to covert (array to string) to storing notesobj variable
    }
    notesObj.push(addTxt.value);
    //this line off code to textarea id value to storing notesobj variable
    localStorage.setItem('notes', JSON.stringify(notesObj));
    // storing array value to localstorge 
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})

//Function to show element from localstorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
               <h5 class="card-title">Note ${index + 1}</h5>
               <p class="card-text">${element}</p>
               <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div> `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<h4>Nothing to show! Use "Add a Note" Selection above to add notes</h4>`;
    }
}

// Function to Delete a Note 
function deleteNote(index) {
    // console.log('I am Deleting', index)

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input Event Fired!', inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";

        }
        else {
            element.style.display = "none";
        }

    })

})

/* further features :
1. Add Title 
2. Mark a note as Important 
3. Seprate notes By User 
4. Syn and host to web server
*/