import React, { Component } from 'react'
import './Note.css'

class Note extends Component {
	constructor(props) {
		super();
		this.noteContent = props.noteContent;
		this.noteId = props.noteId;
	}

	handleRemove(id) {
		const response = window.confirm('Are you sure to want this');
		if(response) {
			this.props.removeNote(id);
		}
		return;
	}
	render() {
		return (
			<div className="Note">
				<div key={this.noteId}>
				<span>{this.noteId}</span> - <span>{this.noteContent}</span>
				<span className="nRmv" onClick={() => this.handleRemove(this.noteId)}>X</span>
				</div>
			</div>
		)
	}
}

export default Note;