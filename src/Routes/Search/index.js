import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';
import { movieApi, tvApi } from '../../api';

const Container = styled.div`
    padding : 20px;
`;

const Form = styled.form`
    margin-bottom : 50px;
    width : 100%
`;

const Input = styled.input`
    all : unset;
    font-size : 28px;
    width : 100%;
`;



const Search = () => {;
    const [movieResults ,setMovieResults] = useState(null);        
    const [tvResults ,setTvResults] = useState(null);    
    const [searchTerm ,setSearchTerm] = useState("");    
    const [loading ,setLoading] = useState(false);    
    const [error, setError] = useState(null);    

    const handleSubmit = (event) => {
        event.preventDefault();
        if(searchTerm !== ""){
            searchByTerm();
        }
    }

    const updateTerm = (event) => {
        const { target : { value } } = event;
        setSearchTerm(value);
    }

    const searchByTerm = async () => {
        try {
            setLoading(true);
            const { data : {results : movieResults}} = await movieApi.search(searchTerm);
            const { data : {results : tvResults}} = await tvApi.search(searchTerm);
            setTvResults(tvResults);
            setMovieResults(movieResults);
        } catch(error){
            setError("cannot find results");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>  
            <Helmet><title>Search | Haeflix</title></Helmet>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Input placeholder="Search Movies or TV Show..." value={searchTerm} onChange={updateTerm}/> 
                </Form>
                { 
                    loading ? <Loader/> :
                        <>
                            {movieResults && movieResults.length > 0 &&
                            
                                <Section title="Movie Results">
                                    {movieResults.map(movie =>
                                        <Poster key={movie.id} 
                                            id={movie.id}
                                            imageUrl = {movie.poster_path}
                                            title={movie.original_title}
                                            rating={movie.vote_average}
                                            isMovie={true}
                                            year={movie.release_date && movie.release_date.substring(0,4) }
                                        />
                                    )}</Section>}
                            {tvResults && tvResults.length > 0 && <Section title="TV Results">{tvResults.map(tv => 
                                    <Poster key={tv.id} 
                                            id={tv.id}
                                            imageUrl = {tv.poster_path}
                                            title={tv.original_name}
                                            rating={tv.vote_average}
                                            year={tv.first_air_date && tv.first_air_date.substring(0,4) }
                                    />
                                    )}</Section>}
                            {error && <Message text={error} color="red" />}
                            {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && <Message text="nothing found" color="yellow">{tvResults}</Message>}
                        </> 
                    }
            </Container>
        </>
    )


}

export default Search;