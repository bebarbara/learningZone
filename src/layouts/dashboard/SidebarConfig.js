import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';
import pinoutline from '@iconify/icons-eva/pin-outline';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import clockoutline from '@iconify/icons-eva/clock-outline';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import searchfill from '@iconify/icons-eva/search-fill';
import heartFill from '@iconify/icons-eva/heart-fill';
import layersFill from '@iconify/icons-eva/layers-fill';
import globe2Outline from '@iconify/icons-eva/globe-2-outline';
import homeFill from '@iconify/icons-eva/home-fill';
// import family from '@iconify/icons-vaadin/family';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Inicio',
    path: '/dashboard/home',
    icon: getIcon(homeFill)
  },
  {
    title: 'Comunidad',
    path: '/dashboard/blog',
    icon: getIcon(globe2Outline)
  },
  {
    title: 'Material',
    path: '/dashboard/other',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Eventos',
    path: '/dashboard/blog',
    icon: getIcon(clockoutline)
  },
  {
    title: 'Clases',
    path: '/dashboard/blog',
    icon: getIcon(layersFill)
  },
  {
    title: 'Tests',
    path: '/dashboard/test',
    icon: getIcon(bookOpenOutline)
  },
  {
    title: 'Usuarios',
    path: '/dashboard/family',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Familia',
    path: '/dashboard/family',
    icon: getIcon(heartFill)
  },
  {
    title: 'buscar',
    path: '/dashboard/products',
    icon: getIcon(searchfill)
  }
];

export default sidebarConfig;
