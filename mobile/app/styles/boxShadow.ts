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
    // width: '90%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // borderRadius: 8,
    // padding: 16,
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
