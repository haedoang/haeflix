import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Container = styled.div`
    font-size: 12px;
`;


const Rating = styled.span`
    bottom : 5px;
    right : 5px;
    position : absolute;
    opacity : 0;
`;

const Image = styled.div`
    height : 200px;
    background-size :cover;
    border-radius : 4px;
    background-position : center center;
    background-image : url(${props => props.bgUrl});
    transition : opacity 0.1s ease-in-out;
`;

const ImageContainer = styled.div`
    margin-bottom : 5px;
    &:hover {
        ${Image} {
            opacity : 0.3;
        }
        ${Rating} {
            opacity : 1;
        }
    }
    position : relative;
`;


const Title = styled.span`
    display : block;
    font-size : 12px;
    margin-bottom : 3px;
`;

const Year = styled.span`
    color :rgba(255,255,255,0.5);
`;



const Poster = ({id, imageUrl, title, rating, year, isMovie }) => (
    <Link to={isMovie ? `/movie/${id}` : `/tv/${id}`} result={this}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/w300/${imageUrl}` : require('../assets/noPoster.png').default}/>
                <Rating><span role="img" aria-label="rating">⭐️</span>{" "} {rating}/10</Rating>
            </ImageContainer>
            <Title>{title.length > 15 ? `${title.substring(0,15)}...` : title }</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
)


Poster.propTypes = {
    id : PropTypes.number.isRequired,
    imageUrl : PropTypes.string,
    title : PropTypes.string.isRequired,
    rating : PropTypes.number,
    year : PropTypes.string,
    isMovie : PropTypes.bool
}

export default Poster;