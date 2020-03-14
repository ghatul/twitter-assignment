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
        }
        this.postInfo = this.postInfo.bind(this);
        this.onChange = this.onChange.bind(this);
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
                  {_.map(posts, item =>  (<li>{item.postInfo}</li>))}
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
    getUserPosts: () => dispatch(UserPostsAction.getUserPosts())
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserPostsComponent);