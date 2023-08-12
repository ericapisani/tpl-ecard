import { StatusBar } from 'expo-status-bar';
import { Button, View, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

export default function App() {
  const [number, onChangeNumber] = React.useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('library-card-number');
      if (value !== null) {
        // value previously stored
        console.log('Here is the value: ', value)
      }
    } catch (e) {
      // error reading value
      console.log('There was an issue reading the value:', e)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter your library card number here!"
        keyboardType="numeric"
        style={styles.libraryCardNumberInput}
      />
      <Button
        onPress={() => {}}
        title="Save library card number"
        accessibilityLabel="Save library card number"
        style={styles.saveButton}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  libraryCardNumberInput: {
    height: 80,
    width: "75%",
    borderWidth: 1,
    textAlign: "center"
  }
});
