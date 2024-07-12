import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {

  async function handleClick() {
    try {
      const response = await fetch(`http://localhost:3000/delete/${props.id}`, {
        method: "DELETE",
        headers: {"Content-Type":"application/json"} 
      });
      const jsonData = response.json();
      props.onDelete(props.id);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}><DeleteIcon /></button>
    </div>
  );
}

export default Note;
