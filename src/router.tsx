import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messanger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

const BarangBusuk = Loader(
  lazy(() => import('src/content/applications/BarangBusuk'))
);

const BahanBakuCabang = Loader(
  lazy(() => import('src/content/applications/BahanBakuCabang'))
);

const BeliCabang = Loader(
  lazy(() => import('src/content/applications/BeliCabang'))
);

const KodeSupplierCabang = Loader(
  lazy(() => import('src/content/applications/KodeSupplierGudang'))
);

const MakananCabang = Loader(
  lazy(() => import('src/content/applications/MakananCabang'))
);

const MutasiCabang = Loader(
  lazy(() => import('src/content/applications/MutasiCabang'))
);

const StockOpnameCabang = Loader(
  lazy(() => import('src/content/applications/StockOpnameCabang'))
);

const DataKirimGudang = Loader(
  lazy(() => import('src/content/applications/DataKirimGudang'))
);

const BahanBakuGudang = Loader(
  lazy(() => import('src/content/applications/BahanBakuGudang'))
);

//Auth
const SignIn = Loader(lazy(() => import('src/content/applications/Loginpage')));

//Homepage
const Homepage = Loader(
  lazy(() => import('src/content/applications/Homepage'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SignIn />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboards/homepage" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'homepage',
        element: <Homepage />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      },
      {
        path: 'bahanbakucabang',
        element: <BahanBakuCabang />
      },
      {
        path: 'bahanbakugudang',
        element: <BahanBakuGudang />
      },
      {
        path: 'barangbusuk',
        element: <BarangBusuk />
      },
      {
        path: 'belicabang',
        element: <BeliCabang />
      },
      {
        path: 'datakirimgudang',
        element: <DataKirimGudang />
      },
      {
        path: 'kodesuppliercabang',
        element: <KodeSupplierCabang />
      },
      {
        path: 'makanancabang',
        element: <MakananCabang />
      },
      {
        path: 'mutasicabang',
        element: <MutasiCabang />
      },
      {
        path: 'stockopnamecabang',
        element: <StockOpnameCabang />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
