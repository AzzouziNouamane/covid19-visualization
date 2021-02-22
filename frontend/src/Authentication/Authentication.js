import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./Authentication.css";

const Authentication = (props) => {
    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "530px",
        background: "#fff",
        padding: "70px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
    };
    const { touched, errors } = props;

    return(
        <React.Fragment>
            <div className="Login">
                <div className="login-wrapper" style={loginPageStyle}>
                    <h2>Login Page</h2>
                    <Form className="form-container" action={onsubmit} >
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="text" name="email" className={"form-control"} placeholder="Email" id="email" />
                            { touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className={"form-control"} placeholder="Password" id="psw" />
                            { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span> }
                        </div>
                        <button className="button" type="submit" >Login</button>

                    </Form>
                </div>
            </div>
        </React.Fragment>
    );
};


const LoginFormik = withFormik({
    mapPropsToValues: (props) => {
        return {
            email: props.email || '',
            password: props.password || ''
        }
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email not valid').required('Email is required'),
        password: Yup.string().required('Password is required')
    }),

    handleSubmit: (props) => {
        //const {history} = props;
        if(props.email === "admin@polytech.com" && props.password === "admin" )
        {alert('SUCCESS Login');
            window.location.href = "http://localhost:3000/home"
            }

        else {alert('Wrong Email or Password try it again ')}

    },

})(Authentication);

export default LoginFormik
