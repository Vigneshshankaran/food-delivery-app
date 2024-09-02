import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";
import { TextField, Select, MenuItem, Button, Grid, Paper, Box } from '@mui/material';

export default function Filter() {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState('');
    const [category, setCategory] = useState('all');

    return (
        <div className='container'>
            {/* Grid container for responsiveness */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            {/* Search TextField */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Search Pizzas"
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                InputProps={{ 
                                    sx: { 
                                        borderRadius: 1, 
                                        '& .MuiOutlinedInput-root': { 
                                            '& fieldset': { 
                                                borderColor: 'rgba(0, 0, 0, 0.23)'
                                            },
                                            '&:hover fieldset': { 
                                                borderColor: '#34c759' 
                                            }
                                        }
                                    }
                                }} 
                            />
                            {/* Category Select */}
                            <Select
                                fullWidth
                                variant="outlined"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 1,
                                        '& fieldset': {
                                            borderColor: 'rgba(0, 0, 0, 0.23)'
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#34c759'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="veg">Veg</MenuItem>
                                <MenuItem value="nonveg">Non Veg</MenuItem>
                            </Select>
                            {/* Filter Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#34c759",
                                    '&:hover': {
                                        backgroundColor: "#2a9d76"
                                    },
                                    borderRadius: 1
                                }}
                                onClick={() => dispatch(filterPizzas(searchKey, category))}
                            >
                                FILTER
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}