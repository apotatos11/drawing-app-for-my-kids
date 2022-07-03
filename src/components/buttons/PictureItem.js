import styled from "styled-components/native";
import { Text } from "react-native";

const PictureItem = ({
  noteBookTitle,
  noteBookCoverImage,
  item,
  navigation,
}) => (
  <NoteBookCard onPress={() => navigation.navigate("Notebook", item)}>
    <Text style={{ fontSize: 60 }}>{noteBookCoverImage}</Text>
    <Text style={{ fontSize: 18 }}>{noteBookTitle}</Text>
  </NoteBookCard>
);

export default PictureItem;

const NoteBookCard = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  margin: 24px;
`;
