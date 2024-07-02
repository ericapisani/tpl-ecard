import { StatusBar } from 'expo-status-bar';
import { Button, View, TextInput, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useReducer } from 'react'
import Barcode from './Barcode'

export const ACTIONS = {
  SAVE: 'SAVE',
  DELETE: 'DELETE',
};

export function dataReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SAVE:
      return { ...state, libraryCardNumber: action.payload };
    case ACTIONS.DELETE:
      return { ...state, libraryCardNumber: null };
    default:
      return state;
  }
}

export default function App() {
  const [changedNumber, onChangeNumber] = useState(null);
  const [state, dispatch] = useReducer(dataReducer, { libraryCardNumber: null });

  const { libraryCardNumber } = state;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('library-card-number');
      if (value !== null) {
        // value previously stored
        dispatch({ type: ACTIONS.SAVE, payload: value })
      }
    } catch (e) {
      // error reading value
      console.log('There was an issue reading the value:', e)
    }
  };

  const saveData = async (value) => {
    try {
      await AsyncStorage.setItem('library-card-number', value);
      dispatch({ type: ACTIONS.SAVE, payload: value })
    } catch (e) {
      // saving error
      console.log('There was an issue saving the value:', e)
    }
  };

  const deleteData = async (value) => {
    try {
      await AsyncStorage.removeItem('library-card-number', value);
      dispatch({ type: ACTIONS.DELETE })
    } catch (e) {
      // saving error
      console.log('There was an issue deleting the value:', e)
    }
  }

  return (
    <View style={styles.container}>
      {libraryCardNumber && (
        <View>
          <Barcode
            value={libraryCardNumber}
            options={{ format: 'codabar' }}
          />
          <Button
            onPress={() => { deleteData() }}
            title="Delete saved library card number"
            accessibilityLabel="Delete library card number"
            color="red"
          />
        </View>
      )
      }
      {!libraryCardNumber && (
        <View>
          <Text>Enter your library card number below:</Text>
          <TextInput
            onChangeText={onChangeNumber}
            value={changedNumber}
            keyboardType="numeric"
            multiline={true}
            style={styles.libraryCardNumberInput}
          />
          <Button
            onPress={() => { saveData(changedNumber) }}
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
    // Numbers use 'pixel' as the metric
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  }
});
