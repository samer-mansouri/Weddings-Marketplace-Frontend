import React, { useState, useEffect } from 'react'
import MainService from '../services/main.service';

function AnnoncesList() {

    const [data, setData] = useState([]);


    const fetchData = async () => {
        MainService.getAllAnnonces()
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };


    useEffect(() => {
        fetchData();
    }, [])

  return (
    <div>AnnoncesList</div>
  )
}

export default AnnoncesList