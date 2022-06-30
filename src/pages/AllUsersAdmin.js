import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Table from '../layouts/Table'
import MainService from '../services/main.service'
import TokenService from '../services/token.service'
import UpdateAnnonceModal from '../components/UpdateAnnonceModal'
import UpdateUserModal from '../components/UpdateUserModal'

function AllUsersAdmin() {

    const [refetch, setRefetch] = useState(false)

    const columns = useMemo(() => [
        {
            Header: 'Nom et Prénom',
            accessor: 'fullname',
        },
        {
            Header: 'Adresse',
            accessor: 'address',
        },
        {
            Header: 'Email',
            accessor: 'email',
            
        },
        {
            Header: 'Genre',
            accessor: 'gender',
        },
        {
            Header: 'Type',
            accessor: 'role',
        },
        {
          Header: "Modifier",
          accessor: "modify"
        },
        {
            Header: "Supprimer",
            accessor: "delete",
          }
    ])

    const [data, setData] = useState([])

    const fetchedData = useMemo(() => data, []);

    const fetchData = () => {
        MainService.getAllUsers()
        .then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch(err => {
            console.log(err);
        })
    }

    const DeleteComponent = ({ id }) => (
        <button
          onClick={() => {
            MainService.deleteUser(id).then((res) => {
              fetchData();
            }).catch((err) => {
              console.log(err);
            });
          }}
    
          className="bg-red-600 text-white py-2 px-4 rounded"
        >
          Supprimer
        </button>
      
      )


    const ModifyComponent = ({ data }) => {   

      const [open, setOpen] = useState(false)

      return (<>
      <button 
      className="bg-orange-400 text-white py-2 px-4 rounded"
        onClick={() => setOpen(true)}
      >
        Modifier
      </button>
      <UpdateUserModal
        openModal={open}
        toggleOpenModal={() => setOpen(!open)}
        data={data}
        toggleRefetch={() => setRefetch(!refetch)}
      />
      </>)
    }

    const tab = {
        columns: columns,
    
        rows: data.map((data, index) => {
          return {
                fullname: data.firstName + " " + data.lastName,
                address: data.address,
                email: data.email,
                gender: data.gender === 'Male' ? 'Homme' : 'Femme',
                role: data.role,
              delete: <DeleteComponent id={data._id} />,
              modify: <ModifyComponent data={data} />
          }})
    
      }
    

    useEffect(() => {
        fetchData();
    }, [refetch])


  return (
    <>
        <Navbar />
        <Table table={tab}/>
    </>
  )
}

export default AllUsersAdmin