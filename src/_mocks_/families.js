import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const families = [...Array(1)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: mockImgAvatar(index + 1),
  name: sample(['Pilar Cerezo', 'Pilar Cerezo']),
  certificates: sample(['  2', '  2']),
  isVerified: sample([' si', ' si']),
  status: sample(['Activo', 'Activo']),
  insignia: sample(['4', '4'])
}));

export default families;
