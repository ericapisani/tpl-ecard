import { StatusBar } from 'expo-status-bar';
import { Button, View, TextInput, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react'

export default function App() {
  const [changedNumber, onChangeNumber] = useState(null);
  const [libraryCardNumber, setLibraryCardNumber] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('library-card-number');
      if (value !== null) {
        // value previously stored
        console.log('Here is the value: ', value)
        setLibraryCardNumber(value)
      }
    } catch (e) {
      // error reading value
      console.log('There was an issue reading the value:', e)
    }
  };

  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem('library-card-number', value);
      setLibraryCardNumber(value);
    } catch (e) {
      // saving error
      console.log('There was an issue saving the value:', e)
    }
  };

  const deleteData = async (value) => {
    try {
      await AsyncStorage.removeItem('library-card-number', value);
      setLibraryCardNumber(null);
    } catch (e) {
      // saving error
      console.log('There was an issue deleting the value:', e)
    }
  }

  return (
    <View style={styles.container}>
      {libraryCardNumber && (
        <View>
          <Text>
            Here is your library card number: {libraryCardNumber}
          </Text>
          <Button
            onPress={() => {deleteData()}}
            title="Delete saved library card number"
            accessibilityLabel="Delete library card number"
            style={styles.deleteButton}
          />
        </View>
      )
      }
      {!libraryCardNumber && (
        <View>
          <TextInput 
          onChangeText={onChangeNumber}
          value={changedNumber}
          placeholder="Enter your library card number here!"
          keyboardType="numeric"
          style={styles.libraryCardNumberInput}
        />
        <Button
          onPress={() => {saveData(changedNumber)}}
          title="Save library card number"
          accessibilityLabel="Save library card number"
          style={styles.saveButton}
        />
        </View>
      )}
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
