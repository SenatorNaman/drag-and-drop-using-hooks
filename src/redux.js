import { createStore } from "redux";

export const ACTIONS = {
  DRAG_HAPPENED: "DRAG_HAPPENED"
};

const initialState = {
  data: {
    column1: {
      id: "column1",
      imageList: ["first", "second", "third"]
    },
    column2: {
      id: "column2",
      imageList: []
    },
    column3: {
      id: "column3",
      imageList: []
    }
  }
};

function dndReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.DRAG_HAPPENED: {
      const newCol = action.payload;
      if (newCol.newStartCol) {
        const { newStartCol, newEndCol } = action.payload;
        return {
          ...state,
          data: {
            ...state.data,
            [newStartCol.id]: newStartCol,
            [newEndCol.id]: newEndCol
          }
        };
      }
      return {
        ...state,
        data: { ...state.data, [newCol.id]: newCol }
      };
    }
    default:
      return state;
  }
}

export function createReduxStore() {
  const store = createStore(dndReducer);
  return store;
}
