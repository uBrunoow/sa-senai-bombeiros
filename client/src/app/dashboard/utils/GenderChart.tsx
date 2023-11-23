import React from 'react'
import ReactApexChart from 'react-apexcharts'

const GenderChart = ({ users }) => {
  // Filtra os usuários masculinos e femininos
  const maleUsers = users.filter((user) => user.gender === 'Male')
  const femaleUsers = users.filter((user) => user.gender === 'Female')

  // Configuração do gráfico
  const options = {
    labels: ['Masculino', 'Feminino'],
    colors: ['#2196F3', '#FF4081'],
  }

  const series = [maleUsers.length, femaleUsers.length]

  return (
    <ReactApexChart options={options} series={series} type="pie" width={370} />
  )
}

export default GenderChart
