import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const CardElement = ({ jobTitle, description, category, location, id, applicationStatus, showStatusButton, jobTime }) => {
    const { palette } = useTheme();
    const [showStatus, setShowStatus] = React.useState(false);
    const locationObject = useLocation();

    const handleStatusToggle = () => {
        setShowStatus(!showStatus);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'blue';
            case 'accepted':
                return 'green';
            case 'rejected':
                return 'red';
            default:
                return '#5ac8fa'; // default to pending color if status is unknown
        }
    };

    return (
        <Card sx={{ minWidth: 275, mb: 3, mt: 3 }}>
            <CardContent>
                <Typography sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }} gutterBottom>
                    <IconButton><LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} /></IconButton> {location}
                </Typography>
                <Typography variant="h5" component="div">
                    {jobTitle}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {category}
                </Typography>
                <Typography variant="body2">
                    Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
                </Typography>
                {showStatus && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <h3 style={{ background: getStatusColor(applicationStatus), width: "230px" ,color:"whitesmoke"}}>
                            Application Status: {applicationStatus}
                        </h3>
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                {locationObject.pathname !== '/user/jobs' && (
                    <Button
                        disableElevation
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                    >
                        <Link
                            style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
                            to={`/job/${id}`}
                        >
                            More Details
                        </Link>
                    </Button>
                )}
                {showStatusButton && (
                    <Button onClick={handleStatusToggle} variant="outlined" size="small">
                        {showStatus ? 'Hide Status' : 'Show Status'}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default CardElement;
