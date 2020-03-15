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
                    <li>
                    <img src="./profile-icon.png    " alt="Smiley face" height="15" width="15"></img>
                    <span>@{item.userInfo.userName} </span>
                    <p>{item.commentInfo}</p>
                    </li>
                    ))}
                    <li>
                        <input name='commentInfo'
                            value={this.state.commentInfo}
                            onChange={this.onChange}
                        ></input>
                        <button onClick={() => this.postComment(post._id)}>post</button>
                    </li>
                </ul>
            )
        } else {
            return <><li> <input name='commentInfo'
                value={this.state.commentInfo}
                onChange={this.onChange}
            ></input>
                <button onClick={() => this.postComment(post._id)}>post</button></li>
            </>;
        }
    }

    render() {
        const { posts } = this.props;  
        return (
            <div>
                <div>
                    <label>Write Your</label>
                    <input name='postInfo'
                        onChange={this.onChange}
                        value={this.state.postInfo}
                    ></input>
                    <button onClick={this.postInfo}>post</button>
                </div>
                <div>
                 <ul>
                  {_.map(posts, item =>  (<><li>
                  <img src="./profile-icon.png    " alt="Smiley face" height="42" width="42"></img>
                  <span>{item.userInfo.firstName} {item.userInfo.lastName} </span>
                  <span>@{item.userInfo.userName}</span>
                    <p>{item.postInfo}</p>
                    <button onClick={() => this.deletePost(item._id)}>delete</button>
                  </li>
                  <li>
                {this.showComments(item)}
                  </li>
                  </>))}
                  </ul>
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