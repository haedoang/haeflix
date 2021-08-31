import React, {useEffect, useState } from "react";
import { movieApi} from '../../api';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Message from '../../Components/Message';
import styled from 'styled-components';

import Section from '../../Components/Section';
import Poster from '../../Components/Poster';



const Collections = ({ match : {params : {id}}  }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [collection, setCollection] = useState(null);

    const FetchAPI = async () => {
        try {
            const { data } = await movieApi.collections(id);
            setCollection(data);
            console.log(data);
        } catch(err){
            setError("something wroing");
        } finally {
            setLoading(false);
        }

    }

    useEffect(()=>{
        FetchAPI();
    },[])

    return (
        loading ? 
        <>
            <Helmet><title>Loading | Haeflix</title></Helmet>
            <Loader /> 
        </>
        : 
        error ? <Message text={error} color="red"/> :
        collection && 
        <Section title={collection.name}>{collection.parts.map(
            (collection, index)=>(
                <Poster key={index} 
                        id={collection.id}
                        imageUrl = {collection.poster_path}
                        title={collection.title}
                        rating={collection.vote_average}
                        year={collection.release_date && collection.release_date.substring(0,4)}
                        isMovie={true}
                />
            )
        
        )}
        </Section> 
    )
}

export default Collections;