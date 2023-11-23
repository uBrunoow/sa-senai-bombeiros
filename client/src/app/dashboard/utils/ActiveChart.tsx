import React from 'react'
import ReactApexChart from 'react-apexcharts'

const ActiveChart = ({ users }) => {
  // Filtra os usuários masculinos e femininos
  const activeUsers = users.filter((user) => user.isActive === true)
  const inactiveUsers = users.filter((user) => user.isActive === false)

  // Configuração do gráfico
  const options = {
    labels: ['Ativo', 'Inativo'],
    colors: ['#f39f21', '#ff5640'],
  }

  const series = [activeUsers.length, inactiveUsers.length]

  return (
    <ReactApexChart options={options} series={series} type="pie" width={350} />
  )
}

export default ActiveChart
