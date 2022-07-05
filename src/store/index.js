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

  console.log("시작 스테이트", initialState);

  const result = await notebookReducer(initialState, action);
  console.log("reducer의 결과", result);
  await setItemToAsyncStorage("Notes", result);
};
