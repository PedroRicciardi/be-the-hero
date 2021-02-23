import React, {useState} from 'react';
import './styless.css';

import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncidents (){

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.getItem('ongID')
    const history = useHistory();

    async function handleNewIncidents(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            })
            history.push('/profile');
        }catch(err){
            alert('Erro ao cadastrar caso');
        }
    }

    return (        
        <div className = "new-incidents-container">
        <div className = "content">
            <section>
                <img src={LogoImg} alt="Be The Hero"/>
                
                <h1>Cadastrar novo caso</h1>
                <p> Descreva o caso detalhadamente </p>

                <Link className="back-link" to="/profile">
                <FiArrowLeft  size={16} color="#E02041" />
                voltar ao inicio
                </Link>

            </section>

            <form onSubmit={handleNewIncidents}>
                <input 
                    placeholder="Titulo do caso"
                    value = {title}
                    onChange={e => setTitle(e.target.value)}
                    />
                <textarea 
                    placeholder="Descrição"    
                    value = {description}
                    onChange={e => setDescription(e.target.value)}
                    />
                <input 
                    placeholder="valor em Reais"
                    value = {value}
                    onChange={e => setValue(e.target.value)}
                    />

                <button className="button" type="submit">Registry</button>

            </form>
        </div>
        </div>
    );
}