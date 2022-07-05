import styled from "styled-components/native";
import { Alert, StyleSheet, Image } from "react-native";

const PictureItem = ({ navigation, item, uri }) => (
  <NoteBookCard onPress={() => Alert.alert(`${item._id}을 선택 하였습니다.`)}>
    <Image source={{ uri }} style={styles.preview} />
  </NoteBookCard>
);

export default PictureItem;

const styles = StyleSheet.create({
  preview: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    transform: [{ scale: 0.95 }],
  },
});

const NoteBookCard = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px;
  border: 1px solid black;
`;
