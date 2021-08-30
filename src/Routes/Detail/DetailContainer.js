import React from 'react';
import { movieApi, tvApi } from '../../api';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {
    constructor(props){
        super(props);
        const { location : { pathname }} = props;
        this.state = {
            result : null,
            error : null,
            loading : true,
            isMovie : pathname.includes("/movie/")
        }
    }


    async componentDidMount(){
        const { 
            match : { 
                params : { id }
            },
            history : { push },
            
        } = this.props;
        const parsedId = parseInt(id);
        const { isMovie } = this.state;
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
                // data
                ({ data : result } = await tvApi.tvDetail(parsedId));
                
            }
        } catch(err){
            this.setState({
                error : "somthing wrong"
            })
        } finally {
            this.setState({
                loading : false,
                result 
            })
        }
    }
    
    render (){
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter result = {result} error = {error} loading = {loading} />
        )
    }
}