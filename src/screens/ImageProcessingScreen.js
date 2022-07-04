import { useEffect, useState } from "react";
import { Text, Alert, StyleSheet, Modal } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";

const ImageProcessingScreen = ({ route, navigation }) => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [currentModal, setCurrentModal] = useState("");

  const [sigma, setSigma] = useState(0);
  const [lowThreshold, setLowThreshold] = useState(0);
  const [highThreshold, setHighThreshold] = useState(0);

  return (
    <Contatiner>
      <UpperMainView>
        <OriginalImageView
          style={{ borderRightColor: "black", borderRightWidth: 1 }}
        >
          <ImageLoadButton onPress={() => Alert.alert("이미지 불러오기")}>
            <Text
              style={{
                fontSize: 60,
              }}
            >
              📂
            </Text>
            <Text style={{ fontSize: 20 }}>이미지 불러오기</Text>
          </ImageLoadButton>
        </OriginalImageView>
        <ProcessedImageView>
          <Text style={{ fontSize: 20 }}>이미지가 없습니다.</Text>
        </ProcessedImageView>
      </UpperMainView>
      <DownerControlView>
        <SliderView>
          {originalImage && (
            <Sliders>
              <SliderItem>
                <Slider
                  style={{ width: 200, height: 40 }}
                  step={0.1}
                  minimumValue={0}
                  maximumValue={2}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(sliderValue) => setSigma(sliderValue)}
                />
                <SLiderLabel>Sigma</SLiderLabel>
              </SliderItem>
              <SliderItem>
                <Slider
                  style={{ width: 200, height: 40 }}
                  step={1}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(sliderValue) => setLowThreshold(sliderValue)}
                />
                <SLiderLabel>Low Threshold</SLiderLabel>
              </SliderItem>
              <SliderItem>
                <Slider
                  style={{ width: 200, height: 40 }}
                  step={1}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(sliderValue) => setHighThreshold(sliderValue)}
                />
                <SLiderLabel>High Threshold</SLiderLabel>
              </SliderItem>
            </Sliders>
          )}
        </SliderView>
        <ButtonsView>
          <ControlButton
            style={styles.controlButton}
            onPress={() => Alert.alert("이미지 불러오기")}
          >
            <ButtonText>불러오기</ButtonText>
          </ControlButton>
          <ControlButton
            style={styles.controlButton}
            onPress={() => Alert.alert("채색제거 버튼")}
          >
            <ButtonText>채색제거</ButtonText>
          </ControlButton>
          <ControlButton
            style={styles.controlButton}
            onPress={() => Alert.alert("색상반전 버튼")}
          >
            <ButtonText>색상반전</ButtonText>
          </ControlButton>
          <ControlButton
            style={styles.controlButton}
            onPress={() => Alert.alert("그림저장 버튼")}
          >
            <ButtonText>저장</ButtonText>
          </ControlButton>
        </ButtonsView>
      </DownerControlView>
    </Contatiner>
  );
};

export default ImageProcessingScreen;

const styles = StyleSheet.create({
  controlButton: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

const Contatiner = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
`;

const UpperMainView = styled.View`
  height: 75%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: row;
`;

const OriginalImageView = styled.View`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageLoadButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
`;

const ProcessedImageView = styled.View`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DownerControlView = styled.View`
  height: 25%;
  width: 100%;

  background-color: silver;

  display: flex;
`;

const SliderView = styled.View`
  width: 100%;
  height: 35%;
  padding-top: 15px;
`;

const Sliders = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const SliderItem = styled.View`
  display: flex;
  align-items: center;
`;

const SLiderLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;

const ButtonsView = styled.View`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ControlButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid black;
  width: 180px;
  height: 60px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  font-size: 30px;
`;
