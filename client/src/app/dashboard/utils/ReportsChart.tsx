// ReportsChart.js
import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

type UserType = {
  Reports: {
    createdAt: string
  }[]
}

type ReportsChartProps = {
  users: UserType[]
}

const ReportsChart: React.FC<ReportsChartProps> = ({ users }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'reports-chart',
    },
    xaxis: {
      categories: [] as string[],
    },
    yaxis: {
      title: {
        text: 'Número de Relatórios',
      },
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      size: 5,
    },
    title: {
      text: 'Relatórios criados ao longo do tempo',
    },
    colors: ['#ff3333'],
  })

  const [series, setSeries] = useState([
    {
      name: 'Relatórios Criados',
      data: [] as number[],
    },
  ])

  useEffect(() => {
    // Calcula o número total de relatórios por data
    const reportsByDate: { [date: string]: number } = {}

    users.forEach((user) => {
      user.Reports.forEach((report) => {
        const createdAt = new Date(report.createdAt).toLocaleDateString()
        reportsByDate[createdAt] = (reportsByDate[createdAt] || 0) + 1
      })
    })

    // Converte os dados para o formato necessário para o gráfico
    const chartData = Object.entries(reportsByDate).map(([date, count]) => ({
      x: date,
      y: count,
    }))

    // Ordena os dados por data
    chartData.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime())

    setChartOptions((options) => ({
      ...options,
      xaxis: {
        categories: chartData.map((data) => data.x),
      },
    }))

    setSeries([
      {
        name: 'Relatórios Criados',
        data: chartData.map((data) => data.y),
      },
    ])
  }, [users])

  return (
    <ReactApexChart
      options={chartOptions}
      series={series}
      type="bar"
      width={700}
    />
  )
}

export default ReportsChart
