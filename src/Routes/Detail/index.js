import { React, useEffect, useState} from 'react';
import { movieApi, tvApi } from '../../api';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';

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


const Detail = ({ location : {pathname},  match : {  params : { id }}, history : { push }}) => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMovie, setIsMovie] = useState(pathname.includes("/movie/"));
    
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
            }
            else {
                ({ data : result } = await tvApi.tvDetail(parsedId));
                
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
                <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : requrie("../../assets/noPoster.png")} />
                <Data>
                    <Title>{result.original_title ? result.original_title : result.original_name }</Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date ? result.release_date.substring(0,4) : result.first_air_date.substring(0,4)}
                        </Item>
                        <Divider>·</Divider>
                        <Item>
                        {result.runtime ? result.runtime : result.episode_run_time} min
                        </Item>
                        <Divider>·</Divider>
                        <Item>
                        {result.genres && result.genres.map( (genre, index) => index === result.genres.length -1 ? genre.name : `${genre.name}/`)}
                        </Item>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                </Data>
            </Content>
        </Container>
    )

}

export default Detail;