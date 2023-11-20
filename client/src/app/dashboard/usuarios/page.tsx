'use client'
import findUsers from '@/api/findUser'
import Header from '@/app/components/Header/Header'
import IUser from '@/interfaces/IUser'
import { formatDate } from '@/utils/formatDate'
import '../dashboard.css'

import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Clear } from '@mui/icons-material'
import { convertToSimNao } from '@/utils/formatIsActive'
import NovoBombeiro from '@/app/components/modal/novoBombeiro'
function Usuarios() {
  const [users, setUsers] = useState([])
  const [filterText, setFilterText] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await findUsers()

      console.log(response.allUsers)

      setUsers(response.allUsers)
    }

    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user: IUser) =>
    user.name.toLowerCase().includes(filterText.toLowerCase()),
  )

  const handleClearFilterText = () => {
    setFilterText('')
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const [sortOption, setSortOption] = useState('')

  const handleSortChange = (event: any) => {
    setSortOption(event.target.value)
  }

  const getSortingFunction = (option: string) => {
    switch (option) {
      case 'recent':
        return (a: IUser, b: IUser) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        }

      case 'oldest':
        return (a: IUser, b: IUser) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateA.getTime() - dateB.getTime()
        }
      case 'gender':
        return (a: IUser, b: IUser) => a.gender.localeCompare(b.gender)
      case 'mostOccurrences':
        return (a: IUser, b: IUser) => b.Reports.length - a.Reports.length
      case 'leastOccurrences':
        return (a: IUser, b: IUser) => a.Reports.length - b.Reports.length
      default:
        return () => 0
    }
  }

  const sortedUsers = filteredUsers.sort(getSortingFunction(sortOption))

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
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/dashboard">
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/dashboard/usuarios"
            aria-current="page"
          >
            Usuários
          </Link>
        </Breadcrumbs>
        <Typography
          variant="h1"
          fontSize="large"
          sx={{ fontWeight: '500', textTransform: 'capitalize' }}
        >
          Lista de Bombeiros
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            <TextField
              color="error"
              type="text"
              placeholder="Filtrar por nome"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              sx={{ margin: '20px 0', width: '300px' }}
              className="form-filter-input"
            />
            <Button
              type="submit"
              variant="contained"
              color="error"
              className="form-filter-button"
              onClick={handleClearFilterText}
            >
              <Clear />
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Select
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Sort by' }}
              className="order-by"
            >
              <MenuItem value="" disabled>
                Ordenar por
              </MenuItem>
              <MenuItem value="recent">Mais recente</MenuItem>
              <MenuItem value="oldest">Mais antigo</MenuItem>
              <MenuItem value="gender">Gênero</MenuItem>
              <MenuItem value="mostOccurrences">Mais ocorrências</MenuItem>
              <MenuItem value="leastOccurrences">Menos ocorrências</MenuItem>
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="form-filter-button type-new"
              onClick={handleOpenModal}
            >
              <Typography
                variant="button"
                fontSize="small"
                sx={{ fontWeight: '800' }}
              >
                Cadastrar novo bombeiro
              </Typography>
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Gênero</TableCell>
                <TableCell align="center">Ativo</TableCell>
                <TableCell align="center">N° de ocorrências</TableCell>
                <TableCell align="center">Created at</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user: IUser) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">
                      {convertToSimNao(user.isActive)}
                    </TableCell>
                    <TableCell align="center">{user.Reports.length}</TableCell>
                    <TableCell align="center">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <NovoBombeiro handleClose={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  )
}

export default Usuarios
