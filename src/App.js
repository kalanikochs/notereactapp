import React, { Component } from 'react';
import firebase from 'firebase/app';
import { DB_CONFIG } from './config/config';
import 'firebase/database';
import Note from './Note/Note';
import NoteForm from './Note/NoteForm';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [
        
      ]
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes});
    });
    this.db.on('child_removed', snap => {
      for(let i = 0; i < notes.length; i++) {
        if(notes[i].noteId = snap.key) {
          notes.splice(i, 1);
        }
      }
      this.setState({notes});
    });
  }

  removeNote(noteId) {
    this.db.child(noteId).remove();
  }

  addNote(note) {
    this.db.push().set({noteContent: note});
  }
  render() {
    return (
    <div className="notesContainer">
      <div className="notesHeader">
        <img src={logo} alt="logo"/>
        <h1>Firebase Notes</h1>
      </div>

      <div className="notesBody">
      <ul>
        {
          this.state.notes.map(note => {
            return (
              <Note 
              noteContent={note.noteContent} 
              noteId={note.noteId} 
              key={note.noteId} 
              removeNote={this.removeNote}
              />
            )
          })
        }
      </ul>
      </div>

      <div className="notesFooter">
      <NoteForm addNote={this.addNote}/>
      </div>
    </div>
    )
  }
 
}

export default App;
