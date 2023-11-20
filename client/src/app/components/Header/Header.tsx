'use client'

import React from 'react'
import {
  Link,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import { Home, Person, Assignment, Settings, Logout } from '@mui/icons-material'
import '../../dashboard/dashboard.css'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
function Header() {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    router.push('/')
  }

  return (
    <header className="aside-header">
      <nav className="aside-navbar">
        <MenuList sx={{ width: '100%' }}>
          <MenuItem>
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Home fontSize="medium" />
              <Link
                href="/dashboard"
                variant="button"
                fontSize="medium"
                color="#707070"
                sx={{
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  textDecoration: 'none',
                }}
              >
                Home
              </Link>
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Person fontSize="medium" />
              <Link
                href="/dashboard/usuarios"
                variant="button"
                fontSize="medium"
                color="#707070"
                sx={{
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  textDecoration: 'none',
                }}
              >
                Usuários
              </Link>
            </ListItemIcon>
          </MenuItem>
        </MenuList>
        <MenuList sx={{ width: '100%' }}>
          <MenuItem>
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Settings fontSize="medium" />
              <Typography
                variant="button"
                fontSize="medium"
                sx={{ fontWeight: '500', textTransform: 'capitalize' }}
              >
                Configurações
              </Typography>
            </ListItemIcon>
          </MenuItem>
          <MenuItem>
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
              onClick={handleLogout}
            >
              <Logout fontSize="medium" />
              <Typography
                variant="button"
                fontSize="medium"
                sx={{ fontWeight: '500', textTransform: 'capitalize' }}
              >
                Sair
              </Typography>
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </nav>
    </header>
  )
}

export default Header
