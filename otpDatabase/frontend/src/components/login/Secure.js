import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from './validator';


import {
    NavLink
} from "react-router-dom";


class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null,
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }


    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }



        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }
    check() {
        var test = "yess";
        var x = test.charAt(1);
        console.log(x);
    }
    signOut() {
        this.setState({ user: null })
    }

    signIn(username, password) {
        this.setState({
            user: {
                username,
                password,
            }
        })
    }


    login = (e) => {

        e.preventDefault();
        let errors = this.validateLoginForm();

        if (errors === true) {
            alert("You are successfully signed in...");
            this.props.history.push('/Verify')


        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">

                <h1>Login</h1>


                <Row>
                    <form onSubmit={this.login} >
                        <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                            {errors.email &&
                                <HelpBlock>{errors.email}</HelpBlock>
                            }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary" >Sign-In</Button>
                    </form>
                </Row>


            </div>
        )
    }
}

export default Login;