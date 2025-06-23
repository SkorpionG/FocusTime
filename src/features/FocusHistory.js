import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

function formatMinutes(minutes) {
  // Calculate total seconds
  const totalSeconds = Math.round(minutes * 60);

  // Calculate minutes and seconds
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  // For times less than 1 minute
  if (minutes < 1) {
    return `${secs} ${secs === 1 ? "second" : "seconds"}`;
  }
  // For times of 1 minute or more
  else {
    // Handle plural form of "minute"
    const minuteText = `${mins} ${mins === 1 ? "minute" : "minutes"}`;

    // If it's a full minute (no seconds), just return minutes
    if (secs === 0) {
      return minuteText;
    }
    // Otherwise include seconds
    else {
      return `${minuteText} and ${secs} ${secs === 1 ? "second" : "seconds"}`;
    }
  }
}

export const FocusHistory = ({ history }) => {
  const renderItem = ({ item }) => {
    return (
      <Text style={styles.item}>
        - {item.focusSubject} for {formatMinutes(item.duration)}
      </Text>
    );
  };

  if (!history || !history.length) {
    return (
      <Text style={styles.title}>
        Start focusing on a task, and your focus History will be shown here...
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, fontWeight: "bold" }}>
        Your focus history
      </Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    textAlign: "center",
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: "center",
  },
});
