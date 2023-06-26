import React from 'react';
import { useState,useContext} from 'react';
import contextValue from '../context/notes/noteContext';

const Addnote = (props) => {

    

    const onChange = (e)=>{
        setNote({...note,[e.target.name] : e.target.value});
    }

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added Successfully","success");

    }

    const[note,setNote] = useState({title : "",description :"",tag : ""})

    const context = useContext(contextValue);
    const {addNote} = context;
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<5  || note.description.length<5}>Add note</button>
</form>
    
    </div>
    </div>
  )
}

export default Addnote
