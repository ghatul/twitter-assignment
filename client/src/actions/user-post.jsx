import UtilityService from './../common/utility.service';
import apiService from './../boxoffice/movie.service';
import store from '../store/store-config';
const _ = require('lodash');
const SET_USER_POSTS = 'USER_POSTS';
const INSERT_USER_POSTS = 'INSERT_USER_POSTS';


export default class UserPostsAction {

    static setUserPosts(data) {
        return ({
            type: SET_USER_POSTS,
            payload: data,
        });
    }

    static insertPost(posts) {
        return ({
            type: INSERT_USER_POSTS,
            payload: posts,
        });
    }

    static insertCommentToPost(postId, resPost) {
        const posts = store.getState().userReducer.posts || [];
        const index = _.findIndex(posts, {_id: postId});
        posts[index] = resPost;
        debugger
        UserPostsAction.insertPost(posts);
    }

    static getUserPosts() {
        return (dispatch) => {
            apiService.getUserPosts().then(res => {
                dispatch(UserPostsAction.setUserPosts(res))
            }).catch(err => {
    
            })
        }
    }

    static addComment(res) {
        return (dispatch) => {
            const userPosts = store.getState().userReducer.posts || [];
            const posts = _.cloneDeep(userPosts);
            const index = _.findIndex(posts, { _id: res._id });
            posts[index] = res;
            dispatch(UserPostsAction.setUserPosts(posts));
        }
    }

    static postInfo(postInfo) {
        return (dispatch) => {
        const userId = UtilityService.getCookie('userId')
        let obj = { postInfo: postInfo, comments: [], likes: [], userId: userId, userInfo: userId };
        apiService.createUserPosts(obj).then(res => {
               //dispatch(UserPostsAction.insertPost(res))
        }).catch(err => {

        })
    }
    }

    static updateUserPosts(postId, commentInfo) {
        return (dispatch) => {
        const userId = UtilityService.getCookie('userId')
        let obj = { commentInfo: commentInfo, comments: [], likes: [], userId: userId, userInfo: userId };
        apiService.updateUserPosts(obj, postId).then(res => {
        }).catch(err => {
        })
      }
    }

}