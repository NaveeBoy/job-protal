import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import LogIn from './pages/LogIn';
import UserDashboard from './pages/user/UserDashboard';
import UserRoute from './component/UserRoute';
import AdminRoute from './component/AdminRoute';
import CompanyRoute from './component/CompanyRoute.js';
import Layout from './pages/global/Layout';
import UserJobsHistory from './pages/user/UserJobsHistory';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs';
import SignUpForm from './pages/Signup';
import AdminAdd from './pages/admin/AdminAddPopUp';
import DashCategory from './pages/admin/AdminDashCategory.js';
import CategoryAdd from './pages/admin/CategoryAddPopUp.js';
import CompanyDashboard from './pages/company/CompanyDashBoard.js' ;
import Mypost from './pages/company/MyPosts.js';
import CompanyJobAdd from './pages/company/CompanyJobAdd.js';
import CompanyInfoDashBoard from './pages/company/CompanyInfoDashBoard.js';
import ChatBot from './component/Chatbot/Chatbot.js'
import SeekersTable from './pages/company/SeekersTable.js';
import AcceptedApplications from './pages/company/AcceptedApplications.js';

//HOC

const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const CompanyInfoDashBoardHOC = Layout(CompanyInfoDashBoard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCategoryHOC = Layout(DashCategory);
const AdminAddPopUp = Layout(AdminAdd);
const CategoryAddPopUp =Layout(CategoryAdd);
const CompanyDashboardHOC = Layout(CompanyDashboard);
const MypostHOC=Layout(Mypost);
const CompanyJobAddpop = Layout(CompanyJobAdd);
const SeekersTableHOC = Layout(SeekersTable);
const AcceptedApplicationsHOC = Layout(AcceptedApplications);



const App = () => {

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProSidebarProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/chatbot' element={<ChatBot/>}/>
                            <Route path='/company/myposts' element={<CompanyRoute><MypostHOC /></CompanyRoute>} />
                            <Route path='/search/location/:location' element={<Home />} />
                            <Route path='/search/location/:jobTime' element={<Home />} />
                            <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LogIn />} />
                            <Route path='/signup' element={<SignUpForm />} />
                            <Route path='/job/:id' element={<SingleJob />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                            <Route path='/company/dashboard' element={<CompanyRoute><CompanyDashboardHOC /></CompanyRoute>} />
                            <Route path='/company/jobadd' element={<CompanyRoute><CompanyJobAddpop /></CompanyRoute>} />
                            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                            <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                            <Route path='/admin/AdminAddPopUp' element={<AdminRoute><AdminAddPopUp /></AdminRoute>} />
                            <Route path='/admin/CategoryAddPopUp' element={<AdminRoute><CategoryAddPopUp /></AdminRoute>} />
                             <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} /> 
                            <Route path='/user/dashboard' element={<UserRoute>< UserDashboardHOC /></UserRoute>} />
                            <Route path='/user/jobs' element={<UserRoute>< UserJobsHistoryHOC /></UserRoute>} />
                            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />
                            <Route path='/company/info' element={<CompanyRoute>< CompanyInfoDashBoardHOC /></CompanyRoute>} />
                            <Route path='/company/seekers' element={<CompanyRoute>< SeekersTableHOC /></CompanyRoute>} />
                            <Route path='/company/acceptedapplications' element={<CompanyRoute>< AcceptedApplicationsHOC /></CompanyRoute>} />

                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </ProSidebarProvider>
            </ThemeProvider>
        </>
    )
}

export default App
