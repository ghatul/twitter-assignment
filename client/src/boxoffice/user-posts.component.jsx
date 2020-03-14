import React from 'react';
import { connect } from 'react-redux';
import UserPostsAction from './../actions/user-post';
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
        return (
            <div>
               <label>Write Your</label>
               <input name='postInfo'
               onChange={this.onChange} 
               value={this.state.postInfo} 
               ></input>
               <button onClick={this.postInfo}>post</button>
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