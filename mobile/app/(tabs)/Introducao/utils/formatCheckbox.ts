export const formatCheckbox = (text: string): string => {
  const words = text.split('_')

  const formattedText = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return formattedText
}
