const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080; 

let notesList = [];




app.use(express.static('public'));
// needed for POST FORM requests
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

app.post( '/api/notes', function ( req, res){

  let startNotes = fs.readFileSync( 'db.json', 'utf8');

      notesList = [];

    console.log(`receving note:`, req.body);
    if ( startNotes == ""){
      console.log( 'empty db!')
    } else {
      const parseNotes = JSON.parse( startNotes );
      parseNotes.forEach( function ( note ){
        notesList.push( note );
      })
    }
  
      notesList.push(req.body)
    
      let jsonList = JSON.stringify(notesList);

      fs.writeFileSync('db.json', jsonList);

    res.send ( jsonList );
    // console.log('notes List:', notesList)
})
app.get( '/api/startNotes', function ( req, res) {
  let startNotes = fs.readFileSync( 'db.json', 'utf8');
  console.log( startNotes );
  res.send( startNotes );
})

// const readDB = fs.readFileSync('db.json', 'utf8') ;

// const parseDB = JSON.parse( readDB );

// app.get('/api/notes', function ( req, res) {
//   console.log('sent parseDB');
//   res.send( parseDB );
// })

