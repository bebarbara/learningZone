import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const TESTLIST = [
  {
    id: 12,
    question: '¿Qué número es el quinientos veinte?',
    numquestion: '1',
    answer1: '180',
    answer2: '502',
    answer3: '520',
    answer4: '522'
  },
  {
    id: 13,
    question: '¿Qué número es el ciento cincuenta?',
    numquestion: '1',
    answer1: '550',
    answer2: '150',
    answer3: '50',
    answer4: '15'
  },
  {
    id: 14,
    question: '¿Qué número es el doscientos treinta ocho?',
    numquestion: '1',
    answer1: '180',
    answer2: '838',
    answer3: '238',
    answer4: '328'
  }
];

export default TESTLIST;
