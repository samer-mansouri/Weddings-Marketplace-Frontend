import React, { useEffect, useMemo, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Table from '../layouts/Table'
import MainService from '../services/main.service'
import TokenService from "../services/token.service"

function SenderReservations() {

    

    const columns = useMemo(() => [
        {
            Header: 'Annonceur',
            accessor: 'person',
        },
        {
            Header: 'Réservé le',
            accessor: 'createdAt',
        },
        {
            Header: "Titre de l'annonce",
            accessor: 'title',
        },
        {
            Header: 'Prix',
            accessor: 'price',
        },
        {
            Header: 'Date de réservation',
            accessor: 'date'
        },
        {
            Header: "Annuler la réservation",
            accessor: "delete",
          }, {
            Header: "Consulter l'annonce",
            accessor: "consult"
          }
    ])

    const [data, setData] = useState([]);

    const fetchData = () => {
        const id = TokenService.getCurrentUserId()
        MainService.getUserReservations(id)
        .then(res => {
            console.log(res.data)
            setData(res.data.reservations)
        }).catch(err => {
            console.log(err);
        })

    }

    

    const DeleteComponent = ({ id }) => (
        <button
          onClick={() => {
            MainService.deleteReservation(id).then((res) => {
              fetchData();
            }).catch((err) => {
              console.log(err);
            });
          }}
    
          className="bg-red-600 text-white py-2 px-4 rounded"
        >
          Annuler la réservation
        </button>
      
      )

    const ConsultComponent = ({ id }) => (
        <Link to={`/annonce/${id}`}
        className="bg-blue-600 text-white py-2 px-4 rounded">
            Consulter
        </Link>
    )

    const tab = {
        columns: columns,
    
        rows: data.map((data, index) => {
          return {
                person: data.annonceur[0].firstName + " " + data.annonceur[0].lastName,
                createdAt: <Moment format="DD/MM/YYYY HH:MM">{data.createdAt}</Moment>,
                title: data.annonce[0].title,
                price: data.annonce[0].price + " DT",
                date: <Moment format="DD/MM/YYY">{data.reservationDate}</Moment>,
                delete: <DeleteComponent id={data._id} />,
                consult: <ConsultComponent id={data.annonce[0]._id} />
          }})
    
      }
    

    useEffect(() => {
        fetchData();
    } ,  [])

  return (
    <>
        <Navbar />
        <Table table={tab} />
    </>
  )
}

export default SenderReservations