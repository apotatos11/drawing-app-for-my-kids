import { Text } from "react-native";

const ProfileScreen = ({ route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default ProfileScreen;
