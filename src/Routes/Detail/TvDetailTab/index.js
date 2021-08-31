import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Season from '../../../Components/Season';

const Container = styled.div`
    margin : 10px 0;
`;

const Nav = styled.nav`
    display : flex;
    text-align : center;
    height : 40px;
    font-size: 16px;
    color : white;
    & : hover {
        cursor : pointer;
    }
`;

const Tab = styled.div`
    background-color: ${props => props.backgroundColor};
    width :${props => props.width};
    margin : ${props => props.margin};
    padding :${props => props.padding};

`;

const Text = styled.span`
    font-size : ${props => props.fontSize};
    font-weight : ${props => props.fontWeight};
`;

const FlexContainer = styled.div`
    display : flex;
    margin : 5px;
    height : calc(100vh - 800px);
`;

const Icon = styled.div`
    padding : 5px;
    margin : 10px;
    width : 200px;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    height : 80%;
    border : 1px solid grey;
    border-radius :15px;
`;

const ALink = styled.a`
    padding : 10px;
    margin :5px;
`;


const TvDetailTab = ({tv : {seasons}}) => {
    console.log(`seasons`, seasons)
    return <Container>
            <FlexContainer>{
                seasons.map((season, index)=>
                    <Season key={index} {...season} />     
                )}
                
            </FlexContainer>         
        </Container>


}

export default TvDetailTab;