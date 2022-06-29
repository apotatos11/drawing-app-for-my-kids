import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world! Hello Wonil!</Text>
      <Text>연결 성공했다!</Text>
      <Text>진짜 신기하다! 와우!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
