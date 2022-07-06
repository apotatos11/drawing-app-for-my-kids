import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmpty = function (value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const getItemFromAsyncStorage = async (storageName) => {
  if (isEmpty(storageName)) {
    throw Error("Storage Name is empty");
  }

  try {
    const result = await AsyncStorage.getItem(storageName);

    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};

export const setItemToAsyncStorage = async (storageName, item) => {
  if (isEmpty(storageName)) {
    throw Error("Storage Name is empty");
  }

  try {
    await AsyncStorage.setItem(storageName, JSON.stringify(item));

    return console.log("입력 성공");
  } catch (error) {
    console.log(error);
  }
};
