import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles as s } from '@app/styles/boxShadow'
import YesOrNo from '@app/components/YesOrNo'
import { setCinematicData } from '@src/redux/actions/dataActions'
import { useDispatch } from 'react-redux'
const Cinematica = () => {
  const dispatch = useDispatch()
  const [comportamentalDisturb, setComportamentalDisturb] = useState(false)
  const [foundWithHelmet, setFoundWithHelmet] = useState(false)
  const [foundWithSeatbelt, setFoundWithSeatbelt] = useState(false)
  const [walkingInTheScene, setWalkingInTheScene] = useState(false)
  const [damagedWindshield, setDamagedWindshield] = useState(false)
  const [damagedPanel, setDamagedPanel] = useState(false)

  const handleComportamentalDisturb = (option: 'SIM' | 'NÃO') => {
    setComportamentalDisturb(option === 'SIM')
  }
  const handleFoundWithHelmet = (option: 'SIM' | 'NÃO') => {
    setFoundWithHelmet(option === 'SIM')
  }
  const handleFoundWithSeatbelt = (option: 'SIM' | 'NÃO') => {
    setFoundWithSeatbelt(option === 'SIM')
  }
  const handleWalkingInTheScene = (option: 'SIM' | 'NÃO') => {
    setWalkingInTheScene(option === 'SIM')
  }
  const handleDamagedWindshield = (option: 'SIM' | 'NÃO') => {
    setDamagedWindshield(option === 'SIM')
  }
  const handleDamagedPanel = (option: 'SIM' | 'NÃO') => {
    setDamagedPanel(option === 'SIM')
  }

  useEffect(() => {
    const onChangeSuspectProblemsDataInfo = () => {
      const cinematicaDataInfo = {
        comportamentalDisturb,
        foundWithHelmet,
        foundWithSeatbelt,
        walkingInTheScene,
        damagedWindshield,
        damagedPanel,
      }

      console.log(cinematicaDataInfo)

      dispatch(setCinematicData(cinematicaDataInfo))
    }

    onChangeSuspectProblemsDataInfo()
  }, [
    comportamentalDisturb,
    foundWithHelmet,
    foundWithSeatbelt,
    walkingInTheScene,
    damagedWindshield,
    damagedPanel,
    dispatch,
  ])

  return (
    <View
      style={s.boxShadow}
      className=" mx-auto mb-12 w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
    >
      <Text className="font-medium">AVALIAÇÃO DE</Text>
      <Text className="text-4xl font-bold">CINEMÁTICA</Text>

      <View className="mt-3">
        <YesOrNo
          Question="Distúrbio de comportamento"
          selectedOption={comportamentalDisturb ? 'SIM' : 'NÃO'}
          onSelectOption={handleComportamentalDisturb}
        />
        <YesOrNo
          Question="Encontrado de capacete"
          selectedOption={foundWithHelmet ? 'SIM' : 'NÃO'}
          onSelectOption={handleFoundWithHelmet}
        />
        <YesOrNo
          Question="Encontrado de cinto"
          selectedOption={foundWithSeatbelt ? 'SIM' : 'NÃO'}
          onSelectOption={handleFoundWithSeatbelt}
        />
        <YesOrNo
          Question="Caminhando na cena"
          selectedOption={walkingInTheScene ? 'SIM' : 'NÃO'}
          onSelectOption={handleWalkingInTheScene}
        />
        <YesOrNo
          Question="Para-brisas avariado"
          selectedOption={damagedWindshield ? 'SIM' : 'NÃO'}
          onSelectOption={handleDamagedWindshield}
        />
        <YesOrNo
          Question="Painel avariado"
          selectedOption={damagedPanel ? 'SIM' : 'NÃO'}
          onSelectOption={handleDamagedPanel}
        />
      </View>
    </View>
  )
}

export default Cinematica
