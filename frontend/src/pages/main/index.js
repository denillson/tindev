import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import './styles.css';
import api from '../../services/api';

import Logo from '../../assets/logo.svg';
import Like from '../../assets/like.svg';
import Dislike from '../../assets/dislike.svg';
import ItsaMatch from '../../assets/itsamatch.png'

export function Dev({match}){
    const [devs, setDevs] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: { user: match.params.id}
            })

            setDevs(response.data);
        }


        loadUsers();
    }, [match.params.id]);

    useEffect(()=>{
        const socket = io('http://localhost:3333', {
            query : { user: match.params.id }
        });

        socket.on('match', dev => {
            setMatchDev(dev);
        })

    }, [match.params.id])

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id}
        });

        setDevs(devs.filter((user) => user._id !== id));
    }

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id}
        });

        setDevs(devs.filter((user) => user._id !== id));
    }

    function handleClose(){
        setMatchDev(false);
    }

    return(
        <>
        <div className="logo">
        <Link to="/"><img src={Logo} alt="Logo"/></Link>
        </div>
         <div className="main-container">
            {devs.length > 0 ?
            (
                devs.map((dev) => {
                    return (
                        <div key={dev._id} className="card">
                            <div className="card-img">
                                <img src={dev.avatar} alt={dev.name}/>
                            </div>
                            <div className="card-bio">
                                <strong>{dev.name}</strong>
                                <p>{dev.bio}</p>
                            </div>
                            <div className="card-button">
                                <button onClick={() => handleDislike(dev._id)} className="button"><img src={Dislike} alt="Dislike"/></button>
                                <button onClick={() => handleLike(dev._id)}  className="button"><img src={Like} alt="Like"/></button>
                            </div>
                         </div>
                    )
                })
            ) : (
                <div className="empty">
                    <h1>Acabou :(</h1>
                </div>
            )

        }
        { matchDev && (
            <div className="match-container">
                <img src={ItsaMatch} alt="itsamatch"/>
                <img id="avatar" src={matchDev.avatar} alt={"avatar" + matchDev.name}/>
                <strong>{matchDev.name}</strong>
                <p>{matchDev.bio}</p>
                <button onClick={() => handleClose()} className="button-close">Fechar</button>
            </div>
        )
        }
        </div>
    
        </>
       );

}