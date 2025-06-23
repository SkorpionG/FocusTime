import React, { useState } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { colors } from "./src/utils/colors";
import { Focus } from "./src/features/Focus";
import { Timer } from "./src/features/Timer";
import { FocusHistory } from "./src/features/FocusHistory";

const debugModeTimer = false;
const debugModeMain = false;

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(
    debugModeTimer ? "Debug" : null
  );
  const [history, setHistory] = useState(debugModeMain ? ["Debug"] : []);

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory((prevHistory) => [...prevHistory, subject]);
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // paddingTop: Platform.OS === "ios"? 50 : 100,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.bgBlue,
  },
});
