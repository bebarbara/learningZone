import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgProduct } from '../utils/mockImages';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Salida de campo grupal',
  'Cumple de Valen en la plaza',
  'Literatura : el arte de contar cuentos',
  'Clases de ingles para primaria',
  'Enseño historia contada como cuento'
];
const PRODUCT_TIPO = ['Gratis', 'Gratis', 'SALE', '', 'New'];
const PRODUCT_PRICE = ['0', '0', '525', '375', '455'];
const PRODUCT_COLOR = [];

// ----------------------------------------------------------------------

const products = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: mockImgProduct(setIndex),
    name: PRODUCT_NAME[index],
    price: PRODUCT_PRICE[index],
    priceSale: setIndex % 3 ? null : '650',
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: PRODUCT_TIPO[index]
  };
});

export default products;
