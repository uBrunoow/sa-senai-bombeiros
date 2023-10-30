import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import bcrypt from 'fastify-bcrypt' // Importe o plugin aqui

// Users
import { userRegisterRoutes } from './src/routes/users/registerRoutes'
import { userLoginRoutes } from './src/routes/users/loginRoutes'
import { userUpdateRoutes } from './src/routes/users/updateRoutes'
import { userDeleteRoutes } from './src/routes/users/deleteRoutes'
import {
  userFindOneRoutes,
  userFindRoutes,
} from './src/routes/users/findRoutes'

// Reports
import { registerReportRoutes } from './src/routes/reports/registerReports'
import { reportsUpdateRoutes } from './src/routes/reports/updateReports'
import { reportsDeleteRoutes } from './src/routes/reports/deleteReports'
import {
  reportFindOneRoutes,
  reportsFindRoutes,
} from './src/routes/reports/findReports'

// Symptoms
import { registerSymptomsRoutes } from './src/routes/reports/Symptoms/registerSymptoms'
import { symptomsDeleteRoutes } from './src/routes/reports/Symptoms/deleteSymptoms'
import {
  symptomsFindRoutes,
  symptomsFindOneRoutes,
  symptomsByReportRoutes,
} from './src/routes/reports/Symptoms/findSymptoms'
import { updateSymptomsRoutes } from './src/routes/reports/Symptoms/updateSymptoms'

// Anamnesis
import { registerAnamneseRoutes } from './src/routes/reports/Anamnesis/registerAnamesis'
import { anamneseUpdateRoutes } from './src/routes/reports/Anamnesis/updateAnamesis'

// Pre Hospitalar methods
import { registerPreHospitalarMethodsRoutes } from './src/routes/reports/PreHospitalarMethod/registerPreHosMethod'
import { updatePreHospitalarMethodsRoutes } from './src/routes/reports/PreHospitalarMethod/updatePreHosMethod'
import {
  preHospitalarMethodsFindByReportRoutes,
  preHospitalarMethodsFindOneRoutes,
  preHospitalarMethodsFindRoutes,
} from './src/routes/reports/PreHospitalarMethod/findPreHosMethod'
import { preHospitalarMethodsDeleteRoutes } from './src/routes/reports/PreHospitalarMethod/deletePreHosMethod'
import {
  anamnesisFindOneRoutes,
  anamnesisFindRoutes,
} from './src/routes/reports/Anamnesis/findAnamesis'
import { anamneseDeleteRoutes } from './src/routes/reports/Anamnesis/deleteAnamesis'

// Glasgow
import { registerGlasgowRoutes } from './src/routes/reports/Glasglow/registerGlasglow'
import { updateGlasgowRoutes } from './src/routes/reports/Glasglow/updateGlasglow'
import {
  glasgowFindOneRoutes,
  glasgowFindRoutes,
} from './src/routes/reports/Glasglow/findGlasglow'
import { glasgowDeleteRoutes } from './src/routes/reports/Glasglow/deleteGlasglow'

// Gestacional Anamnesis
import { registerGestacionalAnamnesisRoutes } from './src/routes/reports/GestationalAnamnesis/registerGesAnamnesis'
import { updateGestacionalAnamnesisRoutes } from './src/routes/reports/GestationalAnamnesis/updateGesAnamnesis'
import {
  gestacionalAnamnesisFindOneRoutes,
  gestacionalAnamnesisFindRoutes,
} from './src/routes/reports/GestationalAnamnesis/findGesAnamnesis'
import { gestacionalAnamnesisDeleteRoutes } from './src/routes/reports/GestationalAnamnesis/deleteGesAnamnesis'

// Finalization
import { registerFinalizationRoutes } from './src/routes/reports/Finalization/registerFinalization'
import { updateFinalizationRoutes } from './src/routes/reports/Finalization/updateFinalization'
import {
  finalizationFindOneRoutes,
  finalizationFindRoutes,
} from './src/routes/reports/Finalization/findFinalization'
import { finalizationDeleteRoutes } from './src/routes/reports/Finalization/deleteFinalization'

// Problemas Suspeitos
import { registerSuspectProblems } from './src/routes/reports/SuspectProblems/registerSuspectProblems'
import { updateSuspectProblemsRoutes } from './src/routes/reports/SuspectProblems/updateSuspectProblems'
import {
  suspectProblemsFindRoutes,
  suspectProblemsFindOneRoutes,
} from './src/routes/reports/SuspectProblems/findSuspectProblems'
import { suspectProblemsDeleteRoutes } from './src/routes/reports/SuspectProblems/deleteSuspectProblems'

// Local Traumas
import { findManyTraumasRoutes } from './src/routes/reports/LocalTraumas/findMany'
import { registerTraumasRoutes } from './src/routes/reports/LocalTraumas/register'
import { updateTraumasRoutes } from './src/routes/reports/LocalTraumas/update'

// Cinematic Avaliation
import { registerCinematicAvaliationRoutes } from './src/routes/reports/CinematicAvaliation/registerCinematicAvaliation'
import { updateCinematicAvaliationRoutes } from './src/routes/reports/CinematicAvaliation/updateCinematicAvaliation'
import {
  cinematicAvaliationFindOneRoutes,
  cinematicAvaliationFindRoutes,
} from './src/routes/reports/CinematicAvaliation/findCinematicAvaliation'
import { cinematicAvaliationDeleteRoutes } from './src/routes/reports/CinematicAvaliation/deleteCinematicAvaliation'

const app = fastify() // Dar para a const app todas as informações do Fastify

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'bombeiro',
})

app.register(bcrypt)

// USER
app.register(userRegisterRoutes)
app.register(userLoginRoutes)
app.register(userUpdateRoutes)
app.register(userDeleteRoutes)
app.register(userFindOneRoutes)
app.register(userFindRoutes)

// REPORTS
app.register(reportsFindRoutes)
app.register(reportFindOneRoutes)
app.register(registerReportRoutes)
app.register(reportsUpdateRoutes)
app.register(reportsDeleteRoutes)

// SYMPTOMS
app.register(registerSymptomsRoutes)
app.register(symptomsDeleteRoutes)
app.register(symptomsFindRoutes)
app.register(symptomsFindOneRoutes)
app.register(updateSymptomsRoutes)
app.register(symptomsByReportRoutes)

// ANAMNESIS
app.register(registerAnamneseRoutes)
app.register(anamneseUpdateRoutes)
app.register(anamnesisFindRoutes)
app.register(anamnesisFindOneRoutes)
app.register(anamneseDeleteRoutes)

// PRE HOSPITLAR METHODS
app.register(registerPreHospitalarMethodsRoutes)
app.register(updatePreHospitalarMethodsRoutes)
app.register(preHospitalarMethodsFindRoutes)
app.register(preHospitalarMethodsFindOneRoutes)
app.register(preHospitalarMethodsDeleteRoutes)
app.register(preHospitalarMethodsFindByReportRoutes)

// GLASGOW
app.register(registerGlasgowRoutes)
app.register(updateGlasgowRoutes)
app.register(glasgowFindRoutes)
app.register(glasgowFindOneRoutes)
app.register(glasgowDeleteRoutes)

// GESTACIONAL ANAMNESIS
app.register(registerGestacionalAnamnesisRoutes)
app.register(updateGestacionalAnamnesisRoutes)
app.register(gestacionalAnamnesisFindRoutes)
app.register(gestacionalAnamnesisFindOneRoutes)
app.register(gestacionalAnamnesisDeleteRoutes)

// FINALIZATION
app.register(registerFinalizationRoutes)
app.register(updateFinalizationRoutes)
app.register(finalizationFindRoutes)
app.register(finalizationFindOneRoutes)
app.register(finalizationDeleteRoutes)

// SUSPECT PROBLEMS
app.register(registerSuspectProblems)
app.register(updateSuspectProblemsRoutes)
app.register(suspectProblemsFindRoutes)
app.register(suspectProblemsFindOneRoutes)
app.register(suspectProblemsDeleteRoutes)

// LOCAL TRAUMAS
app.register(findManyTraumasRoutes)
app.register(registerTraumasRoutes)
app.register(updateTraumasRoutes)

// CINEMATIC AVALIATION
app.register(registerCinematicAvaliationRoutes)
app.register(updateCinematicAvaliationRoutes)
app.register(cinematicAvaliationFindRoutes)
app.register(cinematicAvaliationFindOneRoutes)
app.register(cinematicAvaliationDeleteRoutes)

app
  .listen({
    port: 3333, // Porta para rodar na Aplicação WEB
    host: '0.0.0.0', // Porta para rodar na Aplicação APPs
  })
  .then(() => {
    console.log('🔥🚒 HTTP server running on port http://localhost:3333') // Ao rodar o server aparecer a seguinte mensagem
  })
