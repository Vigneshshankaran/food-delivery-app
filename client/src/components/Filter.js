import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterPizzas } from "../actions/pizzaActions";
import { TextField, Select, MenuItem, Button, Grid, Paper, Box, Container } from '@mui/material';

export default function Filter() {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState('');
    const [category, setCategory] = useState('all');

    const handleFilter = () => {
        if (searchKey.trim() === '' && category === 'all') return;
        dispatch(filterPizzas(searchKey, category));
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Box display="flex" flexDirection="column" gap={2}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Search Pizzas"
                                value={searchKey}
                                onChange={(e) => setSearchKey(e.target.value)}
                                aria-label="Search Pizzas"
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
                            <Select
                                fullWidth
                                variant="outlined"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                aria-label="Select Category"
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
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#34c759",
                                    '&:hover': {
                                        backgroundColor: "#2a9d76"
                                    },
                                    borderRadius: 1
                                }}
                                onClick={handleFilter}
                                disabled={searchKey.trim() === '' && category === 'all'}
                            >
                                FILTER
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
