import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";

const timeOptions = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export const Timing = ({ onChangeTime }) => {
  function renderTimerOption({ item: time }) {
    console.log(time);
    return (
      <View style={styles.timingButton} key={time}>
        <RoundedButton
          size={75}
          title={`${time}`}
          onPress={() => onChangeTime(time)}
        />
      </View>
    );
  }

  return (
    <View style={styles.timingWrapper}>
      <FlatList
        data={timeOptions}
        renderItem={renderTimerOption}
        keyExtractor={(item) => item.toString()}
        horizontal={true}
        style={styles.scrollContainer}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          flexDirection: "row",
          gap: spacing.md,
        }}
        showsHorizontalScrollIndicator={true}
        initialNumToRender={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    overflow: "scroll",
  },
  timingWrapper: {
    flex: 0.15,
    width: "100%",
    padding: spacing.md,
    paddingBottom: spacing.sm,
    overflow: "scroll",
  },
});
