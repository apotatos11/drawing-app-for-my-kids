import styled from "styled-components/native";
import { Text, Alert, Image } from "react-native";

const PictureItem = ({ navigation, item, uri }) => (
  <NoteBookCard onPress={() => Alert.alert(`${item._id}을 선택 하였습니다.`)}>
    <PictureImage source={uri} resizeMode="contain" />
  </NoteBookCard>
);

export default PictureItem;

const NoteBookCard = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  margin: 24px;
  border: 1px solid black;
`;

const PictureImage = styled.Image`
  width: 299px;
  height: 199px;
`;
