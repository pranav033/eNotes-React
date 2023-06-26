import React, { useContext,useRef,useState } from 'react'
import Noteitem from './Noteitem';
import contextValue from '../context/notes/noteContext';
import Addnote from './Addnote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

  const navigate = useNavigate();

    const context = useContext(contextValue);
    const {notes,fetchNote,editNote} = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const[note,setNote] = useState({id:"", etitle : "",edescription :"",etag : ""});

    useEffect(()=>{
      if(localStorage.getItem('token')){
        fetchNote()}
        else{
          navigate('/login');
        }
        // eslint-disable-next-line
    },[]);

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
      

    }
    

    const onChange = (e)=>{
      setNote({...note,[e.target.name] : e.target.value});
  }

  const handleClick = (e)=>{
      e.preventDefault();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refClose.current.click();
      console.log("updating the note..",note);
      props.showAlert("Updated Successfully","success");
      // addNote(note.title,note.description,note.tag);

  }

  return (
      <>
      <Addnote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
      </div>
    </div>
  </div>
</div>


    <div className="row">
        <h2 className="my-3">Your notes</h2>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
      {
        notes.map((note)=>{
            return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
        })
    }
    </div>
    </>
  )
}

export default Notes
