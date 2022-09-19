import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Box, Input, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const navigate=useNavigate();

    const [term, setTerm]=useState("");
    
    const submitHandler=(e)=>{
        e.preventDefault();
        navigate("/searched/"+term);
        setTerm("");
    }

    return <Box
                component="form"
                mt={4}
                mb={6}
                onSubmit={submitHandler}>
            <div>
                <Input
                    required
                    placeholder="공연을 검색하세요"
                    value={term}
                    onChange={(e)=>setTerm(e.target.value)}
                    endAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </div>
        </Box>;
};

export default Search;