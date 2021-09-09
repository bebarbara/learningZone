import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['Activo', 'Expirado', 'Pendiente']),
  role: sample(['Insignia', 'Certificado'])
}));

const tests = [
  {
    id: 12,
    name: 'Matematica',
    grade: '1',
    createdBy: 'Lopez, Susana',
    questionnare: 'Pregunta 1 ',
    option: ['Respuesta 1 ', 'Respuesta 2 ', 'Respuesta 3 ', 'Respuesta 4 '],
    status: 'Activo',
    date: '2020-01-01'
  },
  {
    id: 13,
    name: 'Matematica',
    grade: '1',
    createdBy: 'Lopez, Susana',
    questionnare: 'Pregunta 1 ',
    option: ['Respuesta 1 ', 'Respuesta 2 ', 'Respuesta 3 ', 'Respuesta 4 '],
    status: 'Activo',
    date: '2020-01-01'
  },
  {
    id: 14,
    name: 'Matematica',
    grade: '1',
    createdBy: 'Lopez, Susana',
    questionnare: 'Pregunta 1 ',
    option: ['Respuesta 1 ', 'Respuesta 2 ', 'Respuesta 3 ', 'Respuesta 4 '],
    status: 'Activo',
    date: '2020-01-01'
  },
  {
    id: 15,
    name: 'Matematica',
    grade: '1',
    createdBy: 'Lopez, Susana',
    questionnare: 'Pregunta 1 ',
    option: ['Respuesta 1 ', 'Respuesta 2 ', 'Respuesta 3 ', 'Respuesta 4 '],
    status: 'Activo',
    date: '2020-01-01'
  },
  {
    id: 16,
    name: 'Matematica',
    grade: '1',
    createdBy: 'Lopez, Susana',
    questionnare: 'Pregunta 1 ',
    option: ['Respuesta 1 ', 'Respuesta 2 ', 'Respuesta 3 ', 'Respuesta 4 '],
    status: 'Activo',
    date: '2020-01-01'
  }
];

export default users;
