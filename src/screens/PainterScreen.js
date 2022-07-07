import { useEffect, useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components/native";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Alert,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import ColorButtonItem from "../components/buttons/ColorButton";
import { colorList } from "../constants/painterOptions";

const PainterScreen = ({ route, navigation }) => {
  const [currentModal, setCurrentModal] = useState();
  const [currentPenType, setCurrentPenType] = useState("grease-pencil");
  const [currentPenColor, setCurrentPenColor] = useState("black");
  const ref = useRef(null);
  const MAX_CANVAS_WIDTH = 1051;
  const MAX_CANVAS_HEIGHT = 759;

  console.log("route.params", route.params);

  const filePath = route.params ? route.params.item.filePath : null;
  console.log(filePath);

  useEffect(() => {
    if (ref.current) {
      console.log("Inside");
      const ctx = ref.current.getContext("2d");
      const canvas = ref.current;
      canvas.width = 1051;
      canvas.height = 759;

      if (filePath) {
        console.log("filePath exist", filePath);
        let img = new CanvasImage(canvas);
        img.src = `${filePath}`;

        img.addEventListener("load", () => {
          const widthRatio = img.width / MAX_CANVAS_WIDTH;
          const heightRatio = img.height / MAX_CANVAS_HEIGHT;

          const width =
            widthRatio > heightRatio
              ? MAX_CANVAS_WIDTH
              : (img.width * MAX_CANVAS_HEIGHT) / img.height;

          const height =
            widthRatio > heightRatio
              ? (img.height * MAX_CANVAS_WIDTH) / img.width
              : MAX_CANVAS_HEIGHT;

          const offsetX = Math.floor((MAX_CANVAS_WIDTH - width) / 2);
          const offsetY = Math.floor((MAX_CANVAS_HEIGHT - height) / 2);

          ctx.drawImage(img, offsetX, offsetY, width, height);
        });
      }
    }
  }, [ref]);

  return (
    <Contatiner>
      <LeftMainView>
        <CanvasView>
          <Canvas ref={ref} style={styles.canvas} />
        </CanvasView>
      </LeftMainView>
      <RightControlView>
        <ButtonsView>
          <NewPictureButton onPress={() => Alert.alert("파일 저장")}>
            <MaterialIcons name="save" size={80} color="black" />
          </NewPictureButton>
          <LoadPictureButton
            onPress={() => Alert.alert("카메라 이미지로 저장")}
          >
            <MaterialCommunityIcons name="camera" size={80} color="black" />
          </LoadPictureButton>
          <PenPickerButton
            onPress={() => {
              !currentModal
                ? setCurrentModal("penModal")
                : setCurrentModal(null);
            }}
          >
            <MaterialCommunityIcons
              name={currentPenType}
              size={80}
              color="black"
            />
          </PenPickerButton>
          <ColorPickerButton
            onPress={() => {
              !currentModal
                ? setCurrentModal("colorModal")
                : setCurrentModal(null);
            }}
          >
            <MaterialIcons name="color-lens" size={80} color="black" />
            <CurrentColorPreview
              style={{
                backgroundColor: currentPenColor,
                overflow: "hidden",
              }}
            ></CurrentColorPreview>
          </ColorPickerButton>
          <EraserPickerButton onPress={() => Alert.alert("지우개")}>
            <MaterialCommunityIcons name="eraser" size={80} color="black" />
          </EraserPickerButton>
          <UndoButton onPress={() => Alert.alert("언두")}>
            <MaterialCommunityIcons
              name="undo-variant"
              size={80}
              color="black"
            />
          </UndoButton>
          <DeleteButton onPress={() => Alert.alert("휴지통")}>
            <MaterialCommunityIcons
              name="delete-empty"
              size={80}
              color="black"
            />
          </DeleteButton>
        </ButtonsView>
        <PenModal
          animationType="fade"
          transparent={true}
          visible={currentModal === "penModal"}
          onRequestClose={() => {
            setCurrentModal(null);
          }}
        >
          <View style={styles.penCenteredView}>
            <View style={styles.penModalView}>
              <PenModalView>
                <PenModalTextBox
                  onPress={() => {
                    setCurrentModal(null);
                    setCurrentPenType("lead-pencil");
                  }}
                >
                  <MaterialCommunityIcons
                    name="lead-pencil"
                    size={80}
                    color="black"
                  />
                </PenModalTextBox>
                <PenModalTextBox
                  onPress={() => {
                    setCurrentModal(null);
                    setCurrentPenType("grease-pencil");
                  }}
                >
                  <MaterialCommunityIcons
                    name="grease-pencil"
                    size={80}
                    color="black"
                  />
                </PenModalTextBox>
                <PenModalTextBox
                  onPress={() => {
                    setCurrentModal(null);
                    setCurrentPenType("brush");
                  }}
                >
                  <MaterialCommunityIcons
                    name="brush"
                    size={80}
                    color="black"
                  />
                </PenModalTextBox>
                <PenModalTextBox
                  onPress={() => {
                    setCurrentModal(null);
                    setCurrentPenType("format-paint");
                  }}
                >
                  <MaterialCommunityIcons
                    name="format-paint"
                    size={80}
                    color="black"
                  />
                </PenModalTextBox>
                <PenModalTextBox
                  onPress={() => {
                    setCurrentModal(null);
                    setCurrentPenType("spray");
                  }}
                >
                  <MaterialCommunityIcons
                    name="spray"
                    size={80}
                    color="black"
                  />
                </PenModalTextBox>
              </PenModalView>
              <ModalCloseButton onPress={() => setCurrentModal(null)}>
                <Feather name="x-circle" size={24} color="black" />
              </ModalCloseButton>
            </View>
          </View>
        </PenModal>
        <ColorModal
          animationType="fade"
          transparent={true}
          visible={currentModal === "colorModal"}
          onRequestClose={() => {
            setCurrentModal(null);
          }}
        >
          <View style={styles.colorCenteredView}>
            <View style={styles.colorModalView}>
              <FlatList
                data={colorList}
                renderItem={({ item }) => (
                  <ColorButtonItem
                    color={item}
                    PressHandler={(color) => {
                      setCurrentPenColor(color);
                      setCurrentModal(null);
                    }}
                  />
                )}
                keyExtractor={(item, index) => item + index}
                numColumns={7}
                style={{ width: 400, height: 400 }}
              />
              <ModalCloseButton onPress={() => setCurrentModal(null)}>
                <Feather name="x-circle" size={24} color="black" />
              </ModalCloseButton>
            </View>
          </View>
        </ColorModal>
      </RightControlView>
    </Contatiner>
  );
};

export default PainterScreen;

const styles = StyleSheet.create({
  canvas: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  penCenteredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 150,
  },
  colorCenteredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 150,
  },
  penModalView: {
    width: "12%",
    height: "70%",
    backgroundColor: "silver",
    borderRadius: 20,
    paddingTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  colorModalView: {
    width: 287,
    height: 769,
    paddingLeft: 12,
    backgroundColor: "silver",
    borderRadius: 20,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

const Contatiner = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: row;
`;

const LeftMainView = styled.View`
  width: 88%;
  height: 100%;
  display: flex;
  background-color: white;
`;

const CanvasView = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
`;

const RightControlView = styled.View`
  width: 12%;
  background-color: silver;
  padding-top: 25px;
  padding-bottom: 30px;

  display: flex;
  align-items: center;
`;

const ButtonsView = styled.View`
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NewPictureButton = styled.Pressable``;
const LoadPictureButton = styled.Pressable``;

const PenPickerButton = styled.Pressable``;
const ColorPickerButton = styled.Pressable``;
const EraserPickerButton = styled.Pressable``;

const UndoButton = styled.Pressable``;
const DeleteButton = styled.Pressable``;

const PenModal = styled.Modal``;
const ColorModal = styled.Modal``;

const PenModalView = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PenModalTextBox = styled.Pressable`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PenModalText = styled.Text``;
const ColorModalText = styled.Text``;

const ModalCloseButton = styled(Pressable)`
  align-self: flex-end;
  position: absolute;
  border-radius: 20px;
  padding: 10px;
`;

const CurrentColorPreview = styled.Text`
  position: absolute;
  right: 1px;
  bottom: -1px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid white;
`;
