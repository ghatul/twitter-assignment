import requestService from './request.service';

export default class UserPostService {
    static login(data) {
        let url = `http://localhost:4001/api/login`;
        return requestService.save(url, data);
    }

    static userRegistration(data) {
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

    static deleteUserPosts(postId) {
        let url = `http://localhost:4001/api/deletepost/${postId}`;
        return requestService.fetch(url).then(res => {
            return res.data;
        }).catch(err => err);
    }
}