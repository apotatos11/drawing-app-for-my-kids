import * as FileSystem from "expo-file-system";

export const downloadImageToFileSystem = async (url) => {
  try {
    const result = await FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + "picture" + new Date().getTime() + ".jpg"
    );

    console.log("Finished downloading to ", result.uri);
  } catch (error) {
    console.log(error);
  }
};

export const readDirectoryFromFileSystem = async () => {
  try {
    const result = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
