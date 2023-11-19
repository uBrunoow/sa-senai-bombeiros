import React from 'react'
import { ListItemIcon, MenuItem, MenuList, Typography } from '@mui/material'
import { Home, Person, Assignment, Settings, Logout } from '@mui/icons-material'
import '../../dashboard/dashboard.css'
function Header() {
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
              <Home fontSize="large" />
              <Typography
                variant="button"
                fontSize="large"
                sx={{ fontWeight: '500', textTransform: 'capitalize' }}
              >
                Home
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
            >
              <Person fontSize="large" />
              <Typography
                variant="button"
                fontSize="large"
                sx={{ fontWeight: '500', textTransform: 'capitalize' }}
              >
                Usuários
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
            >
              <Assignment fontSize="large" />
              <Typography
                variant="button"
                fontSize="large"
                sx={{ fontWeight: '500', textTransform: 'capitalize' }}
              >
                Relatórios
              </Typography>
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
              <Settings fontSize="large" />
              <Typography
                variant="button"
                fontSize="large"
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
            >
              <Logout fontSize="large" />
              <Typography
                variant="button"
                fontSize="large"
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
