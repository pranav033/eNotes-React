const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// ROUTE 1
// get all the notes, login required
// GET : localhost:5000/api/auth/getuser
 router.get('/fetchallnotes',fetchuser, async (req,res)=>{

    try {
        const notes = await Note.find({user : req.user.id});
    res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }

    
     
 });


 // ROUTE 2
// Add a new note, login required
// POST : localhost:5000/api/auth/addnote
router.post('/addnote',fetchuser,[
    body('title','Minimum 3 characters required').isLength({ min: 3 }),
    body('description','Minimum 5 characters required').isLength({ min: 5 })
 ], async (req,res)=>{

    try {
        
        const {title, description,tag} = req.body;

    //if there are errors return error message.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
        title, description, tag, user : req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);

    } catch (error) {
        
        console.log(error);
        res.status(500).send("Internal server error")

    }

     
 });


// ROUTE 3
// Update a existing note, login required
// PUT : localhost:5000/api/auth/updatenote
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    const {title, descrition, tag} = req.body;
    const newNote = {};
    if(title) {newNote.title = title};
    if(descrition) {newNote.descrition = descrition};
    if(tag) {newNote.tag = tag};


    try {

        //Find the note to be updated and update it
    let note = await Note.findById(req.params.id);

    if(!note)
    {
        return res.status(404).send("Not found");
    }

    //Allow only authorised user to update the note
    if(note.user.toString() != req.user.id)
    {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
    res.send(note);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }

    


});



// ROUTE 3
// delete a existing note, login required
// DELETE : localhost:5000/api/auth/deletenote
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{


    try {


        //Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);

    if(!note)
    {
        return res.status(404).send("Not found");
    }

    //Allow only authorised user to delete a note
    if(note.user.toString() != req.user.id)
    {
        return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.send({Success : "Note has been deleted" , note:note});
        
    } catch (error) {
        

        console.log(error);
        res.status(500).send("Internal server error");
    }
    


});

 module.exports = router