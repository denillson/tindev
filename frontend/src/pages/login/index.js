import React, { useState } from 'react';
import './styles.css'
import Logo from '../../assets/logo.svg';
import api from '../../services/api';

export function Login({history}){
    const [ username, setUsername] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }
    return (
        <div className="login-container">
            <div className="form-box">
                <div className="logo">
                    <img src={Logo} alt="Logo"/>
                </div>
                <form onSubmit={handleSubmit} className="form">
                    <input onChange={e => setUsername(e.target.value)} placeholder="Digite seu usuário do GitHub"/>
                    <button>Confirmar</button>
                </form>
            </div>
        </div>
    );
}