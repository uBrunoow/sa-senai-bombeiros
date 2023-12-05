'use client'

import React from 'react'
import {
  Divider,
  Link,
  ListItemIcon,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import { Home, Person, Logout, Assessment } from '@mui/icons-material'
import '../../dashboard/dashboard.css'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import logoNoar from '@/public/logo_pequena 3.png'
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
          <MenuItem
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              justifyContent: 'center',
            }}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                justifyContent: 'center',
              }}
            >
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
                <Image src={logoNoar} alt="" width={100} height={100} />
              </Link>
            </ListItemIcon>
          </MenuItem>
          <Divider />
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
          <MenuItem>
            <ListItemIcon
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Assessment fontSize="medium" />
              <Link
                href="/dashboard/relatorios"
                variant="button"
                fontSize="medium"
                color="#707070"
                sx={{
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  textDecoration: 'none',
                }}
              >
                Relatórios
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
