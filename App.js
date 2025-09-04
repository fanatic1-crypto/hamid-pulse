import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const runCommand = () => {
    let response = "";
    if (command === "help") {
      response = "Available commands: help, clear, run, exit, video <url>, exit video, self-destruct";
    } else if (command === "run") {
      response = "System activated... Running Hamid Pulse environment.";
    } else if (command === "clear") {
      setOutput([]);
      setCommand("");
      return;
    } else if (command.startsWith("video ")) {
      const url = command.split(" ")[1];
      setVideoUrl(url);
      response = "Streaming video: " + url;
    } else if (command === "exit video") {
      setVideoUrl(null);
      response = "Video closed.";
    } else if (command === "self-destruct") {
      response = "⚠️ Self-destruct initiated! App will close in 60 seconds...";
      setTimeout(() => {
        setOutput([]);
        setCommand("");
      }, 60000);
    } else if (command === "exit") {
      response = "Exiting Hamid Pulse...";
    } else {
      response = "❌ Unknown command. Type 'help'";
    }

    setOutput([...output, `> ${command}`, response]);
    setCommand("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HAMID PULSE</Text>
      <ScrollView style={styles.terminal}>
        {output.map((line, index) => (
          <Text key={index} style={styles.text}>{line}</Text>
        ))}
      </ScrollView>

      {videoUrl && (
        <View style={{ height: 200, marginVertical: 10 }}>
          <WebView source={{ uri: videoUrl }} />
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={command}
          onChangeText={setCommand}
          placeholder="Type a command..."
          placeholderTextColor="#00ff00"
          onSubmitEditing={runCommand}
        />
        <TouchableOpacity onPress={runCommand} style={styles.button}>
          <Text style={{ color: "black" }}>Run</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black", padding: 10, paddingTop: 40 },
  title: { color: "#00ff00", fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  terminal: { flex: 1, marginBottom: 10 },
  text: { color: "#00ff00", marginVertical: 2, fontFamily: "monospace" },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#00ff00", color: "#00ff00", padding: 8, borderRadius: 5 },
  button: { backgroundColor: "#00ff00", padding: 10, marginLeft: 5, borderRadius: 5 }
});
               
