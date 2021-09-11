import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';
import pinoutline from '@iconify/icons-eva/pin-outline';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import clockoutline from '@iconify/icons-eva/clock-outline';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import searchfill from '@iconify/icons-eva/search-fill';
// import family from '@iconify/icons-vaadin/family';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'buscar',
    path: '/dashboard/products',
    icon: getIcon(searchfill)
  },
  {
    title: 'Eventos',
    path: '/dashboard/blog',
    icon: getIcon(clockoutline)
  },
  {
    title: 'Localización',
    path: '/login',
    icon: getIcon(pinoutline)
  },
  {
    title: 'Tests',
    path: '/dashboard/test',
    icon: getIcon(bookOpenOutline)
  },
  {
    title: 'Familia',
    path: '/dashboard/family',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
