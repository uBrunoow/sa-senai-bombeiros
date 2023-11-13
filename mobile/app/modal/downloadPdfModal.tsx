import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'

const DownloadPdfModal = () => {
  const generatePDF = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              
              *{
                padding:0;
                margin:0;
              }

              .subtitle {
                font-size: 12px;
              }
              .title {
                font-size: 18px;
              }
              .sub-subtitle {
                font-size: 15px;
                color: #707070;
                margin-top: -5px
              }
              .logo-img {
                width: 50px;
                height: 50px;
              }
              .header {
                border-bottom: 1px solid black;
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-direction: row;
                margin-bottom: 20px;
              }
              .flex {
                display: flex;
                align-items: center;
                justify-content: start;
                flex-direction: row;
                gap: 15px;
              }
              .table-header {
                background-color: #000;
                color: #fff;
                width: 100vw;
                padding: 5px 15px;
              }
              .table {
                border: 1px solid black;
              }
            </style>
          </head>
          <body>
            <header class="header">
              <div class="flex">
                <img class="logo-img" src="" alt="Imagem de cabeçalho" />
                <div>
                  <h1 class="title">Bombeiros voluntários <span class="subtitle">Relatório de ocorrência</span></h1>
                  <p class="sub-subtitle">Associação de Serviços Sociais Voluntários de Guaramirim</p>
                </div>
              </div>
              <img class="logo-img" src="" alt="Imagem secundária de cabeçalho" />
            </header>

            <main>
              <div class="table"> 
                <div class="table-header">
                  <p>Informações básicas</p>
                </div>
                <div>
                  <h1>Dados do relatório</h1>
                  <p>Nome:</p>
                  <p>Idade:</p>
                  <p>Sexo:</p>
                  <p>Data:</p>
                </div>
              </div>
            </main>
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
          dialogTitle: 'Download PDF',
        })
        console.log('Download concluído com sucesso!')
      } catch (error) {
        console.error('Erro ao realizar o download do PDF:', error)
      }
    }
  }

  return (
    <View className="w-[320px]">
      <View className="mx-auto">
        <AntDesign name="download" size={50} color="black" />
      </View>
      <Text className="mt-3 text-center text-[20px] font-bold">
        Você está finalizando sua ocorrência. Deseja fazer download dela ou
        apenas salvar?
      </Text>
      <Text className=" mt-3 text-center text-[#979797b0]">
        (Caso clique em DOWNLOAD irá gerar um pdf, caso clique em SALVAR os
        dados da report serão salvos)
      </Text>
      <View className="w-full flex-row">
        <Pressable className="ml-[-4px] mt-10 w-5/6 items-center justify-center rounded-[7px] bg-[#F23030] p-3">
          <Text className="text-[18px] font-bold uppercase text-white">
            SALVAR
          </Text>
        </Pressable>
        <Pressable
          className="mx-2 mt-10 items-center justify-center rounded-[7px] border-2 border-[#F23030] bg-[#fff] p-3"
          onPress={handleDownloadPDF}
        >
          <Text className="text-[18px] font-bold uppercase text-white">
            <AntDesign name="download" size={28} color="#F23030" />
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default DownloadPdfModal
