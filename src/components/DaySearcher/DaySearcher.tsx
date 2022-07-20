import React, {useState} from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fullDate } from '../../helpers/ActualDay';

const DaySearcher = () => {
    const [date, setDate] = React.useState<Date | null>(new Date(fullDate));

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
                    onClick={() => {}}
                >
                    Search image
                </Button>
            </Grid>
        </Grid>
    );
};

export default DaySearcher;