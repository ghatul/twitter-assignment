import React from 'react';
import apiService from './movie.service';
const _ = require('lodash');


class RegistrationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            mobileNumber: '',
            password: '',
            allFieldsAreRequired: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, userName, email, mobileNumber,password } = this.state;
        if(!firstName || !lastName || !userName || !email || !mobileNumber || !password) {
            this.setState({allFieldsAreRequired: true});
            return;
        }

        this.setState({allFieldsAreRequired: false});
        const obj = { firstName, lastName, userName, email, mobileNumber,password };
        apiService.userRegistration(obj).then(res => {
            alert('Registration Succes');
            this.props.history.push({
                pathname: `/`,
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
                {this.state.allFieldsAreRequired && <p>All fields are required</p>}
            </div>
        );
    }
}

export default RegistrationComponent;