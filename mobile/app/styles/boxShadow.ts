import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0,
    shadowRadius: 4,
    textShadowOffset: { width: 8, height: 2 },
  },

  button: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#F23030',
  },

  buttonOrange: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#FF6B00',
  },

  buttonYellow: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#FFC700',
  },

  buttonGreen: {
    height: 50,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#11D300',
  },

  modalContent: {
    elevation: 5, // for Android
  },
})
