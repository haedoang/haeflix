import { React, useEffect, useState} from 'react';
import { movieApi, tvApi } from '../../api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import { FaImdb } from 'react-icons/fa';
import { BsFillCollectionFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import MovieDetailTab from './MovieDetailTab';
import TvDetailTab from './TvDetailTab';


const Container = styled.div`
    height : calc(100vh - 50px);
    width : 100%;
    position : relative;
    padding : 50px
`;

const Backdrop = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    filter : blur(3px);
    opacity : 0.5;
    z-index : 0;
`;

const Content = styled.div`
    display : flex;
    width : 100%;
    height : 100%;
    position : relative;
    z-index : 1;
`;

const Cover = styled.div`
    width : 30%;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    height : 100%;
    border-radius : 5px
`;

const Data = styled.div`
    width : 70%;
    margin-left : 10px;
`;

const Title  = styled.div`
    font-size : 32px;
`;


const ItemContainer = styled.div`
    margin : 20px 0;
`;

const ButtonContainer = styled.div`
    margin : 20px 0`;

const Item = styled.span``;

const Divider = styled.span`
    margin : 0 10px;
`;

const Overview = styled.p`
    font-size : 12px;
    opacity : 0.7;
    line-height : 2;
    width : 50%;
`;

const ALink = styled.a`

`;

const TabContainer = styled.div``;


const Detail = ({ location : {pathname},  match : {  params : { id }}, history : { push }}) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMovie = pathname.includes("/movie/");
    
    const getImdbAddress = (imdb_id) => {
        return `https://www.imdb.com/title/${imdb_id}`;
    }
    const getDetail = async () => {
        const parsedId = parseInt(id);
        if(isNaN(parsedId)){
            return push("/")
        }
        let result = null;
        try {
            if(isMovie) {
                const request  = await movieApi.movieDetail(parsedId);
                result = request.data;
                console.log('movie,', result);
            }
            else {
                ({ data : result } = await tvApi.tvDetail(parsedId));
                console.log('tv,', result);
                
            }
            setResult(result);
        } catch(err){
            setError("somthing wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getDetail();
    },[]);


    return (
        loading ? 
        <>
            <Helmet><title>Loading | Haeflix</title></Helmet>
            <Loader /> 
        </>
        : 
        error ? <Message text={error} color="red"/> :
        <Container>
            <Helmet><title>{result.original_title ? result.original_title : result.original_name } | Haefilx</title></Helmet>
            <Backdrop bgImage={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}/>
            <Content >
                <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : require("../../assets/noPoster.png").default} />
                <Data>
                    <Title>{result.original_title ? result.original_title : result.original_name }</Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}
                        </Item>
                        <Divider>??</Divider>
                        <Item>
                            {result.runtime ? result.runtime : result.episode_run_time} min
                        </Item>
                        <Divider>??</Divider>
                        <Item>
                            {result.genres && result.genres.map( (genre, index) => index === result.genres.length -1 ? genre.name : `${genre.name}/`)}
                        </Item>
                        <Divider>??</Divider>
                    </ItemContainer>
                    <ButtonContainer>
                        {result.imdb_id && <ALink href={getImdbAddress(result.imdb_id) } target="_blank" ><FaImdb className="react-icons" size="55"/></ALink>}
                        {result.belongs_to_collection && <Link to={`/collections/${result.belongs_to_collection.id}`}><BsFillCollectionFill size="55"/></Link>}
                    </ButtonContainer>
                    <Overview>{result.overview}</Overview>
                        <TabContainer>
                           { isMovie ? <MovieDetailTab movie={result} /> : <TvDetailTab tv={result} /> }
                        </TabContainer>
                        
                </Data>
            </Content>
        </Container>
    )

}

export default Detail;