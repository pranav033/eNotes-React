import React from "react";
import { useState } from "react";
import { NavigationType } from "react-router-dom";
import NoteContext from "./noteContext";


const NoteState = (props)=>{

    const host = 'http://localhost:5000'

    const initialNotes = [
       
      ]

      const[notes,setNotes] = useState(initialNotes);

      //fetch all notes
      const fetchNote = async ()=>{
        //API call
        const fetchurl = `${host}/api/notes/fetchallnotes`
        const response = await fetch(fetchurl, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
          });
          const responseJson = await response.json(); 
          console.log(responseJson);
          setNotes(responseJson);
      }

      //Add a note
      const addNote = async (title,description,tag)=>{
        //API call
        const addurl = `${host}/api/notes/addnote`
        const response = await fetch(addurl, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const responseJson = await response.json(); 

          const note = responseJson;
        setNotes(notes.concat(note));
      }

      //Delete a note
      const deleteNote = async (id)=>{

        //API call
        const deleteurl = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(deleteurl, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
          });
          const responseJson = await response.json(); 
          console.log(responseJson);



          console.log("Node deleted "+id);
          const newNotes = notes.filter((note)=>{return note._id!==id});
          setNotes(newNotes);

      }

      //Edit a note
      const editNote = async (id,title,description,tag)=>{
        //API call
        const editurl = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(editurl, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const responseJson = await response.json(); 

          let newNotes = JSON.parse(JSON.stringify(notes));

          for (let index = 0; index < notes.length; index++) {
              const element = notes[index];
              if(element._id === id)
              {
                  newNotes[index].title = title;
                  newNotes[index].description = description;
                  newNotes[index].tag = tag;
                  break;
              }
              
          }
          console.log(id);
          setNotes(newNotes);
          console.log(notes);

      }
    
return ( 
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,fetchNote}}>
        {props.children}

    </NoteContext.Provider>
);
}



export default NoteState;