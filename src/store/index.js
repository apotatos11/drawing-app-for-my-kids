import notebookReducer from "./reducers/noteBookReducer";
import {
  setItemToAsyncStorage,
  getItemFromAsyncStorage,
} from "../utils/asyncStorageHelper";

export const dispatchNotes = async (action) => {
  const currentState = await getItemFromAsyncStorage("Notes");

  const result = notebookReducer(currentState, action);
  setItemToAsyncStorage("Notes", result);
};
