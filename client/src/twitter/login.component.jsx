
import React from 'react';
import apiService from './user-posts.service';
import { TwitterIcon } from './twitterSvg';
const _ = require('lodash');




class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isError: false,
            allFieldsAreRequired: false,
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
            this.setState({ allFieldsAreRequired: true });            
            return;
        }
        this.setState({ allFieldsAreRequired: false });            
        const obj = { userName, password };
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
        this.setState({ ...obj, allFieldsAreRequired: false, isError: false });
    }

    render() {
        const { userName, password } = this.state;
        return (
            <div className="container loginPage">
                <div className="svgHolder">
                    <TwitterIcon />
                    <h2>Log in to Twitter</h2>
                </div>
                <div className="login">
                    <form onSubmit={this.onSubmit}>
                        <div class="userName">
                            <input
                                type='text'
                                className="inputHolder"
                                value={userName}
                                name='userName'
                                placeholder="User Name"
                                onChange={this.onChange}
                            ></input>

                        </div>
                        <div>
                            <input
                                type='text'
                                className="inputHolder"
                                value={password}
                                name='password'
                                placeholder="Password"
                                onChange={this.onChange}>
                            </input>
                        </div>
                        <div className="buttonWrap">
                            <span className="register">
                                <button type='submit' onClick={this.goToRegistration}>Register</button>
                            </span>
                            <span className="submit">
                                <input type='submit' value='submit'></input>
                            </span>
                        </div>
                    </form>
                    {this.state.isError && <p className="danger-text">User name or password is incorrect</p>}
                    {this.state.allFieldsAreRequired && <p className="danger-text">All fields are required</p>}
                </div>
            </div>
        );
    }
}

export default LoginComponent;