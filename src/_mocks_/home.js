import faker from 'faker';
// utils
import { mockImgCover } from '../utils/mockImages';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Aprender sin escuelas',
  'Dejar a los niños ser niños',
  '¿Es necesario una asesoría Homescholling?',
  'Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo',
  'Cada vez mas padres optan por enseñar a sus hijos lejos de las escuelas',
  'La enseñanza en tiempos de pandemía',
  '"El juego es la forma más elevada de la investigación." A.Einstein'
];
const POST_DATE = [
  'Aprender sin escuelas',
  'Dejar a los niños ser niños',
  '¿Es necesario una asesoría Homescholling?',
  'Dime y lo olvido, enséñame y lo recuerdo, involúcrame y lo aprendo',
  'Cada vez mas padres optan por enseñar a sus hijos lejos de las escuelas',
  'La enseñanza en tiempos de pandemía',
  '"El juego es la forma más elevada de la investigación." A.Einstein'
];

const posts = [...Array(6)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: mockImgCover(index + 1),
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/ju_espinoza.jpg`
  }
}));

export default posts;
