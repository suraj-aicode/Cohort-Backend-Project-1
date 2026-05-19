import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([]);

  function fetchNotes() { 
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    }); 
  }
  useEffect(() => {
    fetchNotes();
  }, []);

 
  function handleSubmit(e) {
    e.preventDefault();
    const [title, description] = e.target.elements;
    console.log(title.value, description.value);

    axios.post("http://localhost:3000/api/notes", {
      title : title.value,
      description : description.value
    }).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleDelete(noteId) { 
    axios.delete('http://localhost:3000/api/notes/' + noteId)
      .then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleEdit(noteId) {
    axios.patch('http://localhost:3000/api/notes/' + noteId, {
      title: "updated title",
      description: "updated description"
    })
    .then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input type="text" placeholder='title' name='title' />
        <input type="text" placeholder='description' name='description' />
        <button>Create Note</button>
      </form>

      <div className='notes'>
        {
          notes.map(note => {
            return (
              <div className="note">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
                <button onClick={() => handleEdit(note._id)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </div>
            );
          })
        }
        
      </div>
    </>
  )
}
export default App

