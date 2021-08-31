import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {SiYoutube} from 'react-icons/si';


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
    width : 350px;
    background-image : url(${props => props.bgImage});
    background-position : center;
    background-size : cover;
    height : 150px;
    border : 1px solid grey;
    border-radius :10px;
`;

const ALink = styled.a`
    padding : 10px;
    margin :5px;
`;


const getYoutubeUrl = (key) => {
    return `https://www.youtube.com/watch?v=${key}`;
}
const useTab = (initialTab, video, production_company, production_country ) => {
    const allTabs = [{title : "Videos", content : [...video]}, {title: "Production Info", content : {company : production_company, country : production_country }}];
    const [tabIndex, setTabIndex] = useState(initialTab, allTabs);

    const handleChangeTab = (index) => setTabIndex(index);

    return { tabIndex, content : allTabs[tabIndex].content, allTabs, handleChangeTab }
}




const MovieDetailTab = ({movie}) => {
    console.log(movie);
    const {tabIndex, content, allTabs, handleChangeTab } = useTab(0, movie.videos.results, movie.production_companies, movie.production_countries);

    console.log(tabIndex, content, allTabs)

    
    return <Container>
            <Nav>
                { allTabs.map((tab,index)=> <Tab key={index} width="100%" margin="1px 0px" padding="10px"  onClick={() => handleChangeTab(index)}
                              backgroundColor={tabIndex === index ? "#b2bec3" : "transparent"}
                    ><Text fontSize="14px" fontWeight="700">{tab.title}</Text></Tab>)}
            </Nav>
            <Container>
                {
                    tabIndex === 0 ? <>
                                        {
                                            content.map((x)=>
                                                // <iframe width="923" height="673" src={``} 
                                                //     frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>                                           
                                                // </iframe>

                                                <ALink href={getYoutubeUrl(x.key)} target="_blank"><SiYoutube size="55"/></ALink>
                                            )
                                        
                                        }
                                        
                                     </>
                                    : <>
                                       <FlexContainer>
                                           {
                                               content.company.map((c,index)=><Icon key={index} bgImage={c.logo_path ? `https://image.tmdb.org/t/p/w300/${c.logo_path}` : ""}/>)
                                           }
                                        </FlexContainer> 
                                        <Container>
                                            {
                                               content.country.map((c,index)=>
                                               <img key={index} src={`https://www.countryflags.io/${c.iso_3166_1}/shiny/32.png`}/>)
                                           }
                                        </Container>
                                    </>

                }
            </Container>
        </Container>


}

export default MovieDetailTab;