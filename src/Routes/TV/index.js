import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Section from '../../Components/Section';
import Poster from '../../Components/Poster';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Helmet from 'react-helmet';
import { tvApi } from '../../api';

const Container = styled.div`
    padding : 20px;
`;

const TV = () => {
    const [topRated, setTopRated] = useState(null);
    const [popular, setPopular] = useState(null);
    const [airingToday, setAiringToday] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAPI = async () => {
        try {
            const {data : {results : topRated}} = await tvApi.topRated();
            const {data : {results : popular}} = await tvApi.popular();
            const {data : {results : airingToday}} = await tvApi.airingToday();
            setTopRated(topRated);
            setPopular(popular);
            setAiringToday(airingToday);
        } catch(error){
            setError("something wrong..")
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchAPI();
    }, []);

    return (
        <>
            <Helmet>
                <title>TV | Haeflix</title>
            </Helmet>
            {loading ? <Loader/> : (
                <Container>
                    
                    {topRated && topRated.length > 0 && (
                        <Section title="Top Rated Show">
                            {
                                topRated.map(
                                    tv => (
                                        <Poster key={tv.id} 
                                                id={tv.id}
                                                imageUrl = {tv.poster_path}
                                                title={tv.original_name}
                                                rating={tv.vote_average}
                                                year={tv.first_air_date && tv.first_air_date.substring(0,4) }
                                        />
                                    )
                                )
                            }
                            
                        </Section>)}
                    {popular && popular.length > 0 && (
                        <Section title="Popular Show">{popular.map(
                            tv=>(
                                <Poster key={tv.id} 
                                        id={tv.id}
                                        imageUrl = {tv.poster_path}
                                        title={tv.original_name}
                                        rating={tv.vote_average}
                                        year={tv.first_air_date && tv.first_air_date.substring(0,4) }
                                />
                            )
                        
                        )}</Section>) }
                    {airingToday && airingToday.length > 0 && (
                        <Section title="AiringToday">
                            {airingToday.map(
                                tv => (
                                    <Poster key={tv.id} 
                                        id={tv.id}
                                        imageUrl = {tv.poster_path}
                                        title={tv.original_name}
                                        rating={tv.vote_average}
                                        year={tv.first_air_date && tv.first_air_date.substring(0,4) }
                                    />)  
                            
                            )}</Section>)}
                    { error && <Message text={error} color="red" />}
                </Container>    
                )}
        </>
    ) 
}

export default TV;