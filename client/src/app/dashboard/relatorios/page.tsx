'use client'
import findManyReports from '@/api/findManyReports'
import findUniqueUser from '@/api/findUniqueUser'
import findUsers from '@/api/findUser'
import Header from '@/app/components/Header/Header'
import { SkeletonTable } from '@/app/components/Skeleton/skeleton'
import { IReport } from '@/interfaces/IReport'
import IUser from '@/interfaces/IUser'
import { formatDate } from '@/utils/formatDate'
import { convertToSimNao } from '@/utils/formatIsActive'
import { formatRole } from '@/utils/formatRoles'
import { Clear } from '@mui/icons-material'
import logoImage from '@/public/logo-pdf.png'
import logoMedicinaImage from '@/public/logo-medicina.png'
import {
  Breadcrumbs,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Box,
  Link,
  Table,
  TableCell,
} from '@mui/material'
import Cookies from 'js-cookie'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DecTransporte from './components/DecTransporte'
import deleteReport from '@/api/deleteReport'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'

type UserType = {
  user: {
    role: string
  }
}

function Relatorios() {
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const [reports, setReports] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterText, setFilterText] = useState('')

  const [myUser, setMyUser] = useState<UserType>({
    user: {
      role: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const uniqueUserId = Cookies.get('userId')
  const userId = Number(uniqueUserId)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true)
        const response = await findManyReports()
        setReports(response.reports)
        console.log(response.reports)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchUniqueUser = async () => {
      const response = await findUniqueUser(userId)
      setMyUser(response)
      console.log(response)
    }

    fetchUniqueUser()
    fetchReports()
  }, [userId])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filteredReports = reports.filter((report: IReport) =>
    String(report.id).includes(filterText),
  )

  const handleClearFilterText = () => {
    setFilterText('')
  }

  const handleDeletReport = async (reportId: number) => {
    const response = await deleteReport(reportId)
    console.log(response)
    console.log(response.status)

    if (response?.status === 200) {
      enqueueSnackbar('Ocorrência deletada', { variant: 'warning' })
      router.push('/dashboard')
    }
  }

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
            href="/dashboard/relatorios"
            aria-current="page"
          >
            Relatórios
          </Link>
        </Breadcrumbs>
        <Typography
          variant="h1"
          fontSize="large"
          sx={{ fontWeight: '500', textTransform: 'capitalize' }}
        >
          Lista de Relatórios
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
              placeholder="Filtrar pelo número da ocorrência"
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
            {/* <Select
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
            </Select> */}
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>N°</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">CPF</TableCell>
                <TableCell align="center">Gênero</TableCell>
                <TableCell align="center">Idade</TableCell>
                <TableCell align="center">Dec. Transporte</TableCell>
                <TableCell align="center">Data da ocorrência</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((report: IReport) => (
                  <TableRow
                    key={report.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {!isLoading ? (
                      <>
                        <TableCell component="th" scope="row">
                          {report.id}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {report.name}
                        </TableCell>
                        <TableCell align="center">{report.cpf}</TableCell>
                        <TableCell align="center">{report.gender}</TableCell>
                        <TableCell align="center">{report.age}</TableCell>
                        <TableCell align="center">
                          <DecTransporte
                            decTransport={
                              report?.Finalization[0]?.transportation
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(report.createdAt)}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            width: '10%',
                            '& .colored-btn': {
                              backgroundColor: '#ff0000',
                            },
                          }}
                        >
                          {myUser && myUser.user.role === 'Admin' ? (
                            <Button
                              variant="contained"
                              color="error"
                              className="colored-btn"
                              onClick={() => handleDeletReport(report.id)}
                            >
                              <Trash />
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="error"
                              className="colored-btn"
                              disabled={true}
                            >
                              <Trash />
                            </Button>
                          )}
                        </TableCell>
                      </>
                    ) : (
                      <TableCell colSpan={8}>
                        <SkeletonTable />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={reports.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Relatorios
