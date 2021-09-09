import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const TESTLIST = [
  {
    id: 12,
    question: 'Pregunta1',
    numquestion: '1',
    answer1: 'Resultadoa1',
    answer2: 'Resultadoa2',
    answer3: 'Resultadoa3',
    answer4: 'Resultadoa4'
  },
  {
    id: 13,
    question: 'Pregunta2',
    numquestion: '2',
    answer1: 'Resultadob1',
    answer2: 'Resultadob2',
    answer3: 'Resultadob3',
    answer4: 'Resultadob4'
  }
];

export default TESTLIST;
