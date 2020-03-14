import requestService from './request.service';

export default class MovieService {
    static login(data) {
        let url = `http://localhost:4001/api/login`;
        return requestService.save(url, data);
    }

    static userRegistration(data) {
        debugger
        let url = 'http://localhost:4001/api/registration';
        return requestService.save(url, data).then(res => {
            return res.data;
        }).catch(err => err);
    }

    static createUserPosts(data) {
        let url = 'http://localhost:4001/api/createPost';
        return requestService.save(url, data).then(res => {
            return res.data;
        }).catch(err => err);
    }

    static updateUserPosts(data, postId) {
        debugger
        let url = `http://localhost:4001/api/updatepost/${postId}`;
        return requestService.save(url, data).then(res => {
            return res.data;
        }).catch(err => err);
    }

    static getUserPosts() {
        let url = 'http://localhost:4001/api/userpost';
        return requestService.fetch(url).then(res => {
            return res.data;
        }).catch(err => err);
    }


    static searchMovies(title) {
        let url = `https://www.omdbapi.com?i=tt3896198&apikey=2933c48b&type=movie&r=json&s=${title}`;
        return requestService.fetch(url).then(res => {
            if(res.data && res.data.Response === 'True' && res.data.Search) {
                return res.data;
            } else {
                return {Search:[]};
            }
        }).catch(err => err);
    }

    static getMovie(id) {
        console.log(id);
        let url = `https://www.omdbapi.com?i=${id}&apikey=2933c48b&type=movie&r=json`;
        return requestService.fetch(url).then(res => {
           return res.data;
        }).catch(err => err);
    }
}