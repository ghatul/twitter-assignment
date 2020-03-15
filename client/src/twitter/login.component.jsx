
import React from 'react';
import apiService from './user-posts.service';
const _ = require('lodash');



class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isError: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.goToRegistration = this.goToRegistration.bind(this);
    }

    setCookie(cname, cvalue) {
        document.cookie = cname + "=" + cvalue;
    }

    onSubmit(e) {
        const { userName, password } = this.state;
        e.preventDefault();
        if (!userName || !password) {
            return;
        }
        const obj = { userName, password};
        apiService.login(obj).then(res => {
            this.setState({ isError: false });
            this.setCookie('userId', res.data.data.userId);
            this.props.history.push({
                pathname: `/userposts`,
            });
        }).catch(err => {
            this.setState({ isError: true });
        })
    }

    componentDidMount() {
    }

    goToRegistration() {
        this.props.history.push('/registration');
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
                    <div>
                        <span className="login-submit">
                            <button type='submit' onClick={this.goToRegistration}>Register</button>
                        </span>
                        <span className="login-submit">
                            <input type='submit' value='submit'></input>
                        </span>
                    </div>
                </form>
                {this.state.isError && <p>User name or password is incorrect</p>}
            </div>
        );
    }
}

export default LoginComponent;