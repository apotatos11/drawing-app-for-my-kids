import * as FileSystem from "expo-file-system";
import { makeNotebooksDirectoryToFileSystem } from "./fileSystemHelper";
import { getItemFromAsyncStorage } from "./asyncStorageHelper";

const initializingApp = async (setNoteBookList) => {
  const result = await FileSystem.getInfoAsync(
    FileSystem.documentDirectory + "notebooks"
  );

  if (!result.exists) {
    await makeNotebooksDirectoryToFileSystem();
  }

  const getNotebooks = async () => {
    const noteBookList = await getItemFromAsyncStorage("Notes");
    setNoteBookList(noteBookList);
  };

  getNotebooks();
};

export default initializingApp;
