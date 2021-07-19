import React from "react";
import ImageList from "../ImageList/ImageList";
import "../Columns/Columns.css";
import { Droppable } from "react-beautiful-dnd";

const Columns = ({ col }) => {
  const { imageList, id } = col;
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="columnStyle">
          <h2>{id}</h2>
          <div
            className="rowStyle"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {imageList.map((text, index) => (
              <ImageList key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Columns;
