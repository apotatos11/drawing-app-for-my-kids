import { useEffect, useState } from "react";
import { Text, FlatList, Alert } from "react-native";
import styled from "styled-components/native";

const PainterScreen = ({ route, navigation }) => {
  return (
    <Contatiner>
      <LeftMainView>
        <Text style={{ paddingLeft: 20, fontSize: 20 }}>그림판 화면</Text>
      </LeftMainView>
      <RightControlView>
        <NewPictureButton onPress={() => Alert.alert("파일 저장")}>
          <Text style={{ fontSize: 60, marginBottom: 20 }}>✅</Text>
        </NewPictureButton>
        <LoadPictureButton onPress={() => Alert.alert("카메라 이미지로 저장")}>
          <Text style={{ fontSize: 60 }}>📸</Text>
        </LoadPictureButton>
      </RightControlView>
    </Contatiner>
  );
};

export default PainterScreen;

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
  align-items: center;
`;

const NewPictureButton = styled.Pressable``;
const LoadPictureButton = styled.Pressable``;
