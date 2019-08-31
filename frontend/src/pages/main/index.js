import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Logo from '../../assets/logo.svg';
import Like from '../../assets/like.svg';
import Dislike from '../../assets/dislike.svg';
import api from '../../services/api';

export function Dev({match}){
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/devs', {
                headers: { user: match.params.id}
            })

            setDevs(response.data);
        }


        loadUsers();
    }, [match.params.id]);

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id}
        });

        setDevs(devs.filter((user) => user._id != id));
    }

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id}
        });

        setDevs(devs.filter((user) => user._id != id));
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
                        <div className="card">
                            <div className="card-img">
                                <img src={dev.avatar}/>
                            </div>
                            <div className="card-bio">
                                <strong>{dev.name}</strong>
                                <p>{dev.bio}</p>
                            </div>
                            <div className="card-button">
                                <button onClick={() => handleDislike(dev._id)} className="button"><img src={Dislike}/></button>
                                <button onClick={() => handleLike(dev._id)}  className="button"><img src={Like}/></button>
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
        </div>
    
        </>
       );

}