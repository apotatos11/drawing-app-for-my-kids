import { useEffect, useState } from "react";
import { Text, FlatList, Alert } from "react-native";
import styled from "styled-components/native";

const LoadImageScreen = ({ route, navigation }) => {
  return (
    <Contatiner>
      <UpperMainView>
        <Text style={{ paddingLeft: 20, fontSize: 20 }}>이미지 편집화면</Text>
      </UpperMainView>
      <DownerControlView>
        <NewPictureButton onPress={() => Alert.alert("파일 저장")}>
          <Text style={{ fontSize: 60, marginBottom: 20 }}>✅</Text>
        </NewPictureButton>
        <LoadPictureButton onPress={() => Alert.alert("카메라 이미지로 저장")}>
          <Text style={{ fontSize: 60 }}>📸</Text>
        </LoadPictureButton>
      </DownerControlView>
    </Contatiner>
  );
};

export default LoadImageScreen;

const Contatiner = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
`;

const UpperMainView = styled.View`
  height: 75%;
  width: 100%;
  background-color: white;
  padding-top: 20px;
`;

const DownerControlView = styled.View`
  height: 25%;
  width: 100%;

  background-color: silver;
  padding-top: 30px;
  padding-bottom: 30px;

  display: flex;
  flex-direction: row;
`;

const NewPictureButton = styled.Pressable``;
const LoadPictureButton = styled.Pressable``;
