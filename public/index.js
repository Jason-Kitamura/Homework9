//adding event listeners
$('.save-note').on('click', saveNewNote);
$('.edit-note').on('click', toggleDelete);
//creating variable for id (let to is can be changed thoughout script)
let i = 0;

//function to save new note
function saveNewNote() {
    
    const $newTitle = $('#newTitle').val();
    const $newText = $('#newText').val();
//creating var for new note with title and text values
    var newNote = {
        id : i,
        title: $newTitle,
        text: $newText
      };
//increasing the id var after note created
      i++;
    console.log(`saving new note: ${newNote}`);
//ajax funtion to post the new note variable
    var saveNote = function ( note ) {
        return $.ajax({
          url: "/api/notes",
          data: note,
          method: "POST"
        });
      };
    saveNote ( newNote ).then( function (response) {
// parse the response (noteslist) and append to column
      console.log(response);
      const newList = JSON.parse( response );
      appendNotes( newList );
    });
//clear text values of inputs
    $('#newTitle').val('');
    $('#newText').val('');
}

//function to toggle show/hide for delete buttons
let viewDelete=true;

function toggleDelete() {
  console.log('edit toggle');
  viewDelete = !viewDelete;

    if (viewDelete==true){
    $('.delete').removeClass('hide');
    } else {
    $('.delete').addClass('hide');
  }
}

//function to reveive databse notelist from server when the page is loaded
$(document).ready( async function() {
  const startResonse = await $.get ( '/api/startNotes');
  const startList = JSON.parse(startResonse);
    appendNotes( startList )
// getting id from last object in array so that creating a new note after page refresh 
//will not reset to 0 and multiple notes will have same id
    startId = startList[startList.length - 1]
    console.log(startId.id);
    i = startId.id;
    i++
    toggleDelete();
  })

//delete function that passes in note id from button
 async function deleteNote ( noteID ){
    console.log( 'delete:', noteID );
//delete request with note id as parameter
    const response = await $.ajax({
      url: `/api/tables/${noteID}`,
      type: 'DELETE' });
    console.log( `finished deleting table: `, noteID  );
//append notelist with new array (excluding deleted item)
    appendNotes( response );
  }

// function to append note list. Taking in array of object (title text)
function appendNotes( list ) {
  $( '.list-group' ).empty();
  list.forEach( function( note ) {
    $('.list-group').append (`
      <div class="note">
        <h3>${note.title}</h3>
        <button id="${note.id}" class="delete" style="float: right;" onClick="deleteNote('${note.id}')" >delete</button><hr>
        <div class="text">${note.text}</div>
      <div>
    `)
  })
}

