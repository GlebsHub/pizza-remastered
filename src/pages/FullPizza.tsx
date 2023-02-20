import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
      imageUrl: string;
      title: string;
      price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
          try{
            const {data} = await axios.get('https://63c0e9aa99c0a15d28dda3ba.mockapi.io/items/' + id)
            setPizza(data)
          } catch(error){
            alert('Ошибка при получении питсы')
            navigate('/')
          }
        }
        
        fetchPizza();
    }, []);
    

    if (!pizza) {
        return <>'Загрузка...'</>;
    }
   
  return (
    <div className='container'>
        <img src={pizza.imageUrl}/>
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} Р</h4>
        <Link to="/nonefs">
          <button className="button button--outline button--add">
              <span >Назад</span>
            </button>
        </Link>
    </div>
  )
}

export default FullPizza;