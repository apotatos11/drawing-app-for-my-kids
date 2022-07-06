import notebookReducer from "./reducers/noteBookReducer";
import {
  setItemToAsyncStorage,
  getItemFromAsyncStorage,
} from "../utils/asyncStorageHelper";

export const dispatchNotes = async (action) => {
  const currentState = await getItemFromAsyncStorage("Notes");
  let initialState = [];
  if (currentState) {
    initialState = currentState;
  }

  const result = notebookReducer(initialState, action);
  await setItemToAsyncStorage("Notes", result);
};
