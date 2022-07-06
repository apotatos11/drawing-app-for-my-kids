import styled from "styled-components/native";
import { Text } from "react-native";

const ColorButtonItem = ({ color, PressHandler }) => (
  <ColorButton onPress={() => PressHandler(color)}>
    <Text style={{ width: 38, height: 38, backgroundColor: color }}></Text>
  </ColorButton>
);

export default ColorButtonItem;

const ColorButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
`;
