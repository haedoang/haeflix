import React from 'react';
import styled from 'styled-components';
import Section from '../../Components/Section';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import Poster from '../../Components/Poster';
import Helmet from 'react-helmet';
import { tvApi } from '../../api';
import { useQuery } from 'react-query';

const Container = styled.div`
    padding : 20px;
`;

const TV = () => {
    const {isLoading : loading1, isError : isError1, error : error1, data : data1, isFetching : isFetching1 } =  useQuery('topRated', tvApi.topRated);
    const {isLoading : loading2, isError : isError2, error : error2, data : data2, isFetchhing : isFetching2 } = useQuery('popular', tvApi.popular);
    const {isLoading : loading3, isError : isError3, error : error3, data : data3, isFetching : isFetching3 } = useQuery('airingToday', tvApi.airingToday);
 
    const topRated = data1?.data?.results;
    const popular = data2?.data?.results;
    const airingToday = data3?.data?.results;

    console.log('isError1',isError1);
    console.log('isError2',isError2);
    console.log('isError3',isError3);
    return (
        <>
            <Helmet>
                <title>TV | Haeflix</title>
            </Helmet>
            {loading1 || loading2 || loading3 ? <Loader/> : (
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
                    { (isError1 || isError2 || isError3) && <Message text={isError1 ? error1.message : isError2 ? error2.message : error3.message } color="red" />}
                </Container>    
                )}
        </>
    ) 
}

export default TV;