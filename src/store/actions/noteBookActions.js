export const GET_NOTEBOOK = "GET_NOTEBOOK";
export const CREATE_NOTEBOOK = "CREATE_NOTEBOOK";
export const UPDATE_NOTEBOOK = "UPDATE_NOTEBOOK";
export const DELETE_NOTEBOOK = "DELETE_NOTEBOOK";

export const createNotebook = (newNoteTitle, newNoteCoverImage) => ({
  type: CREATE_NOTEBOOK,
  payload: { newNoteTitle, newNoteCoverImage },
});

export const deleteNotebook = (notebookId) => ({
  type: DELETE_NOTEBOOK,
  payload: { notebookId },
});
