import React, { useState } from "react";
import { Text, TextInput, View, ScrollView, TouchableOpacity } from "react-native";

export default function App() {
  const [output, setOutput] = useState("Welcome to Hamid Pulse 🚀\nType 'help' to begin...");
  const [input, setInput] = useState("");

  const commands = {
    help: "Available commands:\n- help\n- run\n- clear\n- exit\n- about\n- scan\n- video <url>\n- exit video",
    run: "System activated... ✅",
    clear: "Screen cleared.",
    exit: "Goodbye 👋",
    about: "Hamid Pulse v1.0\nFuturistic hacker-style console.",
    scan: "Scanning network...\nOpen ports: 22, 80, 443\nLocal IP: 192.168.1.10",
  };

  const handleCommand = () => {
    let cmd = input.trim().toLowerCase();
    if (cmd.startsWith("video ")) {
      setOutput("📹 Playing CCTV feed from: " + cmd.slice(6));
    } else if (cmd === "exit video") {
      setOutput("CCTV feed closed ❌");
    } else if (commands[cmd]) {
      setOutput(commands[cmd]);
    } else {
      setOutput("❌ Error: Unknown command '" + input + "'");
    }
    setInput("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 20 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ color: "lime", fontFamily: "monospace" }}>{output}</Text>
      </ScrollView>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          style={{
            flex: 1,
            borderColor: "lime",
            borderWidth: 1,
            color: "lime",
            fontFamily: "monospace",
            padding: 10,
          }}
          value={input}
          onChangeText={setInput}
          placeholder="Type a command..."
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          onPress={handleCommand}
          style={{ backgroundColor: "lime", padding: 15, marginLeft: 10 }}
        >
          <Text style={{ color: "black", fontWeight: "bold" }}>Run</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
      }
      
