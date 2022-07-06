import {
  CREATE_NOTEBOOK,
  DELETE_NOTEBOOK,
  ADD_PICTURE_TO_NOTEBOOK,
} from "../actions/noteBookActions";

export default function notebookReducer(state, action) {
  let newState;
  const newDate = new Date();

  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = [
        ...state,
        {
          _id: "notebook" + newDate.getTime(),
          noteBookTitle: action.payload.newNoteTitle,
          noteBookCoverImage: action.payload.newNoteCoverImage,
          updatedAt: newDate,
          createdAt: newDate,
          pictures: [],
        },
      ];

      return newState;
    case DELETE_NOTEBOOK:
      newState = state.filter((item) => item._id !== action.payload.notebookId);

      return newState;
    case ADD_PICTURE_TO_NOTEBOOK: {
      newState = [...state];
      const { notebookId, newPictureInfo } = action.payload;
      const targeIndex = newState.findIndex((a) => a._id === notebookId);

      newState[targeIndex]["pictures"].push(newPictureInfo);
      newState[targeIndex]["updatedAt"] = newDate;

      return newState;
    }
    default:
      return state;
  }
}
