import React, {useState} from 'react';
import axios from 'axios';
import { fullDate } from '../../../helpers/ActualDay';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography, TextField, Button, Alert, IconButton } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { formatDate } from '../../../helpers/FormatDate';
import CloseIcon from '@mui/icons-material/Close';

interface InfoProps {
    setPictureInfo: (params: any) => any;
}

const DaySearcher = ({setPictureInfo}: InfoProps) => {
    const {VITE_APOD_URL, VITE_API_KEY} = import.meta.env;
    const [date, setDate] = useState<Date | null>(new Date(fullDate));
    const [error, setError] = useState(false);

    const manageImageInfo = (date: Date | null) => {
        if(date){
            const dateString = formatDate(date);
            axios.get(`${VITE_APOD_URL}?date=${dateString}&api_key=${VITE_API_KEY}`)
            .then(res => {
                setPictureInfo(res.data);
            })
            .catch(err => {
                setError(true);
            });
        };
    };


    return (
        <Grid
            container
            spacing={2}
            justifyItems="end"
        >
            <Grid item xs={12}>
                <Typography
                    variant={'h6'}
                    color={'white'}
                >
                    Select a date to see the picture of the day
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {error
                    ? <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setError(false);
                                        console.log(error);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                            severity="error"
                        >
                            Error while fetching the picture of the day
                        </Alert>
                    : '' }
            </Grid>
            <Grid item xs={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        disableFuture
                        label="Pick a date"
                        value={date}
                        onChange={(newDate) => {
                            setDate(newDate);
                        }}
                        renderInput={(params) => 
                            <TextField
                                fullWidth
                                {...params}
                                sx={{
                                    svg: { color: 'white' },
                                    input: { color: 'white' },
                                    label: { color: 'white' }
                                }}
                            />
                        }
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={4} sx={{ mt: 1}}>
                <Button
                    variant="outlined"
                    onClick={() => {
                        manageImageInfo(date);
                    }}
                >
                    Search image
                </Button>
            </Grid>
        </Grid>
    );
};

export default DaySearcher;