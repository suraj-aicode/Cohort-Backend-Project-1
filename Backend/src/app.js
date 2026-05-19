/* 
server ko create karna
*/

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));
const cors = require('cors');
app.use(cors());
const path = require('path');
const notemodel = require('./models/note.model');
/*
    Post /api/notes
    create new note and save data in mongoDB
    req.body me title and description aayega
*/
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

    const note = await notemodel.create({
        title,
        description
    })
    res.status(201).json({
        message : "note created successfully",
        note
    });
});


/*
    Get /api/notes
    fetch all notes data from mongoDB and send them in response
*/

app.get('/api/notes', async(req, res) => {
    const notes = await notemodel.find()

    res.status(200).json({
        message : "notes fetched successfully",
        notes
    });
})

/*
    Delete /api/notes/:id
    delete the note with the given id from req.params
*/

app.delete('/api/notes/:id',async (req, res) => {
    const id = req.params.id;
    await notemodel.findByIdAndDelete(id);
    res.status(200).json({
        message : "note deleted successfully"
    });
})

/*
    PATCH /api/notes/:id
    update the description of the note
    req.body = {description}
*/

app.patch('/api/notes/:id',async (req, res) => {
    const id = req.params.id;
    const { description } = req.body;

    const updatedNote = await notemodel.findByIdAndUpdate(id, { description }, { new: true });
    res.status(200).json({
        message : "note updated successfully",
        note : updatedNote
    });
})

/*
    
*/

app.use(express.static(path.join(__dirname, "..", "Frontend", "dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Frontend", "dist", "index.html"));
});
module.exports = app;
