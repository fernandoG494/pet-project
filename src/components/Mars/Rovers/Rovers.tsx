import React, {useState} from 'react';
import { Box, Container, CssBaseline, InputLabel, MenuItem, FormControl, Grid, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MarsImages from './MarsImages/MarsImages';


const Rovers = () => {
    const [rover, setRover] = useState('');
    
    const handleChange = (event: SelectChangeEvent) => {
        setRover(event.target.value as string);
    };

    return (
        <div>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#73777B', height: '100vh', marginTop: '13vh' }}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom className='p-white'>
                            Rover
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography gutterBottom className='p-white'>
                            Select one Rover mission to Mars to see pictures from that mission.
                        </Typography>
                    </Grid>

                    <Grid
                        container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item xs={ 12 } sm={ 3 }>
                            <div>
                                <FormControl sx={{ m: 1, minWidth: 100, mt: 3 }}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Rover</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={rover}
                                        onChange={handleChange}
                                        autoWidth
                                        label="Rover"
                                        defaultValue="curiosity"
                                    >
                                        <MenuItem value={'curiosity'}>Curiosity</MenuItem>
                                        <MenuItem value={'opportunity'}>Opportunity</MenuItem>
                                        <MenuItem value={'spirit'}>Spirit</MenuItem>
                                    </Select>
                                
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 9 }>
                            <MarsImages rover={rover}/>
                        </Grid>
                    </Grid>
                </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default Rovers;