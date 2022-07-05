import { useState } from "react";
import { Text, Alert, StyleSheet, View, Image } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import { openImagePickerAsync } from "../utils/imagePickerHelper";

const ImageProcessingScreen = () => {
  const [originalImageUri, setOriginalImageUri] = useState(null);
  const [processedImageUri, setProcessedImageUri] = useState(null);
  const [currentModal, setCurrentModal] = useState(null);
  const [onInputUrlModal, setInputUrlModal] = useState(false);
  const [currentInputUrl, setInputUrl] = useState(null);

  const [sigma, setSigma] = useState(0);
  const [lowThreshold, setLowThreshold] = useState(0);
  const [highThreshold, setHighThreshold] = useState(0);

  const loadImagefromImagePicker = async () => {
    const imageUri = await openImagePickerAsync();

    setOriginalImageUri(imageUri);
  };

  return (
    <Contatiner>
      <UpperMainView>
        <OriginalImageView
          style={{ borderRightColor: "black", borderRightWidth: 1 }}
        >
          {originalImageUri ? (
            <Image
              source={{ uri: originalImageUri }}
              style={styles.thumbnail}
            />
          ) : (
            <ImageLoadButton onPress={() => setCurrentModal("imageLoadModal")}>
              <Text
                style={{
                  fontSize: 60,
                }}
              >
                📂
              </Text>
              <Text style={{ fontSize: 20 }}>이미지 불러오기</Text>
            </ImageLoadButton>
          )}
        </OriginalImageView>
        <ProcessedImageView>
          {processedImageUri ? (
            <Image
              source={{ uri: processedImageUri }}
              style={styles.thumbnail}
            />
          ) : (
            <Text style={{ fontSize: 20 }}>이미지가 없습니다.</Text>
          )}
        </ProcessedImageView>
      </UpperMainView>
      <DownerControlView>
        <SliderView>
          {originalImageUri && (
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
                <SliderStatus>
                  <SLiderLabel>Sigma :</SLiderLabel>
                  <SliderValue>{Math.floor(sigma * 10) / 10}</SliderValue>
                </SliderStatus>
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
                <SliderStatus>
                  <SLiderLabel>Low Threshold :</SLiderLabel>
                  <SliderValue>{lowThreshold}</SliderValue>
                </SliderStatus>
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
                <SliderStatus>
                  <SLiderLabel>High Threshold :</SLiderLabel>
                  <SliderValue>{highThreshold}</SliderValue>
                </SliderStatus>
              </SliderItem>
            </Sliders>
          )}
        </SliderView>
        <ButtonsView>
          <ControlButton
            style={styles.controlButton}
            onPress={() => setCurrentModal("imageLoadModal")}
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
      <ImageLoadModal
        animationType="slide"
        transparent={true}
        visible={currentModal === "imageLoadModal"}
        onRequestClose={() => {
          setCurrentModal(null);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalView>
              <ModalButtonView>
                <ModalButton
                  onPress={() => {
                    setOriginalImageUri(null);
                    setProcessedImageUri(null);
                    setCurrentModal(null);
                  }}
                >
                  <ModalButtonText>취소</ModalButtonText>
                </ModalButton>
                <ModalButton
                  onPress={() => {
                    setProcessedImageUri(originalImageUri);
                    setCurrentModal(null);
                  }}
                >
                  <ModalButtonText>저장</ModalButtonText>
                </ModalButton>
              </ModalButtonView>
              <ModalMainView>
                <ModalMainButton onPress={loadImagefromImagePicker}>
                  <ModalMainButtonText>사진첩에서 불러오기</ModalMainButtonText>
                </ModalMainButton>
                <ModalMainButton
                  onPress={() => {
                    setCurrentModal(null);
                    setInputUrlModal(!onInputUrlModal);
                  }}
                >
                  <ModalMainButtonText>URL 입력하기 </ModalMainButtonText>
                </ModalMainButton>
              </ModalMainView>
            </ModalView>
          </View>
        </View>
      </ImageLoadModal>
      <ImageUrlInputModal
        animationType="fade"
        transparent={true}
        visible={onInputUrlModal}
        onRequestClose={() => {
          setInputUrlModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalView>
              <ModalButtonView>
                <ModalButton
                  onPress={() => {
                    setInputUrlModal(!onInputUrlModal);
                    setInputUrl(null);
                  }}
                >
                  <ModalButtonText>취소</ModalButtonText>
                </ModalButton>
              </ModalButtonView>
              <ModalMainView>
                <Text
                  style={{
                    marginBottom: 20,
                    fontSize: 30,
                  }}
                >
                  URL 입력창
                </Text>
                <ImageUrlTextInput
                  placeholder="이미지 URL을 입력하세요"
                  value={currentInputUrl}
                  onChangeText={(URL) => setInputUrl(URL)}
                />
                <ImageUrlSaveButton
                  onPress={() => {
                    setOriginalImageUri(currentInputUrl);
                    setInputUrlModal(!onInputUrlModal);
                    setCurrentModal("imageLoadModal");
                  }}
                >
                  <ImageUrlSaveButtonText>저장</ImageUrlSaveButtonText>
                </ImageUrlSaveButton>
              </ModalMainView>
            </ModalView>
          </View>
        </View>
      </ImageUrlInputModal>
    </Contatiner>
  );
};

export default ImageProcessingScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 195,
    marginRight: 10,
  },
  modalView: {
    width: 580,
    height: 560,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
  },

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
  thumbnail: {
    width: 580,
    height: 580,
    resizeMode: "contain",
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
  justify-content: center;
`;

const SliderItem = styled.View`
  display: flex;
  align-items: center;
  margin: 0px 50px;
`;

const SliderStatus = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 200px;
  padding-left: 15px;
`;

const SLiderLabel = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-right: 5px;
`;

const SliderValue = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: blue;
  width: 30px;
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

const ImageLoadModal = styled.Modal``;

const ModalView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButtonView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 20%;
`;

const ModalButton = styled.Pressable`
  border-radius: 10px;
  width: 100px;
  height: 35px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButtonText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: blue;
`;

const ModalMainView = styled.View`
  width: 100%;
  height: 80%;
  padding: 10px;
`;

const ModalMainButton = styled.Pressable`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: silver;
`;

const ModalMainButtonText = styled.Text`
  font-size: 20px;
`;

const ImageUrlInputModal = styled.Modal``;

const ImageUrlTextInput = styled.TextInput`
  height: 40px;
  width: 200px;
  border: 1px solid black;
  padding-left: 5px;
  font-size: 20px;
  width: 100%;
  margin-bottom: 10px;
`;

const ImageUrlSaveButton = styled.Pressable`
  width: 100px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageUrlSaveButtonText = styled.Text`
  font-size: 20px;
`;
