import React, { useState } from "react";
import { View, Text, StyleSheet, Vibration, Platform } from "react-native";
import { ProgressBar } from "react-native-paper";
import { Countdown } from "../components/Countdown";
import { RoundedButton } from "../components/RoundedButton";
import { useKeepAwake } from "expo-keep-awake";
import { spacing, fontSizes } from "../utils/sizes";
import { colors } from "../utils/colors";
import { Timing } from "./Timing";

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

const INITIAL_TIMER = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(INITIAL_TIMER);
  const [duration, setDuration] = useState(INITIAL_TIMER);

  const updateFocusTime = (minutes) => {
    setMinutes(minutes);
    setDuration(minutes);
  };

  const vibrate = () => {
    if (Platform.OS === "ios") {
      const interval = setInterval(() => Vibration.vibrate(PATTERN), 5000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(PATTERN);
    }
  };

  const resetTimer = () => {
    setMinutes(INITIAL_TIMER);
    setIsStarted(false);
    setProgress(1);
  };

  const onEnd = () => {
    vibrate();
    resetTimer();
    onTimerEnd({
      focusSubject,
      id: Date.now(),
      duration,
    });
    setDuration(INITIAL_TIMER);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.darkBlue}
          style={{ height: spacing.sm }}
        />
      </View>
      <Timing onChangeTime={updateFocusTime} />
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="-" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    marginTop: spacing.lg,
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.4,
    flexDirection: "row",
    padding: spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    color: colors.white,
    textAlign: "center",
    fontSize: fontSizes.md,
  },
  clearSubject: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: spacing.lg,
  },
});
