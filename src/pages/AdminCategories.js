import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../layouts/Navbar'
import Table from '../layouts/Table'
import MainService from '../services/main.service'
import TokenService from '../services/token.service'
import UpdateAnnonceModal from '../components/UpdateAnnonceModal'
import UpdateCategoryModal from '../components/UpdateCategoryModal'

function AdminCategories() {

    const [refetch, setRefetch] = useState(false)

    const columns = useMemo(() => [
        {
            Header: 'Nom',
            accessor: 'name',
        },
        {
            Header: 'Description',
            accessor: 'description',
            
        },
        {
          Header: "Modifier",
          accessor: "modify"
        },
        {
            Header: "Supprimer",
            accessor: "delete",
          }, {
            Header: "Consulter",
            accessor: "consult"
          }
    ])

    const [data, setData] = useState([])

    const fetchedData = useMemo(() => data, []);

    const fetchData = () => {
        const id = TokenService.getCurrentUserId()
        MainService.getAllCategories()
        .then((res) => {
            console.log(res.data)
            setData(res.data.categories)
        }).catch(err => {
            console.log(err);
        })
    }

    const DeleteComponent = ({ id }) => (
        <button
          onClick={() => {
            MainService.deleteCategory(id).then((res) => {
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

    const ConsultComponent = ({ id }) => (
        <Link to={`/category/${id}`}
        className="bg-blue-600 text-white py-2 px-4 rounded">
            Consulter
        </Link>
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
      <UpdateCategoryModal
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
              name: data.name,
              description: data.description,
              delete: <DeleteComponent id={data._id} />,
              consult: <ConsultComponent id={data._id} />,
              modify: <ModifyComponent data={data} />
          }})
    
      }
    

    useEffect(() => {
        fetchData();
    }, [refetch])


  return (
    <div className="bg-gray-100">
        <Navbar />
        
        <Table table={tab} adminCats={true}/>
        
    </div>
  )
}

export default AdminCategories