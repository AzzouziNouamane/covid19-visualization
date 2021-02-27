import React, {useContext} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./Authentication.scss";
import ThemeContext from "../Context/Theme/ThemeContext";
import Cookies from "js-cookie"

const Authentication = (props) => {
    const theme = useContext(ThemeContext);

    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "530px",
        background: theme.isDark ? "#242731": "#fff",
        padding: "70px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
    };
    const { touched, errors } = props;

    return(
        <>
            <div className="Authentication">
                <div className="login-wrapper" style={loginPageStyle}>
                    <h2>Login Page</h2>
                    <Form className="form-container" >
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="text" name="email" className={"form-control"} placeholder="Email" id="email" />
                            { touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className={"form-control"} placeholder="Mot de passe" id="psw" />
                            { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span> }
                        </div>
                        <button className="button" type="submit" >Login</button>

                    </Form>
                </div>
            </div>
        </>
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
        email: Yup.string().email('Email invalide').required('Email requis'),
        password: Yup.string().required('Mot de passe requis')
    }),

    handleSubmit: (props) => {

        if(props.email === "admin@polytech.com" && props.password === "admin" ) {
            alert('Vous êtes authentifié !');
            window.location = "home";
            //window.location.href = apiUrl + "home";
            Cookies.set("user","login");
        } else {
            alert('Email ou mot de passe erroné. Veuillez réessayer. ')
        }

    },

})(Authentication);

export default LoginFormik
