const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080; 

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

//array for title/text object. It changes a lot....
let notesList = [];

//post to get new note. This function clears the notesList array and pushes the database and new note
// into it to make sure all of the objects are in one array.
//
app.post( '/api/notes', function ( req, res){

    let startNotes = fs.readFileSync( 'db.json', 'utf8');
//clear array
      notesList = [];
//add parsed database into array
      if ( startNotes == ""){
          console.log( 'empty db!')
      } else {
            const parseNotes = JSON.parse( startNotes );
            parseNotes.forEach( function ( note ){
              notesList.push( note );
            })
          }
// add new note into array
      notesList.push( req.body )
// stringify and rewrite database with new array
      let jsonList = JSON.stringify(notesList);
      fs.writeFileSync('db.json', jsonList);
//send JSON array to front end
    res.send ( jsonList );
})

//.Get to send database notes to front-end when page loads
app.get( '/api/startNotes', function ( req, res) {
  let startNotes = fs.readFileSync( 'db.json', 'utf8');
  console.log( startNotes );
  res.send( startNotes );
})

//delete receives note id through parameter. Pulls notes from database, and filters out note with id that needs to be deleted
app.delete( '/api/tables/:noteID', async function( req, res ){
//create var for revecing parameter
  const noteID = req.params.noteID;
  console.log(noteID);
//clearing array with notes
  notesList = [];
//taking notes from database and pushing into server array
  let startNotes = fs.readFileSync( 'db.json', 'utf8');
      if ( startNotes == ""){
          console.log( 'empty db!')
      } else {
            const parseNotes = JSON.parse( startNotes );
            parseNotes.forEach( function ( note ){
              notesList.push( note );
            })
          }
//filtering out the deleted note and we-writing the server array
    notesList = notesList.filter( function( note){
      return note.id !== noteID;
    });
//re-writing database with new array (without deleted object) 
    let jsonList = JSON.stringify(notesList);
    fs.writeFileSync('db.json', jsonList);

  res.send( notesList );
})

