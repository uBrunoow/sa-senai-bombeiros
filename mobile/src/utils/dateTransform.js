export default function formatarData(dataNoFormatoBR) {
  // Divide a string da data em dia, mês e ano
  const partesData = dataNoFormatoBR.split('/')
  const dia = partesData[0]
  const mes = partesData[1]
  const ano = partesData[2]

  // Crie uma nova string no formato "YYYY-MM-DD"
  const dataNoFormatoISO = `${ano}-${mes}-${dia}`

  return dataNoFormatoISO
}

const dataNoFormatoBR = '23/02/2023'
const dataNoFormatoISO = formatarData(dataNoFormatoBR)

console.log(dataNoFormatoISO) // Saída: "2023-02-23"
