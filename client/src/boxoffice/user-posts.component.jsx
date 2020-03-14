import React from 'react';
import { connect } from 'react-redux';
import UserPostsAction from './../actions/user-post';
import io from 'socket.io-client';
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
    }

    componentDidMount() {
        this.props.getUserPosts();

        var socket = io.connect('ws://127.0.0.1:4001');
        socket.on('some event', (data) => {
           // alert('data');
        })

        socket.on('connect', function (socket) {
           // alert('Connected!');
        });

        socket.on('chat message', function (socket) {
            alert('chat message!');
        });

        socket.on('messages', function (socket) {
            alert('socket');
        });

        socket.on('connect_error', (err) => {
            console.log('socket connected error --> ' + err);
        })

        socket.emit('chat message', { message: 'ffddf' });
    }

    postInfo() {
        this.props.postInfo(this.state.postInfo);
    }

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState({ ...obj });
    }

    postComment(postId) {
        debugger
        this.props.postComment(postId, this.state.commentInfo);
    }

    showComments(post) {
        if (post.comments.length) {
            return (
                <ul>{_.map(post.comments, item => (
                    <li>{item.commentInfo}</li>))}
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
    postComment: (id, commentInfo) => dispatch(UserPostsAction.updateUserPosts(id, commentInfo))
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserPostsComponent);