import * as FileSystem from "expo-file-system";

// 기초 변수 설정

const { documentDirectory, cacheDirectory } = FileSystem;
const temporaryPicture = "temporaryPicture.png";

export const temporaryPictureUri = cacheDirectory + temporaryPicture;

export const filePathMaker = (folderName, fileName) => {
  const filePath =
    documentDirectory + "notebooks/" + folderName + "/" + fileName + ".png";

  return filePath;
};

export const folderPathMaker = (folderName) => {
  const folderPath = documentDirectory + "notebooks/" + folderName;

  return folderPath;
};

// 로컬 폴더, 파일 CRUD

// 1) 디렉토리 관련 처리

export const readDirectoryFromDocumentDirectory = async (folderName = "") => {
  try {
    const result = await FileSystem.readDirectoryAsync(
      documentDirectory + folderName
    );
    console.log("Return is", result);
  } catch (error) {
    console.log(error);
  }
};

export const makeNotebooksDirectoryToFileSystem = async () => {
  try {
    await FileSystem.makeDirectoryAsync(documentDirectory + "notebooks", {
      intermediates: true,
    });
    console.log("폴더 생성 성공");
  } catch (error) {
    console.log(error);
  }
};

export const makeDirectoryToFileSystem = async (folderName) => {
  try {
    const result = await FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "notebooks/" + folderName
    );

    if (!result.exists) {
      await FileSystem.makeDirectoryAsync(
        documentDirectory + "notebooks/" + folderName,
        {
          intermediates: true,
        }
      );
      console.log("폴더 생성 성공");
      return;
    }

    console.log("폴더 이미 존재함");
  } catch (error) {
    console.log(error);
  }
};

// 2) 파일 관련 처리

// 로컬 파일 생성

export const makeImageFile = async (filePath, base64Contents) => {
  try {
    await FileSystem.writeAsStringAsync(filePath, base64Contents, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log("파일 생성 성공!");
  } catch (error) {
    console.log(error);
  }
};

// 로컬 파일 읽기

export const readImageFile = async (filePath) => {
  try {
    const result = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    console.log(error);
  }
};

export const readTemporaryImageFile = async () => {
  try {
    const result = await FileSystem.readAsStringAsync(temporaryPictureUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  } catch (error) {
    console.log(error);
  }
};

// 복사 로컬 파일

export const copyPhotoAlbumImageFileToCacheDirectory = async (
  orginalImageUri
) => {
  try {
    const temporaryImageFile = await FileSystem.getInfoAsync(
      temporaryPictureUri
    );

    if (temporaryImageFile.exists) {
      await deleteTemporaryImage();
    }

    await FileSystem.copyAsync({
      from: orginalImageUri,
      to: temporaryPictureUri,
    });

    console.log("임시파일 생성 성공!");
  } catch (error) {
    console.log(error);
  }
};

export const copyTemporaryImageFileToDocumentDirectory = async (filePath) => {
  try {
    await FileSystem.copyAsync({
      from: temporaryPictureUri,
      to: filePath,
    });

    const result = await FileSystem.getInfoAsync(filePath);

    console.log("실제 파일 생성 성공!", result.exists);
  } catch (error) {
    console.log(error);
  }
};

// 삭제 로컬 파일

export const deletePathFromDocumentDirectory = async (path) => {
  try {
    await FileSystem.deleteAsync(path);
    console.log("삭제 성공");
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolderFromDocumentDirectory = async (folderName) => {
  try {
    await FileSystem.deleteAsync(folderPathMaker(folderName));
    console.log("폴더 삭제 성공");
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotebooksFolderFromDocumentDirectory = async () => {
  try {
    await FileSystem.deleteAsync(documentDirectory + "notebooks");
    console.log("노트북 폴더 삭제 성공");
  } catch (error) {
    console.log(error);
  }
};

export const deleteTemporaryImage = async () => {
  try {
    await FileSystem.deleteAsync(temporaryPictureUri);
    console.log("임시 파일 삭제 성공");
  } catch (error) {
    console.log(error);
  }
};

// 다운로드 파일

export const downloadTemporaryImageToCacheDirectory = async (url) => {
  try {
    const temporaryImageFile = await FileSystem.getInfoAsync(
      temporaryPictureUri
    );

    if (temporaryImageFile.exists) {
      await deleteTemporaryImage();
    }

    const result = await FileSystem.downloadAsync(url, temporaryPictureUri);

    console.log("Finished downloading to ", result.uri);
  } catch (error) {
    console.log(error);
  }
};
