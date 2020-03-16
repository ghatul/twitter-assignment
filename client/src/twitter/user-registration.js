import React from 'react';
import apiService from './user-posts.service';
import { TwitterIcon } from './twitterSvg';
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
        const { firstName, lastName, userName, email, mobileNumber, password } = this.state;
        if (!firstName || !lastName || !userName || !email || !mobileNumber || !password) {
            this.setState({ allFieldsAreRequired: true });
            return;
        }

        this.setState({ allFieldsAreRequired: false });
        const obj = { firstName, lastName, userName, email, mobileNumber, password };
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
        this.setState({ ...obj, allFieldsAreRequired: false });
    }

    render() {
        const { firstName, lastName, userName, email, mobileNumber, password } = this.state;
        return (
            <>
                <div className="container loginPage">
                    <div className="svgHolder">
                        <TwitterIcon />
                        <h2>Create your account</h2>
                    </div>
                    <div className="login">
                        <form onSubmit={this.onSubmit}>
                            <div class="userName">
                                <input
                                    type='text'
                                    className="inputHolder"
                                    value={firstName}
                                    name='firstName'
                                    placeholder="Firstname"
                                    onChange={this.onChange}
                                ></input>
                            </div>
                            <div class="userName">
                                <input
                                    type='text'
                                    className="inputHolder"
                                    value={lastName}
                                    name='lastName'
                                    placeholder="Lastname"
                                    onChange={this.onChange}
                                ></input>
                            </div>
                            <div class="userName">
                                <input
                                    type='text'
                                    className="inputHolder"
                                    value={userName}
                                    name='userName'
                                    placeholder="Username"
                                    onChange={this.onChange}
                                ></input>
                            </div>
                            <div class="userName">
                                <input
                                    type='email'
                                    className="inputHolder"
                                    value={email}
                                    name='email'
                                    placeholder="Email Id"
                                    onChange={this.onChange}
                                ></input>
                            </div>
                            <div class="userName">
                                <input
                                    type='number'
                                    className="inputHolder"
                                    value={mobileNumber}
                                    name='mobileNumber'
                                    placeholder="Mobile Number"
                                    onChange={this.onChange}
                                ></input>
                            </div>
                            <div class="userName">
                                <input
                                    type='text'
                                    className="inputHolder"
                                    value={password}
                                    name='password'
                                    placeholder="Password"
                                    onChange={this.onChange}
                                ></input>
                            </div>
                            <div className="buttonWrap">
                                <span className="submit">
                                    <input type='submit' value='submit'></input>
                                </span>
                            </div>
                        </form>
                    </div>
                    {this.state.allFieldsAreRequired && <p className="danger-text">All fields are required</p>}
                </div>
            </>
        );
    }
}

export default RegistrationComponent;