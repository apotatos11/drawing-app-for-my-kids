import { useState, useEffect } from "react";
import { getItemFromAsyncStorage } from "../utils/asyncStorageHelper";

const useFetchNotebooks = (isFocused, currentModal) => {
  const [noteBookList, setNoteBookList] = useState([]);

  useEffect(() => {
    const getNotebooks = async () => {
      const noteBookList = await getItemFromAsyncStorage("Notes");
      setNoteBookList(noteBookList);
    };

    getNotebooks();
  }, [isFocused, currentModal]);

  return { noteBookList, setNoteBookList };
};

export default useFetchNotebooks;
