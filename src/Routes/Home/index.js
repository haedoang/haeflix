import React,{ useState, useEffect } from "react";
import { movieApi } from '../../api.js';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Poster from '../../Components/Poster';
import Section from '../../Components/Section';

const Container = styled.div`
    padding : 20px;
`;

const Home = () => {
    const [nowPlaying, setNowPlaying] = useState(null);
    const [upcoming, setUpcoming] = useState(null);
    const [popular, setPopular] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAPI = async () => {
        try {
            const {data : { results : nowPlaying}} = await movieApi.nowPlaying();
            const {data : { results : upcoming}} = await movieApi.upcoming();
            const {data : { results : popular}} = await movieApi.popular();
            setNowPlaying(nowPlaying);
            setUpcoming(upcoming);
            setPopular(popular);
        } catch(err){
            setError("Can't get information");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchAPI();
    },[])

    return (
        
            loading ? <>
                        <Helmet><title>Loading | Haeflix</title></Helmet>
                        <Loader /> 
                    </> 
         : <>
            <Helmet>
                 <title>Movies | Haeflix</title>
            </Helmet>
            <Container>
                 {
                   nowPlaying &&
                   nowPlaying.length > 0 && 
                   (
                       <Section title="Now Playing">
                           {
                               nowPlaying.map(movie => 
                                   <Poster key={movie.id} 
                                           id={movie.id}
                                           imageUrl = {movie.poster_path}
                                           title={movie.original_title}
                                           rating={movie.vote_average}
                                           isMovie={true}
                                           year={movie.release_date && movie.release_date.substring(0,4)}

                                   />)
                           }
                       </Section>
                   )
               }
               {upcoming && upcoming.length > 0 && (
                   <Section title="Upcoming Movie">
                       {
                           upcoming.map(movie => 
                               <Poster key={movie.id} 
                                       id={movie.id}
                                       imageUrl = {movie.poster_path}
                                       title={movie.original_title}
                                       rating={movie.vote_average}
                                       isMovie={true}
                                       year={movie.release_date && movie.release_date.substring(0,4) }
                               />)
                       }
                   </Section>  
               )
               }
               {popular && popular.length > 0 && (
                   <Section title="Popular Movie">
                   {
                       popular.map(movie => 
                           <Poster key={movie.id} 
                                   id={movie.id}
                                   imageUrl = {movie.poster_path}
                                   title={movie.original_title}
                                   rating={movie.vote_average}
                                   isMovie={true}
                                   year={movie.release_date && movie.release_date.substring(0,4)}

                           />)
                   }
               </Section>
                   ) } 
               { error && <Message text={error} color="red"/> } 
 
            </Container>
        </> 
    )
       
}

export default Home;