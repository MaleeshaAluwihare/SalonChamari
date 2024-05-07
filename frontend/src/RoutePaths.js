// import React from 'react';

// import LandingPage from './pages/Maleesha/LandingPage';
// import Header from './components/Maleesha/header';
// import SalonHome from './pages/Maleesha/SalonHome';
// import HairServices from './pages/Maleesha/HairService';
// import SkinServices from './pages/Maleesha/SkinService';
// import NailServices from './pages/Maleesha/NailService';
// import BridalServices from './pages/Maleesha/BridalService';
// import CostumePage from './pages/Maleesha/CostumePage';
// import QuotationPage from './pages/Maleesha/QuotationPage';

// import Dashboard from './pages/Maleesha/Dashboard';


// const ClientLayout = ({ children }) => {
//     return (
//         <div>
//             <Header/>
//             {children}
//         </div>
//     )
// };

// const AdminLayout = ({ children }) => {
//     return (
//         <div>
//             <Header/>
//             {children}
//         </div>
//     )
// };

// export const routes = [
//     {
//         path:'/LandingPage',
//         element:<LandingPage/>
//     },
//     {
//         path:'/Home',
//         element:<ClientLayout><SalonHome/></ClientLayout>
//     },
//     {
//         path:'/HairServices',
//         element:<ClientLayout><HairServices/></ClientLayout>
//     },
//     {
//         path:'/SkinServices',
//         element:<ClientLayout><SkinServices/></ClientLayout>
//     },
//     {
//         path:'/NailServices',
//         element:<ClientLayout><NailServices/></ClientLayout>
//     },
//     {
//         path:'/BridalServices',
//         element:<ClientLayout><BridalServices/></ClientLayout>
//     },
//     {
//         path:'/CostumePage',
//         element:<ClientLayout><CostumePage/></ClientLayout>
//     },
//     {
//         path:'/QuotationPage',
//         element:<ClientLayout><QuotationPage/></ClientLayout>
//     },
//     {
//         path:'/Dashboard',
//         element:<AdminLayout><Dashboard/></AdminLayout>
//     }

// ];