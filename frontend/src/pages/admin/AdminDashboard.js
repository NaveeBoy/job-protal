import { Box, Stack, Typography } from '@mui/material';
import StatComponent from '../../component/StatComponent';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import { Chart } from "react-google-charts";
import { data, options } from './data/data'
import ChartComponent from '../../component/ChartComponent';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import  {jobAllLoadAction} from '../../redux/actions/jobAction';
import {allUserAction} from '../../redux/actions/userAction';



const AdminDashboard = () => {

        // Access the total count of job types from the Redux store

        const {total: totalJobTypes} = useSelector((state) => state.jobTypeAll);
        const {total:totalJobs} = useSelector((state)=>state.alljobs);
        const {total:totalUsers} = useSelector((state)=>state.allUsersDash);

         // Dispatch the action to load job types when the component mounts
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(jobTypeLoadAction());
            dispatch(jobAllLoadAction());
            dispatch(allUserAction());
        }, [dispatch]);

    fetch('/api/allusers')
    .then(response => response.json())
    .then(data => {
        const count = data.count;
        // Get the <h1> element by its ID or any other selector
        const pElement = document.getElementById('countHeader');
        // Set the count value as the inner HTML content of the <h1> element
        pElement.innerHTML = `${count}`;
    })
    .catch(error => console.error('Error:', error));

    return (
        <>
            <Box>
                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    Dashboard
                </Typography>
                <Stack
                    direction={{ xs: 'column', sm: 'row',ml:3 }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >

                    <StatComponent
                        value= {<p id="countHeader"></p>}
                        icon={<SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Users"
                        money=''
                    />
                    <StatComponent
                        value={<p>{totalJobs}</p>}
                        icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs"
                        money=''
                    />
                    <StatComponent
                        value={<p>{totalJobTypes}</p>}
                        icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
                        description="Jobs categories"
                        money=''
                    />

                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3 }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}>
                    <ChartComponent>
                        <Chart
                            chartType="Bar"
                            data={data}
                            options={options}
                            width="100%"
                            height="300px"
                            legendToggle
                        />
                    </ChartComponent>
                </Stack>

            </Box>
        </>
    )
}

export default AdminDashboard