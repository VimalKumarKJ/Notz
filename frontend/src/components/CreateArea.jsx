import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {

  const [expand, setExpand] = useState(false);

  function handleExpand() {
    setExpand(true);
  }

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
    props.onAdd(note);
    event.preventDefault(); 
    try {
      const {title, content} = note;
      const body = {title, content};
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <Zoom in={true}>
      <form className="create-note" action="/add" onClick={handleExpand} method="POST">
        {expand 
        ?
        (
          <div className="create-note">
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
            <textarea
              name="content"
              onChange={handleChange}
              onClick={handleExpand}
              value={note.content}
              placeholder="Take a note..."
              rows="3"
            />
            <Fab onClick={submitNote}><AddIcon /></Fab>
          </div>
        )
        :
          <div className="create-note">
            <textarea
              name="content"
              onChange={handleChange}
              value={note.content}
              placeholder="Take a note..."
              rows="1"
            />
          </div>
        }
      </form>
      </Zoom>
    </div>
  );
}

export default CreateArea;
