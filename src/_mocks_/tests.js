import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const tests = [
  {
    id: 12,
    name: 'Matemática 1C',
    grade: 'Primaria',
    createdBy: 'Kumon SA',
    accomplishment: '      -',
    status: 'Resolver',
    date: ''
  },
  {
    id: 13,
    name: 'Matemática 1A',
    grade: 'Primaria',
    createdBy: 'Kumon SA',
    accomplishment: 'Certificado',
    status: 'Suficiente',
    date: '2020-12-11'
  },
  {
    id: 14,
    name: 'Matemática 1B',
    grade: 'Primaria',
    createdBy: 'Kumon SA',
    accomplishment: 'certificado',
    status: 'Suficiente',
    date: '2021-06-11'
  },
  {
    id: 15,
    name: 'Cs Sociales 1A',
    grade: 'Primaria',
    createdBy: 'Melli, Karina',
    accomplishment: 'Insignia',
    status: 'Suficiente',
    date: '2020-12-01'
  },
  {
    id: 16,
    name: 'Cs Sociales 1B',
    grade: 'Primaria',
    createdBy: 'Melli, Karina',
    accomplishment: '       -',
    status: 'Insuficiente',
    date: '2021-06-13'
  },
  {
    id: 17,
    name: 'Cs Naturales 1A',
    grade: 'Primaria',
    createdBy: 'Lopez, Susana',
    accomplishment: '-',
    status: 'Pendiente',
    date: '2021-09-10'
  },
  {
    id: 18,
    name: 'Cs Sociales 3A',
    grade: 'Primaria',
    createdBy: 'Lopez, Susana',
    accomplishment: 'Insignia',
    status: 'Suficiente',
    date: '2021-03-02'
  },
  {
    id: 19,
    name: 'Cs Sociales 2A',
    grade: 'Primaria',
    createdBy: 'Carrizo, Veronica',
    accomplishment: 'Insignia',
    status: 'Suficiente',
    date: '2020-12-03'
  },
  {
    id: 20,
    name: 'Cs Sociales 1A',
    grade: 'Primaria',
    createdBy: 'Carrizo, Veronica',
    accomplishment: 'Insignia',
    status: 'Suficiente',
    date: '2020-08-15'
  }
];

export default tests;
