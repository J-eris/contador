import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Header from './src/components/Header';
import Timer from './src/components/Timer';

const colors = ["#A2D9CE", "#FD8368", "#D7BDE2"]

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(30 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "BREAK" | "SHORT");
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time == 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time])
  

  function handleStartStop() {
    setIsActive(!isActive);
  }

  return (
    <View style={[styles.container, {backgroundColor: colors[currentTime]}]}>
      <Text style={styles.text} >Cronómetro</Text>
      <Header 
      currentTime={currentTime} 
      setCurrentTime={setCurrentTime} 
      setTime={setTime} />
      <Timer time={time} />
      <TouchableOpacity onPress={handleStartStop} style={styles.button} >
        <Text style={{color: "white", fontWeight: "bold"}} >{isActive ? "STOP" : "START" }</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 32, 
    fontWeight: "bold",
    paddingTop: 30,
  }, 
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
});
