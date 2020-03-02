$('.save-note').on('click', saveNewNote);

let i = 0;

function saveNewNote() {

    const $newTitle = $('#newTitle').val();
    const $newText = $('#newText').val();

    var newNote = {
        id : i,
        title: $newTitle,
        text: $newText
      };
      i++;
      
    console.log(`saving new note: ${newNote}`);

    var saveNote = function ( note ) {
        return $.ajax({
          url: "/api/notes",
          data: note,
          method: "POST"
        });
      };
    saveNote ( newNote ).then( function (response) {
      console.log(response);
      const newList = JSON.parse( response );
      appendNotes( newList );
    });
}

$(document).ready( async function() {
  const startResonse = await $.get ( '/api/startNotes');
  console.log(startResonse);
  const startList = JSON.parse(startResonse);
  console.log(startList);
    appendNotes( startList )
  })

 async function deleteNote ( noteID ){
    console.log( 'delete:', noteID );
    const response = await $.ajax({
      url: `/api/tables/${noteID}`,
      type: 'DELETE' });
    console.log( `finished deleting table: `, noteID  );
    // toastr.info( apiResult.message );
    console.log( response );
    appendNotes( response );
    // setTimeout( function(){ location.reload(); }, 3000 );
  }

  
  

  function appendNotes( list ) {
    $( '.list-group' ).empty();
    list.forEach( function( note ) {
      $('.list-group').append (`
      <div class="note">
      <h3>${note.title}</h3>
      <button id="${note.id}" style="float: right;" onClick="deleteNote('${note.id}')" >delete</button><hr>
      <div class="text">${note.text}</div>
      `)
    })
  }

// this is the real index
