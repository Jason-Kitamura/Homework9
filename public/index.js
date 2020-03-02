$('.save-note').on('click', saveNewNote);

function saveNewNote() {

    const $newTitle = $('#newTitle').val();
    const $newText = $('#newText').val();

    var newNote = {
        title: $newTitle,
        text: $newText
      };
      
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

  function appendNotes( list ) {
    $( '.list-group' ).empty();
    list.forEach( function( note ) {
      $('.list-group').append (`
      <div class="note">
      <h3>${note.title}</h3>
      <hr>
      <div class="text">${note.text}</div>
      `)
    })
  }

// async function appendNotes() {
//    const noteList = await $.get('/api/notes');
//    console.log('note list from api:', noteList )
//    noteList.forEach( function( note) {
//      $('.list-group').append(`
//         <div class="note">
//             <h3>${note.title}</h3>
//             <hr>
//             <div class="text">
//             <p>${note.text}</p>
//           </div>
//      `)
//    })

// }

// this is the real index
