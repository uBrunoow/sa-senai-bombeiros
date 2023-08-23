export const fakeData = {
  user: {
    id: '1',
    email: 'teste@gmail.com',
    name: 'Teste',
    password: 'teste@123',
    gender: 'Masculino',
    isActive: true,
    reports: [
      {
        id: '1',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        reportDate: Date.now(),
        name: '1',
        gender: '1',
        age: '1',
        cpf: '1',
        phone: '1',
        reportPlace: '1',
        bloodPressure: '1',
        bodyTemp: '1',
        bodyPulse: '1',
        breathing: '1',
        ownerId: 'user.id',
        PreHospitalMethods: [
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
        ],
        Symptoms: [
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
        ],
        GestationalAnamnesis: [
          {
            id: '',
            description: '',
          },
        ],
        Anamnesis: [
          {
            id: '',
            description: '',
          },
        ],
        SuspectProblems: [
          {
            id: '',
            description: '',
          },
        ],
        Glasglow: [
          {
            id: '',
            description: '',
          },
        ],
      },
      {
        id: '2',
        createdAt: '1',
        updatedAt: '1',
        reportDate: '1',
        name: '1',
        gender: '1',
        age: '1',
        cpf: '1',
        phone: '1',
        reportPlace: '1',
        bloodPressure: '1',
        bodyTemp: '1',
        bodyPulse: '1',
        breathing: '1',
        ownerId: 'user.id',
        PreHospitalMethods: [
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
        ],
        Symptoms: [
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
          {
            id: '',
            description: '',
          },
        ],
        GestationalAnamnesis: [
          {
            id: '',
            description: '',
          },
        ],
        Anamnesis: [
          {
            id: '',
            description: '',
          },
        ],
        SuspectProblems: [
          {
            id: '',
            description: '',
          },
        ],
        Glasglow: [
          {
            id: '',
            description: '',
          },
        ],
      },
    ],
  },
}

const fakeDataJSON = JSON.stringify(fakeData, null, 2)

console.log(fakeDataJSON)
