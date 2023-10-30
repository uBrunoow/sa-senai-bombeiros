import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // Android
    textShadowOffset: { width: 8, height: 2 },
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '90%',
    marginBottom: 40,
  },

  TransporteButton: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderColor: 'transparent',
    borderWidth: 5,
  },

  TransporteButtonOrange: { backgroundColor: '#FF6B00' },
  TransporteButtonYellow: { backgroundColor: '#FFC700' },
  TransporteButtonGreen: { backgroundColor: '#11D300' },
  TransporteButtonRed: { backgroundColor: '#F23030' },

  modalContent: {
    elevation: 5, // for Android
  },
})
