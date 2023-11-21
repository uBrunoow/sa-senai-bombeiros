export const getRandomColor = () => {
  // Gera três valores de cor aleatórios entre 0 e 255
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)

  // Converte os valores de cor para formato hexadecimal
  const redHex = red.toString(16).padStart(2, '0')
  const greenHex = green.toString(16).padStart(2, '0')
  const blueHex = blue.toString(16).padStart(2, '0')

  // Retorna a cor hexadecimal
  return `#${redHex}${greenHex}${blueHex}`
}
