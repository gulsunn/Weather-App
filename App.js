import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import WeatherPage from "./pages/WeatherPage";

export default function App() {
 
  return (
   <WeatherPage/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop:50
  },
})
