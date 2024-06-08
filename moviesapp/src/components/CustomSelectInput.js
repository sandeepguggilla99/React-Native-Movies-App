import React from "react";
import { View, StyleSheet } from "react-native";
import { SelectList } from "react-native-select-bottom-list";

const CustomSelectInput = (props) => {
  const { data, value, placeHolder, onSelect, style } = props;

  /**
   * Renders a SelectList component within a View container with specified styles.
   * @param {string} placeHolder - The placeholder text for the SelectList component.
   * @param {object} style - Additional styles to be applied to the container.
   * @param {function} onSelect - The function to be called when an item is selected.
   * @param {any} value - The current selected value of the SelectList.
   * @param {array} data - The array of data to populate the SelectList. Defaults to an empty array.
   * @returns {JSX.Element} A View component containing a SelectList component.
   */
  return (
    <View style={[styles.container, style]}>
      <SelectList
        placeHolder={placeHolder ?? "Select"}
        style={styles.selectList}
        onSelect={onSelect}
        value={value}
        data={data ?? []}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "white",
  },
  selectList: {
    backgroundColor: "white",
  },
});

export default CustomSelectInput;
