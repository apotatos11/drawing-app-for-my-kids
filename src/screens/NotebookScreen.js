import { useEffect, useState, useLayoutEffect } from "react";
import {
  Text,
  FlatList,
  Alert,
  Modal,
  View,
  Pressable,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import PictureItem from "../components/buttons/PictureItem";

import { tempPictureListData } from "../constants/tempData";
import { deleteNotebook } from "../store/actions/noteBookActions";
import { dispatchNotes } from "../store/index";

const NoteBookScreen = ({ route, navigation }) => {
  const [pictureList, setPictureList] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  const { pictures, noteBookTitle, _id: notebookId } = route.params;

  useLayoutEffect(() => {
    setPictureList(tempPictureListData);
  }, [pictureList]);

  // readDirectoryFromFileSystem();

  console.log(notebookId);
  console.log(currentModal);

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
            onPress={() => {
              setCurrentModal("deleteNoteModal");
            }}
          >
            <Text style={{ fontSize: 60 }}>🗑</Text>
          </DeleteNotebookButton>
        </BottomButtons>
        <DeleteNoteModal
          animationType="slide"
          transparent={true}
          visible={currentModal === "deleteNoteModal"}
          onRequestClose={() => {
            setCurrentModal(null);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalView>
                <ModalCautionView>
                  <ModalCautionText>
                    노트북을 삭제 하시겠습니까?
                  </ModalCautionText>
                </ModalCautionView>
                <ModalButtonView>
                  <ModalButton onPress={() => setCurrentModal(null)}>
                    <ModalButtonText>취소</ModalButtonText>
                  </ModalButton>
                  <ModalButton
                    onPress={async () => {
                      await dispatchNotes(deleteNotebook(notebookId));
                      navigation.goBack();
                    }}
                  >
                    <ModalButtonText>삭제</ModalButtonText>
                  </ModalButton>
                </ModalButtonView>
              </ModalView>
            </View>
          </View>
        </DeleteNoteModal>
      </RightControlView>
    </Contatiner>
  );
};

export default NoteBookScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 145,
  },
  modalView: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

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

const DeleteNoteModal = styled(Modal)``;
const ModalView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCautionView = styled.View`
  width: 250px;
  height: 50px;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const ModalCautionText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: red;
`;

const ModalButtonView = styled.View`
  display: flex;
  flex-direction: row;
`;

const ModalButton = styled.Pressable`
  border: 2px solid black;
  border-radius: 5px;
  width: 100px;
  height: 35px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: black;
`;
