$('.save-note').on('click', saveNewNote);

function saveNewNote() {

    const $newTitle = $('#newTitle').val();
    const $newText = $('#newText').val();

    var newNote = {
        title: $newTitle,
        text: $newText
      };
      
    console.log(`saving new note: ${newNote}`);

    var saveNote = function(note) {
        return $.ajax({
          url: "/api/notes",
          data: note,
          method: "POST"
        }).then( function( response ){
          console.log(`we made it!`);
        });
      };

    saveNote(newNote);

    }

