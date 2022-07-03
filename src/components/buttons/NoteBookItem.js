import styled from "styled-components/native";
import { Text, Alert } from "react-native";

const NoteBookItem = ({ name, bookCoverImage }) => (
  <NoteBookCard onPress={() => Alert.alert(`${name} 노트북 선택 하였습니다.`)}>
    <Text style={{ fontSize: 60 }}>{bookCoverImage}</Text>
    <Text style={{ fontSize: 20 }}>{name}</Text>
  </NoteBookCard>
);

export default NoteBookItem;

const NoteBookCard = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 24px;
`;
