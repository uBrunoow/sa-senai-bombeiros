'use client'

import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import Header from '../components/Header/Header'
import { useDispatch } from 'react-redux'
import findUniqueUser from '@/api/findUniqueUser'
import Cookies from 'js-cookie'
import { getFirstTwoLetters } from '@/utils/firstTwoLetters'
import { getRandomColor } from '@/utils/randomColor'
import { formatRole } from '@/utils/formatRoles'

type UserType = {
  user: {
    role: string
    name: string
    email: string
    Reports: any[]
  }
}
function Dashboard() {
  const dispatch = useDispatch()

  const [myUser, setMyUser] = useState<UserType>({
    user: {
      role: '',
      name: '',
      email: '',
      Reports: [],
    },
  })

  const uniqueUserId = Cookies.get('userId')
  const userId = Number(uniqueUserId)

  useEffect(() => {
    const fetchUniqueUser = async () => {
      const response = await findUniqueUser(userId)
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
            p={4}
          >
            {myUser && (
              <>
                <Box
                  sx={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                  }}
                >
                  <Avatar
                    sx={{ width: 76, height: 76, bgcolor: getRandomColor() }}
                  >
                    {getFirstTwoLetters(myUser.user.name)}
                  </Avatar>
                  <Box>
                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={'bold'}
                        textTransform={'uppercase'}
                        fontFamily={'monospace'}
                        fontSize={25}
                      >
                        {myUser.user.name}
                      </Typography>
                    </Box>
                    <Box>{formatRole(myUser.user.role)}</Box>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box
                  sx={{
                    bgcolor: 'white',
                    width: '40%',
                    height: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    border: '1px solid red',
                    borderRadius: '5px',
                    flexDirection: 'column',
                  }}
                >
                  <Typography
                    variant="h1"
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    fontSize={35}
                  >
                    {myUser.user.Reports.length}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    fontSize={18}
                    textAlign={'center'}
                  >
                    Ocorrências realizadas
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Box width={'30%'} bgcolor={'#eee'}></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
