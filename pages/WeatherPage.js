import React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import bgImage from "../assets/NO8hx.png";
import SelectDropdown from "react-native-select-dropdown";
import cities from "../data/data";
//
const WeatherPage = () => {
  const [city, setCity] = useState("Adana");
  const [imageUrl, setImageUrl] = useState();
  const [temp, setTemp] = useState("");
  const [aircondition, setAircondition] = useState("");

  const key = "6550e897ad5b412990472640230509";
  const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`;

  const loadData = async () => {
    try {
      await axios.get(url).then(function (response) {
        const imageUrl = `http:${response.data.current.condition.icon}`;
        setImageUrl(imageUrl);
        setTemp(response.data.current.temp_c);
        setAircondition(response.data.current.condition.text);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [city]);

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.bgImage}>
      <View style={styles.container}>
        <SelectDropdown
          data={cities}
          onSelect={(selectedItem, index) => {
            setCity(selectedItem);
          }}
        />
        <View style={styles.card}>
          <Text style={styles.city}>{city} Weather Condition</Text>
          <View style={styles.weatherLine}>
            <Image source={{ uri: imageUrl }} style={styles.imgStyle} />
            <Text style={styles.temp}>{temp}°C</Text>
            <Text style={styles.aircondition}>{aircondition}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default WeatherPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imgStyle: {
    width: 200,
    height: 200,
  },
  city: {
    fontSize: 24,
  },
  temp: {
    fontSize: 38,
  },
  bgImage: {
    flex: 1,
  },
  aircondition: {
    fontSize: 34,
    textAlign: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
  },
  weatherLine: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    flexWrap: "wrap",
  },
});
