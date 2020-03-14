import React from 'react';
import apiService from './movie.service';
var axios = require("axios")
const _ = require('lodash');

var CancelToken = axios.CancelToken;
var call1 = CancelToken.source();



class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fisrtName: '',
            lastName: '',
            userName: '',
            email: '',
            mobileNumber: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        apiService.userRegistration(this.state).then(res => {
            this.props.history.push({
                pathname: `/dashboard`,
            });
        }).catch(err => {
            //console.log(err);
        })
    }

    componentDidMount() {
    }

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState({ ...obj });
    }

    render() {
        const { firstName, lastName, userName, email, mobileNumber, password } = this.state;
        return (
            <div className="login">
                <form onSubmit={this.onSubmit}>
                    <div class="userName">
                        <lable>firstName:</lable>
                    <input
                                type='text'
                                className="user-name-input-box"
                                value={firstName}
                                name='firstName'
                                onChange={this.onChange}
                            ></input>
                        
                    </div>
                    <div class="userName">
                        <lable>lastName:</lable>
                    <input
                                type='text'
                                className="user-name-input-box"
                                value={lastName}
                                name='lastName'
                                onChange={this.onChange}
                            ></input>
                        
                    </div>
                    <div class="userName">
                        <lable>lastName:</lable>
                    <input
                                type='text'
                                className="user-name-input-box"
                                value={userName}
                                name='userName'
                                onChange={this.onChange}
                            ></input>
                        
                    </div>
                    <div class="userName">
                        <lable>email:</lable>
                    <input
                                type='text'
                                className="user-name-input-box"
                                value={email}
                                name='email'
                                onChange={this.onChange}
                            ></input>
                        
                    </div>
                    <div class="userName">
                        <lable>mobileNumber:</lable>
                    <input
                                type='text'
                                className="user-name-input-box"
                                value={mobileNumber}
                                name='mobileNumber'
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

export default RegistrationComponent;