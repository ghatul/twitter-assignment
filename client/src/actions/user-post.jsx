
import UtilityService from './../common/utility.service';
import apiService from './../boxoffice/movie.service';
const SET_USER_POSTS = 'USER_POSTS'

export default class UserPostsAction {
    static setUserPosts(data) {
        return ({
            type: SET_USER_POSTS,
            payload: data,
        });
    }

    static getUserPosts() {
        return (dispatch) => {
            apiService.getUserPosts().then(res => {
                dispatch(UserPostsAction.setUserPosts(res))
            }).catch(err => {
    
            })
        }
    }

    static postInfo(postInfo) {
        return (dispatch) => {
        const userId = UtilityService.getCookie('userId')
        let obj = { postInfo: postInfo, comments: [], likes: [], userId: userId, userInfo: userId };
        apiService.createUserPosts(obj).then(res => {
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