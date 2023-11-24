import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import { Asset } from 'expo-asset'
import findReports from '@src/api/reports/findReport'
import { IReport } from '@src/interfaces/IReport'
import { formatDate } from '@src/utils/formatDate'
import {
  getAberturaOcularGlasgowText,
  getRespostaMotoraGlasgowText,
  getRespostaVerbalGlasgowText,
} from '@src/utils/getGlasgowText'
import { getTransportationIcon } from '@src/utils/getTransportationIcon'
import { formatAnyValue } from '@src/utils/formatAnyValue'
import { verifyCinematicAvaliation } from '@src/utils/verifyCinematicAvaliation'
import { convertTrue } from '@src/utils/convertTrue'

interface DownloadedReport {
  msg: string
  report: IReport
}
const DownloadPdfModal = () => {
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const logoImage = Asset.fromModule(
    require('../../src/public/logo-pdf.png'),
  ).uri
  const logoMedicinaImage = Asset.fromModule(
    require('../../src/public/logo-medicina.png'),
  ).uri
  const Multiply = Asset.fromModule(
    require('../../src/public/Multiply.png'),
  ).uri
  const BodyImage = Asset.fromModule(
    require('../../src/public/body-image.png'),
  ).uri

  const [reportsForDownload, setReportsForDownload] =
    useState<DownloadedReport>({ report: {} })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchReportsForDownload = async () => {
      try {
        setLoading(true)
        const response = await findReports(reportId)

        setReportsForDownload(response)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    fetchReportsForDownload()
  }, [reportId])

  const calculateGlasgowTotal = () => {
    const glasgowData = reportsForDownload.report.Glasglow[0]

    const eyeOpening = glasgowData?.eyeOpeningOwnerId
    const verbalResponse = glasgowData?.verbalResponseOwnerId
    const motorResponse = glasgowData?.motorResponseOwnerId

    // Retorne a soma dos valores
    return eyeOpening + verbalResponse + motorResponse
  }

  console.log(JSON.stringify(reportsForDownload.report, null, 2))

  const generatePDF = async () => {
    const transportationIcon = getTransportationIcon(
      reportsForDownload.report.Finalization[0]?.transportation,
    )

    try {
      const htmlContent = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <style>
          body { 
            font-family: Arial, sans-serif;
            max-width: 1040px;
            width: 100%;
            margin: 0 auto;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust:exact !important;
          }
      
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
      
          .subtitle {
            font-size: 12px;
          }
          .title {
            font-size: 15px;
            margin-bottom: 5px;
          }
          .sub-subtitle {
            font-size: 12px;
            color: #707070;
            margin-top: -5px
          }
          .logo-img {
            width: 50px;
            height: 50px; 
          }
          .logo-img-medicina {
            width: 50px;
            height: 50px; 
          }
          .header {
            -moz-border-bottom: 1px solid rgba(0, 0, 0, 0.486);
            border-bottom: 1px solid rgba(0, 0, 0, 0.486);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: row;
            padding: 15px;
            margin-bottom: 10px;
          }
          .flex {
            display: flex;
            align-items: center;
            justify-content: start;
            flex-direction: row;
            gap: 15px;
          }
          .table-header {
            background: #000;
            color: #fff;
            width: 100%;
            padding: 5px 15px;
            font-weight: bold;
          }
          .table-subheader {
            background: #fff;
            color: #000;
            width: 100%;
            padding: 5px 15px;
            font-weight: bold;
            border-bottom: 1px solid black;
          }
          .table-header p {
            font-size: 12px;
          }
          .table {
            width: 100%;
            border: 1px solid black;
          }
          .infos-gerais {
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
            width: 100%;
            gap: 5px;
          }
          .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 1fr);
          }
          .infos-gerais p {
            color: var(--PRETO, #202020);
            font-size: 12px;
            font-style: normal;
            font-weight: 900;
            line-height: normal; 
          }
          .info-paciente h1 {
            color: var(--PRETO, #202020);
            font-size: 15px;
            font-style: normal;
            font-weight: 900;
            line-height: normal; 
          }
          .info-paciente p {
            color: var(--PRETO, #202020);
            font-size: 12px;
            font-style: normal;
            font-weight: 600;
            line-height: normal; 
          }
          .info-paciente span {
            color: var(--PRETO, #202020);
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal; 
          }
          main {
            padding: 10px;
          }
          .content-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
          }
          .content-info-anamneses {
            display: flex;
            padding: 17px;
            flex-direction: column;
            align-items: flex-start;
            gap: 37px;
            border-top: 1px solid var(--PRETO, #202020);
            background: var(--light-light-grey, #D9D9D9);
          }
          .logo-img-2 {
            width: 100px;
            height: 100px;
          }
          .reports {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--PRETO, #202020);
            background: var(--WHITE, #FFF); 
            padding: 5px;
          }
          .reports p {
            color: var(--PRETO, #202020);
            font-size: 12px;
            font-style: normal;
            font-weight: 900;
            line-height: normal;
            width: 100%;
          }
          .container {
            display: flex;
            align-items: start;
            justify-content: space-between;
            width: 100%;
            gap: 20px;
            margin-top: 20px;
          }
          .container  section {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
          }
          .height {
            height: 100%;
            align-items: start !important;
          }
          .suspectProblems {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .subtext {
            color: var(--PRETO, #202020);
            font-size: 12px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
          }
          .wrapper-subtext {
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: start;
          }
          .problems {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
          table, th, td {
            border:1px solid black;
            border-collapse: collapse;
          }
          th {
            background: var(--light-light-grey, #D9D9D9); 
            font-size: 12px;
            text-align: left;
            padding-left: 10px;
          }
          td {
            font-size: 14px;
          }
          .glasgow-table {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 5px;
          }
          .glasgow-value {
            border: 1px solid #000;
            background: var(--WHITE, #FFF); 
            padding: 5px 7px;
            font-weight: bold;
          }
          .table-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 20px;
          }
      
          .page {
            min-height:1000px;
          }
      
          .radioType {
            background-color: black;
            border-radius: 50%;
            height: 15px;
            width: 15px;
          }
          .noRadio {
            background-color: white;
            border-radius: 50%;
            height: 15px;
            width: 15px;
            border: 1px solid black;
          }
          .cinematic {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 5px;
          }
          .cinematic p {
            width: 70%;
          }
          .image-body {
            width: 138px;
            height: 310px;
          }
      
          .local-trauma {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
          }
      
          .queimaduras th{
            background: #000 !important;
            color: #fff;
            padding: 0;
          }
      
          .queimaduras td {
            width: 50px;
          }
      
          .infos-anamnese {
            display: flex;
            padding: 10px;
            align-items: center; 
            background: #fff;
            font-size: 12px;
          }
      
          .divider-anamnese {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            border-bottom: 1px dashed rgba(29, 29, 29, 0.664);
          }

          .finalRemarks-anamnese {
            width: 100%;
          }
          .finalRemarks-anamnese p {
            width: 100%;
            padding: 10 0px;
          }

          .finalRemarks-anamnese h5 {
            padding: 10 0px;
            border-bottom: 1px solid black;
            width: 100%;
          }

          .width {
            width: 100%;
          }
      
          @media print {
      
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
      
            th, td {
              border:1px solid black !important;
              border-collapse: collapse !important;
            }
      
            th {
              width: 38%;
            }
          }
        </style>
      </head>
      <body>
        <div class="page">
          <header class="header">
            <div class="flex">
            <img class="logo-img" src="${logoImage}" alt="Imagem" />
              <div>
                <h1 class="title">Bombeiros voluntários <span class="subtitle">Relatório de ocorrência</span></h1>
                <p class="sub-subtitle">Associação de Serviços Sociais Voluntários de Guaramirim</p>
              </div>
            </div>
            <img class="logo-img-medicina" src="${logoMedicinaImage}" alt="Medicina Imagem" />
          </header>
        
          <main>
            <div class="table"> 
              <div class="table-header">
                <p>Informações básicas</p>
              </div>
              <div class="content-info">
                <div class="info-paciente">
                  <h1>Dados do relatório</h1>
                  <p>Nome: <span>${formatAnyValue(
                    reportsForDownload.report.name,
                  )}</span></p>
                  <p>Idade: <span>${formatAnyValue(
                    reportsForDownload.report.age,
                  )}</span></p>
                  <p>Sexo: <span>${formatAnyValue(
                    reportsForDownload.report.gender,
                  )}</span></p>
                  <p>Data: <span>${formatAnyValue(
                    formatDate(reportsForDownload.report.reportDate),
                  )}</span></p>
                </div>
                <img class="logo-img-2" src="${logoImage}" alt="logo img grande">
              </div>
            </div>
            <div class="container">
              <section>
                <div class="table"> 
                  <div class="table-header">
                    <p>Tipo de ocorrência  (pré-hospitalar)</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                    ${reportsForDownload.report.PreHospitalMethods.map(
                      (method) =>
                        method.preHospitalarMethodDescription
                          .map(
                            (description, index) => `
                        <div class="reports" key="${method.id}-${index}">
                          <p>${formatAnyValue(description)}</p>
                        </div>
                      `,
                          )
                          .join(''),
                    ).join('')}
                    </div>
                  </div>
                </div>
        
                <div class="table"> 
                  <div class="table-header">
                    <p>Problemas Encontrados Suspeitos</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                    ${reportsForDownload.report.SuspectProblems.map(
                      (suspectProblems, index) =>
                        `
                        <div class="reports problems" key=${index}>
                    
                          ${
                            suspectProblems.problemaSuspeitoTransporte &&
                            suspectProblems.problemaSuspeitoTransporte.length >
                              0
                              ? `
                            <div class="suspectProblems">
                              <p>Transporte</p>
                              <i class='bx bx-check'></i>
                            </div>
                            <div class="wrapper-subtext">
                              ${suspectProblems.problemaSuspeitoTransporte
                                .map(
                                  (transporte, subIndex) => `
                                    <span class="subtext" key=${subIndex}>${formatAnyValue(
                                    transporte,
                                  )}</span>
                                  `,
                                )
                                .join('')}
                            </div>
                          `
                              : ''
                          }
                        </div>
                        
                        <div class="reports problems" key=${index}>
                    
                          ${
                            suspectProblems.problemaSuspeitoDiabetes &&
                            suspectProblems.problemaSuspeitoDiabetes.length > 0
                              ? `
                            <div class="suspectProblems">
                              <p>Diabetes</p>
                              <i class='bx bx-check'></i>
                            </div>
                            <div class="wrapper-subtext">
                              ${suspectProblems.problemaSuspeitoDiabetes
                                .map(
                                  (diabetes, subIndex) => `
                                    <span class="subtext" key=${subIndex}>${formatAnyValue(
                                    diabetes,
                                  )}</span>
                                  `,
                                )
                                .join('')}
                            </div>
                          `
                              : ''
                          }

                        </div>

                        <div class="reports problems" key=${index}>
                    
                          ${
                            suspectProblems.problemaSuspeitoObstetrico &&
                            suspectProblems.problemaSuspeitoObstetrico.length >
                              0
                              ? `
                            <div class="suspectProblems">
                              <p>Obstetrício</p>
                              <i class='bx bx-check'></i>
                            </div>
                            <div class="wrapper-subtext">
                              ${suspectProblems.problemaSuspeitoObstetrico
                                .map(
                                  (obstetrico, subIndex) => `
                                    <span class="subtext" key=${subIndex}>${formatAnyValue(
                                    obstetrico,
                                  )}</span>
                                  `,
                                )
                                .join('')}
                            </div>
                          `
                              : ''
                          }

                        </div>

                        <div class="reports problems" key=${index}>
                    
                          ${
                            suspectProblems.problemaSuspeitoRespiratorio &&
                            suspectProblems.problemaSuspeitoRespiratorio
                              .length > 0
                              ? `
                            <div class="suspectProblems">
                              <p>Respiratório</p>
                              <i class='bx bx-check'></i>
                            </div>
                            <div class="wrapper-subtext">
                              ${suspectProblems.problemaSuspeitoRespiratorio
                                .map(
                                  (respiratorio, subIndex) => `
                                    <span class="subtext" key=${subIndex}>${formatAnyValue(
                                    respiratorio,
                                  )}</span>
                                  `,
                                )
                                .join('')}
                            </div>
                          `
                              : ''
                          }
                        
                        </div>

                        <div class="reports problems" key=${index}>
                    
                          ${
                            suspectProblems.problemaSuspeitoPsiquiatrico
                              ? `
                            <div class="suspectProblems">
                              <p>Psiquiátrico</p>
                              <i class='bx bx-check'></i>
                            </div>
                          `
                              : ''
                          }

                        </div> 

                        <div class="reports problems" key=${index}>

                          ${
                            suspectProblems.Another !== ''
                              ? `
                          <div class="suspectProblems">
                            <p>Outro</p>
                            <i class='bx bx-check'></i>
                            <div class="wrapper-subtext">
                              <span class="subtext" >${formatAnyValue(
                                suspectProblems.Another,
                              )}</span>
                            </div>
                          </div>
                          `
                              : ''
                          }
                        </div>
                      `,
                    ).join('')}
                    </div>
                  </div>
                </div>
        
                <div class="table"> 
                  <div class="table-header">
                    <p>Sinais e Sintomas</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                    ${reportsForDownload.report.Symptoms.map((symptom) =>
                      symptom.symptomsDescription
                        .map(
                          (description, index) => `
                        <div class="reports suspectProblems" key="${
                          symptom.id
                        }-${index}">
                          <p>${formatAnyValue(description)}</p>
                        </div>
                      `,
                        )
                        .join(''),
                    ).join('')}
                    </div>
                  </div>
                </div>
        
                <div class="table"> 
                  <div class="table-header">
                    <p>Avaliação do paciente (Glasgow)  </p>
                  </div>
                  <div class="content-info height" style="padding: 0;">
                    <div class="infos-gerais">
                      <table style="width:100%">
                        <tr>
                          <th>Abertura Ocular</th>
                          <td>
                            <div class="glasgow-table">
                              ${formatAnyValue(
                                getAberturaOcularGlasgowText(
                                  reportsForDownload.report.Glasglow[0]
                                    ?.eyeOpeningOwnerId,
                                ),
                              )}
                              <div class="glasgow-value">
                                ${formatAnyValue(
                                  reportsForDownload.report.Glasglow[0]
                                    ?.eyeOpeningOwnerId,
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>Resposta Verbal</th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              getRespostaVerbalGlasgowText(
                                reportsForDownload.report.Glasglow[0]
                                  ?.verbalResponseOwnerId,
                              ),
                            )}
                            <div class="glasgow-value">
                              ${formatAnyValue(
                                reportsForDownload.report.Glasglow[0]
                                  ?.verbalResponseOwnerId,
                              )}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>Resposta Motora</th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              getRespostaMotoraGlasgowText(
                                reportsForDownload.report.Glasglow[0]
                                  ?.motorResponseOwnerId,
                              ),
                            )}
                            <div class="glasgow-value">
                              ${formatAnyValue(
                                reportsForDownload.report.Glasglow[0]
                                  ?.motorResponseOwnerId,
                              )}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <div>
                              Total 
                              <span>gcs(3-15)</span>
                            </div>
                          </th>
                          <td>
                            <div class="glasgow-table">
                              ----------------------
                              <div class="glasgow-value">
                                ${formatAnyValue(calculateGlasgowTotal())}
                              </div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
        
                <div class="table-wrapper">
                  <div class="table"> 
                    <div class="table-header">
                      <p>Vítima Era</p>
                    </div>
                    <div class="content-info height">
                      <div class="infos-gerais">
                        <p>Pedestre</p>
                      </div>
                    </div>
                  </div>
                  <div class="table"> 
                    <div class="table-header">
                      <p>Forma de Condução</p>
                    </div>
                    <div class="content-info height">
                      <div class="infos-gerais">
                        <p>${formatAnyValue(
                          reportsForDownload.report.Finalization[0]
                            ?.conduction[0],
                        )}</p>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div class="table"> 
                  <div class="table-header">
                    <p>Decisão Transporte</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                      ${formatAnyValue(transportationIcon)}
                      <p>${formatAnyValue(
                        reportsForDownload.report.Finalization[0]
                          ?.transportation,
                      )}</p>
                    </div>
                  </div>
                </div>
        
              </section>
              <section>
                <div class="table"> 
                  <div class="table-header">
                    <p>Localização dos traumas</p>
                  </div>
                  <div class="content-info">
                    <div class="infos-gerais">
                      <div class="local-trauma">
                        <img class="image-body" src="${BodyImage}" alt="">
                        <img src="${Multiply}" alt="" style="width: 50px; height: 50px;">
                        <img class="image-body" src="${BodyImage}" alt="">
                      </div>
                      <div class="reports">
                        <p>Esviceração</p>
                      </div>
                      <div class="reports">
                        <p>Esviceração</p>
                      </div>
                      <div class="reports">
                        <p>Esviceração</p>
                      </div>
                      <div class="reports">
                        <p>Esviceração</p>
                      </div>
                      <div class="reports">
                        <p>Esviceração</p>
                      </div>
                    </div>
                    
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Ferimento/ Fraturas/ Entorses/ Luxação/ Contusão  </p>
                  </div>
                  <div class="content-info height" style="padding: 0;">
                    <div class="infos-gerais">
                      <table style="width:100%">
                        <tr>
                          <th>Local</th>
                          <th>Lado</th>
                          <th>Face</th>
                          <th>Tipo</th>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                          <td>1</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="content-info height" style="padding: 0;">
                    <div class="infos-gerais">
                      <table style="width:100%">
                        <tr class="queimaduras">
                          <th style="width: 50px;">QUEIMD.</th>
                          <th>CABEÇA</th>
                          <th>PESCOÇO</th>
                          <th>T.ANT</th>
                          <th>T.POS</th>
                        </tr>
                        <tr  class="queimaduras">
                          <td>1° grau</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr  class="queimaduras">
                          <td>2° grau</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr  class="queimaduras">
                          <td>3° grau</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr  class="queimaduras">
                          <th>GENIT.</th>
                          <th>M.I.D</th>
                          <th>M.I.E</th>
                          <th>M.S.D</th>
                          <th>M.S.E</th>
                        </tr>
                        <tr  class="queimaduras">
                          <td>1° grau</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr  class="queimaduras">
                          <td>2° grau</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr  class="queimaduras">
                          <td>3° grau</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      
        <div class="page">
          <main>
            <div class="container">
              <section>
                <div class="table"> 
                  <div class="table-header">
                    <p>Sinais vitais</p>
                  </div>
                  <div class="content-info height" style="padding: 0;">
                    <div class="infos-gerais">
                      <table style="width:100%">
                        <tr>
                          <th>Pressão arterial</th>
                          <td>
                            <div class="glasgow-table">
                              ${formatAnyValue(
                                reportsForDownload.report
                                  ?.systolicBloodPressure,
                              )} 
                              X 
                              ${formatAnyValue(
                                reportsForDownload.report
                                  ?.diastolicBloodPressure,
                              )}
                              mmHg
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>Pulso</th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              reportsForDownload.report?.bodyPulse,
                            )} B.C.P.M
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>Saturação</th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              reportsForDownload.report?.saturation,
                            )}%
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            Temperatura
                          </th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              reportsForDownload.report?.bodyTemp,
                            )}°C
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            Perfusão
                          </th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              reportsForDownload.report?.perfusion,
                            )}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            Respiração
                          </th>
                          <td>
                            <div class="glasgow-table">
                            ${formatAnyValue(
                              reportsForDownload.report?.breathing,
                            )} M.R.M
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Procedimentos Efetuados</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                      <div class="reports suspectProblems">
                        <p>Aspiração</p>
                      </div>
                      <div class="reports problems ">
                        <p>Cânula de Guedel</p>
                      </div>
                      <div class="reports problems ">
                        <p>Avaliação Inicial</p>
                      </div>
                      <div class="reports problems ">
                        <p>Desobstrução de V.A</p>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Materiais Utilizados Deixado no Hospital</p>
                  </div>
                  <div class="content-info height" style="padding: 0;">
                    <div class="infos-gerais">
                      <table style="width:100%">
                        <tr>
                          <th>Material</th>
                          <th>Quant</th>
                          <th>Material</th>
                          <th>Quant</th>
                        </tr>
                        <tr>
                          <td>Ataduras (12)</td>
                          <td>1000x</td>
                          <td>Manta Aluminizada</td>
                          <td>1x</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Observações Importantes</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                      <div class="reports suspectProblems">
                        <p>${formatAnyValue(
                          reportsForDownload.report.Finalization[0]
                            ?.finalRemarks,
                        )}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <div class="table"> 
                  <div class="table-header">
                    <p>Objetos recolhidos</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                      <div class="reports suspectProblems">
                        <p>${formatAnyValue(
                          reportsForDownload.report.Finalization[0]
                            ?.CollectedObjects,
                        )}</p>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Procedimentos Efetuados</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais">
                      <div class="reports suspectProblems">
                        <p>Aspiração</p>
                      </div>
                      <div class="reports problems ">
                        <p>Cânula de Guedel</p>
                      </div>
                      <div class="reports problems ">
                        <p>Avaliação Inicial</p>
                      </div>
                      <div class="reports problems ">
                        <p>Desobstrução de V.A</p>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Materiais Utilizados Deixado no Hospital</p>
                  </div>
                  <div class="content-info height" style="padding: 0;">
                    <div class="infos-gerais">
                      <table style="width:100%">
                        <tr>
                          <th>Material</th>
                          <th>Quant</th>
                          <th>Material</th>
                          <th>Quant</th>
                        </tr>
                        <tr>
                          <td>Ataduras (12)</td>
                          <td>1000x</td>
                          <td>Manta Aluminizada</td>
                          <td>1x</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
      
                <div class="table"> 
                  <div class="table-header">
                    <p>Avaliação de cinemática</p>
                  </div>
                  <div class="content-info height">
                    <div class="infos-gerais grid">
                      <div class="reports cinematic">
                        ${verifyCinematicAvaliation(
                          reportsForDownload.report.CinematicAvaliation[0]
                            ?.twistedSteering,
                        )}
                        <p>Volante Torcido</p>
                      </div>
                      <div class="reports cinematic ">
                      ${verifyCinematicAvaliation(
                        reportsForDownload.report.CinematicAvaliation[0]
                          ?.foundWithHelmet,
                      )}
                        <p>Encontrado de Capacete</p>
                      </div>
                      <div class="reports cinematic ">
                      ${verifyCinematicAvaliation(
                        reportsForDownload.report.CinematicAvaliation[0]
                          ?.damagedPanel,
                      )}
                        <p>Para-brisas Avariado</p>
                      </div>
                      <div class="reports cinematic ">
                      ${verifyCinematicAvaliation(
                        reportsForDownload.report.CinematicAvaliation[0]
                          ?.foundWithSeatbelt,
                      )}
                        <p>Encontrado de Cinto</p>
                      </div>
                      <div class="reports cinematic ">
                      ${verifyCinematicAvaliation(
                        reportsForDownload.report.CinematicAvaliation[0]
                          ?.comportamentalDisturb,
                      )}
                        <p>Distúrbio de Comportamento</p>
                      </div>
                      <div class="reports cinematic ">
                      ${verifyCinematicAvaliation(
                        reportsForDownload.report.CinematicAvaliation[0]
                          ?.damagedWindshield,
                      )}
                        <p>Painel Avariado</p>
                      </div>
                      <div class="reports cinematic ">
                      ${verifyCinematicAvaliation(
                        reportsForDownload.report.CinematicAvaliation[0]
                          ?.walkingInTheScene,
                      )}
                        <p>Caminhando na Cena</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      
        <div class="page">
          <main>
            <div class="container">
              <section>
                <div class="table"> 
                  <div class="table-header">
                    <p>Anamnese de Emergência Médica</p>
                  </div>
                  <div class="table-subheader">
                    <p>O Que Aconteceu? (Sinais e Sintomas)</p>
                  </div>
                  <div class="content-info-anamneses height">
                    <div class="infos-anamnese width">
                    <div class="finalRemarks-anamnese">
                        <h5>Observações Finais</h5>
                        <p>
                          ${formatAnyValue(
                            reportsForDownload.report.Anamnesis[0]
                              ?.FinalRemarks,
                          )}
                        </p>
                        <h5>Sinais e sintomas</h5>
                        <p>
                          ${formatAnyValue(
                            reportsForDownload.report.Anamnesis[0]
                              ?.SignsAndSymptoms,
                          )}
                        </p>
                    </div>
                    </div>
                    <div class="divider-anamnese">
                      <div class="infos-anamnese">Já aconteceu outras vezes?</div>
                      <div class="infos-anamnese">
                        ${convertTrue(
                          reportsForDownload.report.Anamnesis[0]?.HappenedTimes,
                        )}
                      </div>
                    </div>
                    <div class="divider-anamnese">
                      <div class="infos-anamnese">A quanto tempo isso aconteceu?:</div>
                      <div class="infos-anamnese">
                        ${formatAnyValue(
                          reportsForDownload.report.Anamnesis[0]?.SinceHappened,
                        )}
                      </div>
                    </div>
                    <div class="divider-anamnese">
                      <div class="infos-anamnese">Possuí algum problema de saúde?</div>
                      <div class="infos-anamnese">
                          ${convertTrue(
                            reportsForDownload.report.Anamnesis[0]
                              ?.HealthProblem,
                          )}
                      </div>
                    </div>
                    <div class="divider-anamnese">
                      <div class="infos-anamnese">Faz uso de medicação?</div>
                      <div class="infos-anamnese">${convertTrue(
                        reportsForDownload.report.Anamnesis[0]?.Medication,
                      )} | ${
        reportsForDownload.report.Anamnesis[0]?.MedicationWhich
      }</div>
                      <div class="infos-anamnese">Última medicação</div>
                      <div class="infos-anamnese">
                      ${formatAnyValue(
                        reportsForDownload.report.Anamnesis[0]?.HourMedication,
                      )}
                      </div>
                    </div>
                    <div class="divider-anamnese">
                      <div class="infos-anamnese">Alguma alergia?:</div>
                      <div class="infos-anamnese">${formatAnyValue(
                        reportsForDownload.report.Anamnesis[0]?.Allergies,
                      )} | ${formatAnyValue(
        reportsForDownload.report.Anamnesis[0]?.AllergiesWhich,
      )}</div>
                      <div class="infos-anamnese">Ingeriu Algum Liquido?:</div>
                      <div class="infos-anamnese">${formatAnyValue(
                        reportsForDownload.report.Anamnesis[0]?.IngestedFood,
                      )} | ${formatAnyValue(
        reportsForDownload.report.Anamnesis[0]?.WhatTimeFood,
      )}</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </body>
      </html>
      `

      const { uri } = await Print.printToFileAsync({ html: htmlContent })
      return uri
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error)
      return null
    }
  }

  const handleDownloadPDF = async () => {
    const generatedPdfUri = await generatePDF()

    if (generatedPdfUri) {
      try {
        await Sharing.shareAsync(generatedPdfUri, {
          mimeType: 'application/pdf',
          dialogTitle: `Ocorrência n° ${reportId} PDF`,
        })
        console.log('Download concluído com sucesso!')
      } catch (error) {
        console.error('Erro ao realizar o download do PDF:', error)
      }
    }
  }

  return (
    <View className="w-[320px]">
      {loading ? (
        <View className="mx-auto h-[120px] w-[320px] items-center justify-center">
          <ActivityIndicator size="large" color="#ff0000" />
          <Text className="mt-3 text-center text-lg font-bold uppercase">
            Carregando...
          </Text>
          <Text className=" mt-3 text-center text-[#979797b0]">
            (Coletando todas as informações inseridas anteriormente na
            ocorrência.)
          </Text>
        </View>
      ) : (
        <>
          <View className="mx-auto">
            <AntDesign name="download" size={50} color="black" />
          </View>
          <Text className="mt-3 text-center text-[20px] font-bold">
            Você está finalizando sua ocorrência. Deseja fazer download dela?
          </Text>
          <Text className=" mt-3 text-center text-[#979797b0]">
            (Caso clique em DOWNLOAD irá gerar um pdf contendo todos os dados
            inseridos no aplicativo.)
          </Text>
          <View className="w-full flex-row">
            <Pressable
              className="mt-10 w-full items-center justify-center rounded-[7px] bg-[#F23030] p-3"
              onPress={handleDownloadPDF}
            >
              <Text className="text-[18px] font-bold uppercase text-white">
                <AntDesign name="download" size={28} color="#fff" />
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  )
}

export default DownloadPdfModal
