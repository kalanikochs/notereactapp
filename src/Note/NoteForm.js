import React, { Component } from 'react'
import './Note.css';

class NoteForm extends Component {
	constructor() {
		super();
		this.addNote = this.addNote.bind(this);
	}

	addNote() {
		this.props.addNote(this.textInput.value);
		this.textInput.value = '';
		this.textInput.focus();
	}
	handleSubmit(e) {
		e.preventDefault();
	}
	render() {
		return(
		<form className="Noteform" onSubmit={this.handleSubmit}>
		<input type="text" ref={input => {this.textInput = input;}} />
		<button onClick={this.addNote}>Add note</button>
		</form>
		);
	}
}

export default NoteForm;