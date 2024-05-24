import { Card, CardContent, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import LoadingBox from '../component/LoadingBox';
import Navbar from '../component/Navbar';
import { jobLoadSingleAction } from '../redux/actions/jobAction';
import Button from '@mui/material/Button';
import { userApplyJobAction } from '../redux/actions/userAction';

const SingleJob = () => {
    const dispatch = useDispatch();
    const { singleJob, loading } = useSelector(state => state.singleJob);
    const { id } = useParams();
    const [cv, setCv] = useState(null); // State to handle CV upload

    useEffect(() => {
        dispatch(jobLoadSingleAction(id));
    }, [dispatch, id]);

    const applyForAJob = () => {
        if (!cv) {
            alert("Please select a CV to upload");
            return;
        }
        dispatch(userApplyJobAction({
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location
        }, cv));
    };

    return (
        <>
            <Box sx={{ bgcolor: "#fafafa" }}>
                <Navbar />
                <Box sx={{ height: '85vh' }}>
                    <Container sx={{ pt: '30px' }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                        >
                            <Box sx={{ flex: 4, p: 2 }}>
                                {loading ? <LoadingBox /> :
                                    <Card>
                                        <CardContent>
                                            <Typography variant="h5" component="h3">
                                                {singleJob && singleJob.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Salary</Box>: Rs. {singleJob && singleJob.salary} /=
                                            </Typography>
                                            <Typography variant="body2">
                                                <Box component="span" sx={{ fontWeight: 700 }}>Location</Box>: {singleJob && singleJob.location}
                                            </Typography>
                                            <Typography variant="body2" sx={{ pt: 2 }}>
                                                {singleJob && singleJob.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                }
                            </Box>
                            <Box sx={{ flex: 1, p: 2 }}>
                            <Card sx={{ p: 2 }}>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        id="cv-upload"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setCv(e.target.files[0])}
                                    />
                                    <label htmlFor="cv-upload">
                                        <Button
                                            component="span"
                                            sx={{
                                                background: "#3498db",
                                                borderRadius: "10px",
                                                height: "30px",
                                                color: "white",
                                                fontSize: "13px",
                                                '&:hover': {
                                                    backgroundColor: "#2980b9"
                                                }
                                            }}
                                            variant="contained"
                                        >
                                            Upload Your CV
                                        </Button>
                                    </label>
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {cv ? cv.name : "No file chosen"}
                                    </Typography>
                                    <Button
                                        onClick={applyForAJob}
                                        sx={{ fontSize: "13px", marginTop: "10px" }}
                                        variant="contained"
                                    >
                                        Apply for this Job
                                    </Button>
                                </Card>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default SingleJob;
