import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import UserPostsAction from './../actions/user-post';
const _ = require('lodash');


class UserPostsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: '',
            commentInfo: '',
        }
        this.postInfo = this.postInfo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.postComment = this.postComment.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this.props.getUserPosts();
        //const socket = SocketConnection.getIO();
        const socket = io.connect('ws://127.0.0.1:4001');

        socket.on('connect', (socket) => {
            //alert('Connected!');
        });

        socket.on('user post', (res) => {
            this.props.insertPost(res)
        });

        socket.on('update post', (res) => {
            this.props.addComment(res)
        });

        socket.on('delete post', (res) => {
            this.props.deletePost(res.postId)
        });
    }

    postInfo() {
        this.props.postInfo(this.state.postInfo);
        this.setState({postInfo: ''});
    }

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState({ ...obj });
    }

    postComment(postId) {
        this.props.postComment(postId, this.state.commentInfo);
        this.setState({commentInfo: ''});
    }

    deletePost(postId) {
        debugger
        this.props.deleteUserPosts(postId);
    }

    showComments(post) {
        if (post.comments.length) {
            return (
                <ul>{_.map(post.comments, item => (
                    <li className="userInfoList postComment clearfix">
                        <div className="userImg">
                            <img src="./profile-icon.png" alt="Smiley face" height="15" width="15"></img>
                        </div>
                        <div className="userInfo">
                            <div>@{item.userInfo.userName} <span className="userEmail">{item.created_on}</span> </div> 
                            <div className="userEmail"> Replying to @{post.userInfo.userName} </div>
                            <div className="userPostInfo">
                                <p>{item.commentInfo}</p> 
                            </div>
                        </div>
                    </li>
                    ))}
                    <li className="userInfoList postComment clearfix">
                        <input name='commentInfo'
                            className="formControl"
                            value={this.state.commentInfo}
                            onChange={this.onChange}
                        ></input>
                        <button onClick={() => this.postComment(post._id)} className="btn btnSuccess">Replay</button>
                    </li>
                </ul>
            )
        } else {
            return <ul><li className="userInfoList postComment clearfix"> 
            <input className="formControl" name='commentInfo'
                value={this.state.commentInfo}
                onChange={this.onChange}
            ></input>
                <button className="btn btnSuccess" onClick={() => this.postComment(post._id)}>Replay</button></li>
            </ul>;
        }
    }

    render() {
        const { posts } = this.props;  
        return (
            <div className="container">
                <div className="wrapper">
                    <div className="writePostWrapper">
                        <label>Write Your</label>
                        <input name='postInfo'
                            className="formControl"
                            onChange={this.onChange}
                            value={this.state.postInfo}
                        ></input>
                        <button onClick={this.postInfo} className="btn btnSuccess">Post</button>
                    </div>
                    <div className="userPostWrapper">
                        <ul>
                            {_.map(posts, item =>  (<>
                            <li className="userInfoList clearfix">
                                <div className="userImg">
                                    <img src="./profile-icon.png" alt="Smiley face" height="42" width="42"></img>
                                </div>
                                <div className="userInfo">
                                    <div className="userName">
                                        {item.userInfo.firstName} {item.userInfo.lastName} 
                                    </div>
                                    <div className="userEmail">@{item.userInfo.userName}</div>
                                    <div className="userPostInfo">
                                        <p>{item.postInfo}</p>
                                        <p className="userEmail">{item.created_on}</p>
                                    </div>
                                    <button onClick={() => this.deletePost(item._id)} className="btn btnDanger">Delete</button>
                                </div>
                            </li>
                            <li>
                                {this.showComments(item)}
                            </li>
                            </>))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.userReducer.posts || [],
  });
  
  const mapDispatchToProps = dispatch => ({
    postInfo: (info) => dispatch(UserPostsAction.postInfo(info)),
    getUserPosts: () => dispatch(UserPostsAction.getUserPosts()),
    postComment: (id, commentInfo) => dispatch(UserPostsAction.updateUserPosts(id, commentInfo)),
    insertPost:(res) => dispatch(UserPostsAction.insertPost(res)),
    addComment:(res) => dispatch(UserPostsAction.addComment(res)),
    deleteUserPosts:(postId) => dispatch(UserPostsAction.deleteUserPosts(postId)),
    deletePost:(res) => dispatch(UserPostsAction.deletePost(res)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserPostsComponent);