import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

export default function Loading() {
  return (
    <LottieView
      source={require("../../assets/97930-loading.json")}
      style={styles.animation}
      autoPlay
      loop
    />
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 300,
    height: 300,
  },
});
