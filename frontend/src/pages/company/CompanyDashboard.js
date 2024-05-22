import { Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import StatComponent from '../../component/StatComponent'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'
import moment from 'moment'
import JobAdd from './CompanyJobAdd'
import SeekersTable from './SeekersTable';

const CompanyDashboard = () => {
    
    return (
        <>
            <JobAdd/>
            <br/>
            <hr></hr>
            <br/>
           
            <SeekersTable/>
        </>
    )
}

export default CompanyDashboard