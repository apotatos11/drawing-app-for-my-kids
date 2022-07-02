import {
  Text,
  Alert,
  FlatList,
  StyleSheet,
  Modal,
  View,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import IconButton from "../components/buttons/IconButton";
import { tempNoteListData } from "../constants/tempData";

const HomeScreen = ({ navigation }) => {
  const [noteBookList, setNoteBookList] = useState(tempNoteListData);
  const [modalVisible, setModalVisible] = useState(false);

  const NoteBookItem = ({ name, bookCoverImage }) => (
    <NoteBookCard
      onPress={() => Alert.alert(`${name} 노트북 선택 하였습니다.`)}
    >
      <Text style={{ fontSize: 60 }}>{bookCoverImage}</Text>
      <Text style={{ fontSize: 20 }}>{name}</Text>
    </NoteBookCard>
  );

  const renderItem = ({ item }) => (
    <NoteBookItem name={item.name} bookCoverImage={item.bookCoverImage} />
  );

  return (
    <Contatiner>
      <LeftSide>
        <FlatList
          data={noteBookList}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          numColumns={7}
        />
      </LeftSide>
      <RightControl>
        <IconButton
          onPress={() => Alert.alert("새 노트북 버튼 눌렸음")}
          icon={<FontAwesome5 name="plus" size={36} color="black" />}
        />
        <IconButton
          onPress={() => setModalVisible(true)}
          icon={<FontAwesome5 name="info-circle" size={36} color="black" />}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ModalText>{`수오지오를 위한 아빠의 선물 😘`}</ModalText>
              <ButtonClose onPress={() => setModalVisible(!modalVisible)}>
                <Feather name="x-circle" size={24} color="black" />
              </ButtonClose>
            </View>
          </View>
        </Modal>
      </RightControl>
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
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 50,
    alignItems: "center",
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

const LeftSide = styled.SafeAreaView`
  width: 88%;
  background-color: white;
  padding-top: 20px;
`;

const NoteBookCard = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 24px;
`;

const RightControl = styled.View`
  width: 12%;
  background-color: silver;
  padding-top: 30px;
  padding-bottom: 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalView = styled(View)``;

const ButtonClose = styled(Pressable)`
  align-self: flex-end;
  position: absolute;
  border-radius: 20px;
  padding: 10px;
`;

const ModalText = styled(Text)`
  margin-bottom: 15px;
  text-align: center;
  font-size: 48px;
`;
