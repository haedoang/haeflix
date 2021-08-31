import styled from 'styled-components';

const Container = styled.div`
    
`;

const Text = styled.span``;

const Poster = styled.div`
    margin : 10px;
    pading : 10px;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    width :200px;
    height:100px;
`;

const TextContainer = styled.div`
    padding : 10px;
`;

const Season = ({air_date,id, name,poster_path, overview}) => {

    console.log(air_date, id, name, poster_path, overview)
    return (
        <Container >
            <Poster bgImage={poster_path ? `https://image.tmdb.org/t/p/original/${poster_path}` : require("../assets/noPoster.png").default}/>
            <TextContainer>
                <Text>{name}</Text>
                <Text>/</Text>
                <Text>{air_date}</Text>
            </TextContainer>
        </Container>
    )
}

export default Season;