import styled from "styled-components/native";
import { Text } from "react-native";

const IconButton = ({ title, onPress, icon }) => (
  <NotebookButton onPress={onPress}>
    <Text>{title}</Text>
    {icon}
  </NotebookButton>
);

const NotebookButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default IconButton;
