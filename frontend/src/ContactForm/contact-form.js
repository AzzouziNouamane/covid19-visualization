import React, {useContext, useEffect, useState} from "react";
import './styled.scss'
import axios from "axios";
import {colors} from "@material-ui/core";
import ThemeContext from "../Context/Theme/ThemeContext";
import Button from "reactstrap/lib/Button";
import {useHistory} from "react-router-dom";



const Contact = () => {
    const [formData, setFormData] = useState({});
    const history = useHistory();

    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };
    const theme = useContext(ThemeContext);
    const handleSubmit = event => {
        event.preventDefault();
        if (formData.name ==='' || formData.email === '' || formData.message ==='' ){
            alert("Merci de remplir tous les champs ");
        }else {
            sendEmail();
            alert("Votre message a été envoyé avec succès ");
        }
        setFormData({
            name: '',
            email: '',
            message: ''
        })


    };
    const sendEmail = () => {
        axios.post(
            'http://localhost:3001/contact',
            formData
        ).catch(error => {
            console.log(error)
        })
    };

    return (
        <>
            <h1 style={{ color : theme.isDark? "white" : "black"}}>Contact</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    onChange={updateInput}
                    value={formData.name || ''}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={updateInput}
                    value={formData.email || ''}
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    onChange={updateInput}
                    value={formData.message || ''}
                />
                <button style={{ backgroundColor : theme.isDark? "white" : "black", color : theme.isDark? "black" : "white" }} type="submit" >Envoyer</button>
            </form>
        </>
    )
}

export default Contact;
