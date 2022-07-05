import { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Text,
  Alert,
  FlatList,
  StyleSheet,
  Modal,
  View,
  Pressable,
  TextInput,
} from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import IconButton from "../components/buttons/IconButton";
import NoteBookItem from "../components/buttons/NoteBookItem";
import { tempNoteListData } from "../constants/tempData";
import bookCoverImageList from "../constants/bookCoverImageList";
import {
  getItemFromAsyncStorage,
  setItemToAsyncStorage,
} from "../utils/asyncStorageHelper";
import { createNotebook } from "../store/actions/noteBookActions";
import { dispatchNotes } from "../store/index";

const HomeScreen = ({ navigation }) => {
  const [noteBookList, setNoteBookList] = useState([]);
  const [currentModal, setCurrentModal] = useState(null);

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteCoverImage, setNewNoteCoverImage] = useState("");
  const [currentChosenItem, setChosenItem] = useState("");

  const getNoteBooks = async () => {
    try {
      const result = await getItemFromAsyncStorage("Notes");

      if (result === null || !result.length) {
        await setItemToAsyncStorage("Notes", tempNoteListData);
      }

      setNoteBookList(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNoteBooks();
  }, [noteBookList]);

  return (
    <Contatiner>
      <LeftMainView>
        {noteBookList.length > 0 ? (
          <FlatList
            data={noteBookList.sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            )}
            renderItem={({ item }) => (
              <NoteBookItem
                navigation={navigation}
                noteBookTitle={item.noteBookTitle}
                noteBookCoverImage={item.noteBookCoverImage}
                item={item}
              />
            )}
            keyExtractor={(item, index) => item.noteBookTitle + index}
            numColumns={6}
          />
        ) : (
          <Text style={{ paddingLeft: 20, fontSize: 20 }}>
            노트북 목록이 없습니다.
          </Text>
        )}
      </LeftMainView>
      <RightControlView>
        <NewButton
          onPress={() => setCurrentModal("newNoteModal")}
          icon={<FontAwesome5 name="plus" size={36} color="black" />}
        />
        <InfoButton
          onPress={() => setCurrentModal("infoModal")}
          icon={<FontAwesome5 name="info-circle" size={36} color="black" />}
        />
        <NewNoteModal
          animationType="slide"
          transparent={true}
          visible={currentModal === "newNoteModal"}
          onRequestClose={() => {
            setCurrentModal(null);
          }}
        >
          <View style={styles.centeredView}>
            <NewNoteModalView>
              <Text
                style={{
                  marginBottom: 20,
                  fontSize: 30,
                }}
              >
                노트북 제목
              </Text>
              <NewNoteModalTextInput
                placeholder="제목을 입력하세요"
                style={{ marginBottom: 20, paddingLeft: 5, fontSize: 20 }}
                value={newNoteTitle}
                onChangeText={(text) => setNewNoteTitle(text)}
              />
              <Text style={{ marginBottom: 20, fontSize: 30 }}>
                노트북 커버 이미지
              </Text>
              <View style={{ height: 200 }}>
                <FlatList
                  style={{ height: 400 }}
                  data={bookCoverImageList}
                  renderItem={({ item }) => (
                    <Pressable
                      onPress={() => {
                        setNewNoteCoverImage(item.image);
                        setChosenItem(item.id);
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          marginRight: 30,
                        }}
                      >
                        <Text style={{ fontSize: 60 }}>{item.image}</Text>
                        {item.id === currentChosenItem && (
                          <FontAwesome5
                            name="check-circle"
                            size={24}
                            color="black"
                          />
                        )}
                      </View>
                    </Pressable>
                  )}
                  numColumns={7}
                />
              </View>
              <NewNoteModalButtonsView>
                <NewNoteModalCreateButton
                  onPress={async () => {
                    if (!newNoteTitle || !newNoteCoverImage) {
                      Alert.alert("폼 작성을 완료하세요!");
                      return;
                    }

                    dispatchNotes(
                      createNotebook(newNoteTitle, newNoteCoverImage)
                    );

                    setCurrentModal(null);
                    setNewNoteCoverImage("");
                    setNewNoteTitle("");
                    setChosenItem("");
                  }}
                >
                  <Text>생성</Text>
                </NewNoteModalCreateButton>
                <NewNoteModalCancleButton
                  onPress={() => {
                    setCurrentModal(null);
                    setNewNoteCoverImage("");
                    setNewNoteTitle("");
                    setChosenItem("");
                  }}
                >
                  <Text>취소</Text>
                </NewNoteModalCancleButton>
              </NewNoteModalButtonsView>
            </NewNoteModalView>
          </View>
        </NewNoteModal>
        <InfoModal
          animationType="slide"
          transparent={true}
          visible={currentModal === "infoModal"}
          onRequestClose={() => {
            setCurrentModal(null);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalText>{`수오지오를 위한 아빠의 선물 😘`}</ModalText>
              <ModalCloseButton onPress={() => setCurrentModal(null)}>
                <Feather name="x-circle" size={24} color="black" />
              </ModalCloseButton>
            </View>
          </View>
        </InfoModal>
      </RightControlView>
    </Contatiner>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 145,
  },
  modalView: {
    width: "100%",
    height: "91.1%",
    paddingLeft: 25,
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
    elevation: 5,
  },
});

const Contatiner = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
`;

const LeftMainView = styled.SafeAreaView`
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

const NewButton = styled(IconButton)``;

const InfoButton = styled(IconButton)``;

const ModalCloseButton = styled(Pressable)`
  align-self: flex-end;
  position: absolute;
  border-radius: 20px;
  padding: 10px;
`;

const InfoModal = styled(Modal)``;

const ModalText = styled(Text)`
  margin-bottom: 15px;
  text-align: center;
  font-size: 48px;
`;

const NewNoteModal = styled(Modal)``;

const NewNoteModalView = styled(View)`
  width: 100%;
  height: 90%;
  background-color: white;
  border-radius: 20px;
  padding-top: 50px;
  display: flex;

  padding-left: 20px;
`;

const NewNoteModalTextInput = styled(TextInput)`
  height: 40px;
  width: 200px;
  border: 1px solid black;
`;

const NewNoteModalButtonsView = styled(View)`
  display: flex;
  flex-direction: row;
`;

const NewNoteModalButton = styled(Pressable)`
  width: 100px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
`;

const NewNoteModalCreateButton = styled(NewNoteModalButton)``;

const NewNoteModalCancleButton = styled(NewNoteModalButton)``;
