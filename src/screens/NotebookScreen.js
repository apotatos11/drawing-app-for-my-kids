import { useEffect, useState } from "react";
import { Text, FlatList, Alert } from "react-native";
import styled from "styled-components/native";
import PictureItem from "../components/buttons/PictureItem";
import {
  downloadImageToFileSystem,
  readDirectoryFromFileSystem,
} from "../utils/fileSystemHelper";
import { tempPictureListData } from "../constants/tempData";

const NoteBookScreen = ({ route, navigation }) => {
  console.log(route.params);
  const { pictures, noteBookTitle } = route.params;
  const [pictureList, setPictureList] = useState(tempPictureListData);

  // 파일 목록 불러와서 넣어주기
  // useEffect(() => {
  //   setPictureList(pictures);
  // }, [pictures]);

  // readDirectoryFromFileSystem();

  return (
    <Contatiner>
      <LeftMainView>
        {pictureList.length > 0 ? (
          <FlatList
            data={pictureList.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            )}
            renderItem={({ item }) => (
              <PictureItem
                navigation={navigation}
                item={item}
                uri={item.filePath}
              />
            )}
            keyExtractor={(item, index) => item._id + index}
            numColumns={3}
          />
        ) : (
          <Text style={{ paddingLeft: 20, fontSize: 20 }}>
            그림 목록이 없습니다.
          </Text>
        )}
      </LeftMainView>
      <RightControlView>
        <TopButtons>
          <NewPictureButton onPress={() => navigation.navigate("Painter")}>
            <Text style={{ fontSize: 60, marginBottom: 20 }}>📄</Text>
          </NewPictureButton>
          <LoadPictureButton onPress={() => navigation.navigate("LoadImage")}>
            <Text style={{ fontSize: 60, marginBottom: 20 }}>✂️</Text>
          </LoadPictureButton>
        </TopButtons>
        <BottomButtons>
          <DeleteNotebookButton
            onPress={() => Alert.alert("노트북 삭제버튼입니다.")}
          >
            <Text style={{ fontSize: 60 }}>🗑</Text>
          </DeleteNotebookButton>
        </BottomButtons>
      </RightControlView>
    </Contatiner>
  );
};

export default NoteBookScreen;

const Contatiner = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
`;

const LeftMainView = styled.View`
  width: 88%;
  background-color: white;
  padding-top: 20px;
`;

const RightControlView = styled.View`
  width: 12%;
  background-color: silver;
  padding-top: 30px;
  padding-bottom: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopButtons = styled.View``;
const NewPictureButton = styled.Pressable``;
const LoadPictureButton = styled.Pressable``;

const BottomButtons = styled.View``;
const DeleteNotebookButton = styled.Pressable``;
