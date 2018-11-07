import {
  Platform,
  StyleSheet,
} from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#C9A',
    padding: 10,
    marginVertical: 24,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#CCC',
    padding: 10,
    marginVertical: 24,
    marginHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '400',
    paddingHorizontal: 12,
  },
  buttonTextSmall: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonSelected: {
    backgroundColor: '#F9A',
  },
})