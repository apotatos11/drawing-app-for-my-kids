import { CREATE_NOTEBOOK, DELETE_NOTEBOOK } from "../actions/noteBookActions";

export default function notebookReducer(state, action) {
  let newState;
  const newDate = new Date();

  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = [
        ...state,
        {
          noteBookTitle: action.payload.newNoteTitle,
          noteBookCoverImage: action.payload.newNoteCoverImage,
          updatedAt: newDate,
          createdAt: newDate,
          pictures: [],
        },
      ];

      return newState;
    case DELETE_NOTEBOOK:
      newState = state.filter((item) => item._id !== action.payload._id);

      return newState;
    default:
      return state;
  }
}
