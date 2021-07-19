import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../ImageList/ImageList.css";

const ImageList = (props) => {
  const { text, index } = props;
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <img
          className="itemLayout"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          src={`\\images\\${text}.jpeg`}
          alt={props.src}
        />
      )}
    </Draggable>
  );
};

export default ImageList;
