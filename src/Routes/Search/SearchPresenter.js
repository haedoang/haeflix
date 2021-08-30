import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';

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

const SearchPresenter = ({
    tvResults,
    movieResults, 
    searchTerm,
    loading,
    error,
    handleSubmit,
    updateTerm
}) => (
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
);

SearchPresenter.propTypes = {
    tvResults : PropTypes.array, 
    movieResults : PropTypes.array,
    loading : PropTypes.bool.isRequired,
    error : PropTypes.string,
    searchTerm : PropTypes.string,
    handleSubmit : PropTypes.func.isRequired,
    updateTerm : PropTypes.func.isRequired
}

export default SearchPresenter