import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACTIONS } from "./redux";
import "./styles.css";
import Columns from "./Columns/Columns";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  const dndColumns = useSelector((state) => state.data);
  const dispatch = useDispatch();
  // State can be managed via UseState hooks also like below commented out lines
  // const [columns, setColumns] = useState(initialData);
  const onDragEnd = ({ source, destination }) => {
    // Checking if its a valid destination
    if (destination === undefined || destination === null) return null;
    // If its drag to the same column, do nothing
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = dndColumns[source.droppableId];
    const end = dndColumns[destination.droppableId];

    if (start === end) {
      const newList = start.imageList.filter((_, idx) => idx !== source.index);
      newList.splice(destination.index, 0, start.imageList[source.index]);

      const newCol = {
        id: start.id,
        imageList: newList
      };
      // Updating the state via redux-hooks
      dispatch({
        type: ACTIONS.DRAG_HAPPENED,
        payload: newCol
      });
      // Updating the state via UseState hooks
      // setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      /*If the droppaple source is different then We have 
      to update start and end columns respectively*/
      const newStartList = start.imageList.filter(
        (_, idx) => idx !== source.index
      );
      const newStartCol = {
        id: start.id,
        imageList: newStartList
      };
      const newEndList = end.imageList;

      newEndList.splice(destination.index, 0, start.imageList[source.index]);

      const newEndCol = {
        id: end.id,
        imageList: newEndList
      };
      // Updating the state via redux-hooks
      dispatch({
        type: ACTIONS.DRAG_HAPPENED,
        payload: { newStartCol, newEndCol }
      });

      // Updating the state via react hooks
      // setColumns((state) => ({
      //   ...state,
      //   [newStartCol.id]: newStartCol,
      //   [newEndCol.id]: newEndCol
      // }));
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columnContainer">
        {Object.values(dndColumns).map((col) => (
          <Columns col={col} key={col.id} />
        ))}
      </div>
    </DragDropContext>
  );
}
