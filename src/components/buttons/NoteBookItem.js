import styled from "styled-components/native";
import { Text, Alert } from "react-native";

const NoteBookItem = ({ noteBookTitle, noteBookCoverImage }) => (
  <NoteBookCard
    onPress={() => Alert.alert(`${noteBookTitle} 노트북 선택 하였습니다.`)}
  >
    <Text style={{ fontSize: 60 }}>{noteBookCoverImage}</Text>
    <Text style={{ fontSize: 18 }}>{noteBookTitle}</Text>
  </NoteBookCard>
);

export default NoteBookItem;

const NoteBookCard = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 24px;
`;
