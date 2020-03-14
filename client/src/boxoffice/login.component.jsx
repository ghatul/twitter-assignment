
import React from 'react';
import apiService from './movie.service';
import io from 'socket.io-client';
const _ = require('lodash');



class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

      setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue;
      }

    onSubmit(e) {
        e.preventDefault();
        apiService.login(this.state).then(res => {
            debugger
            this.setCookie('userId', res.data.data.userId);
                this.props.history.push({
                    pathname: `/userposts`,
                });
        }).catch(err => {
            
        })
    }

    componentDidMount() {
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

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState({ ...obj });
    }

    render() {
        const { userName, password } = this.state;
        return (
            <div className="login">
                <form onSubmit={this.onSubmit}>
                    <div class="userName">
                        <lable>User ID:</lable>
                        <input
                            type='text'
                            className="user-name-input-box"
                            value={userName}
                            name='userName'
                            onChange={this.onChange}
                        ></input>

                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type='text'
                            className="user-pwd-input-box"
                            value={password}
                            name='password'
                            onChange={this.onChange}>
                        </input>
                    </div>
                    <div className="login-submit">
                        <input type='submit' value='submit'></input>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginComponent;