'use client'

import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { Box, Divider } from '@mui/material'
import Header from '../components/Header/Header'
import { useDispatch } from 'react-redux'
import findUniqueUser from '@/api/findUniqueUser'
import { setUsersData } from '@/redux/actions/dataActions'
import Cookies from 'js-cookie'

type UserType = {
  user: {
    role: string
  }
}
function Dashboard() {
  const dispatch = useDispatch()

  const [myUser, setMyUser] = useState<UserType>({
    user: {
      role: '',
    },
  })

  const uniqueUserId = Cookies.get('userId')
  const userId = Number(uniqueUserId)

  useEffect(() => {
    const fetchUniqueUser = async () => {
      const response = await findUniqueUser(userId)
      dispatch(setUsersData(response as users))
      setMyUser(response)
      console.log(response)
    }

    fetchUniqueUser()
  }, [userId, dispatch])

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Box
        sx={{
          maxWidth: '1700px',
          width: '100%',
          margin: '0 auto',
          padding: '10px',
        }}
      >
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          width={'100%'}
          padding={2}
          height={'250px'}
          margin={'30px 0'}
          gap={5}
          sx={{
            borderRadius: '4px',
            boxShadow:
              '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          }}
        >
          <Box
            width={'70%'}
            bgcolor={'#eee'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={7}
          >
            <Box>asdasd</Box>
            <Divider orientation="vertical" flexItem />
            <Box>ddddd</Box>
          </Box>
          <Box width={'30%'} bgcolor={'#eee'}></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
