import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/colors.js";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton.js";
import { spacing } from "../utils/sizes.js";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What do you want to focus on?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSubject}
          value={subject}
          label="What would you like to focus on?"
        />
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  titleContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  title: {
    color: colors.white,
    fontSize: spacing.lg,
  },
  button: {
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    // borderColor: '#ff0000',
    // borderWidth: '1px'
  },
});
