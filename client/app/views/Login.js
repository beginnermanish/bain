import React, { Component } from 'react';
import api from '../../utils/api';
import axios from 'axios';
import { debug } from 'util';
import swal from 'sweetalert2';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isLoading: false
        }
    }

    componentDidMount() {
        localStorage.clear();
    }

    dologin() {
        var me = this;
        axios.post(api.login, {
            email: this.state.email,
            password: this.state.password
        })
            .then(function (response) {
                var data = response.data;
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    me.props.history.push('/search');
                } else {
                    swal('Login failed', 'Username or Password is incorrect', 'error')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        let { email, password } = this.state;
        return (
            <div className="ui middle aligned center aligned grid" style={{ padding: '10% 0' }}>
                <div className="column" style={{ maxWidth: 450 }}>
                    <h2 className="ui teal image header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input type="text" name="email" placeholder="E-mail address" onChange={this.onChange.bind(this)} value={email} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="password" name="password" placeholder="Password" onChange={this.onChange.bind(this)} value={password} />
                                </div>
                            </div>
                            <div className="ui fluid large teal submit button" onClick={this.dologin.bind(this)}>Login</div>
                        </div>
                        <div className="ui error message"></div>
                    </form>
                    <div className="ui message">
                        New to us? <a href="#">Sign Up</a>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;