import axios from 'axios';
// /tv/{tv_id}?api_key=5df5d1f65a512c6b7c4efaacba967725&language=en-US
const api = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    params : {
        api_key : "5df5d1f65a512c6b7c4efaacba967725",
        language : "en-US"
    }
});

export const movieApi = {
    nowPlaying : () => api.get('movie/now_playing'),
    upcoming : () => api.get("movie/upcoming"),
    popular : () => api.get("movie/popular"),
    movieDetail : id => api.get(`movie/${id}`,{
        params : { 
            append_to_response : "videos",
        }
    }),
    search : term => api.get("search/movie",{
        params : {
            query : encodeURIComponent(term)
        }
    }),
    collections : id => api.get(`collection/${id}`)
}

export const tvApi = {
    topRated : () => api.get("tv/top_rated"),
    popular : () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    tvDetail : id => api.get(`tv/${id}`,{
        params : { 
            append_to_reponse : "videos"
        }
    }),
    search : term => api.get("search/tv",{
        params : {
            query : encodeURIComponent(term)
        }
    })
}