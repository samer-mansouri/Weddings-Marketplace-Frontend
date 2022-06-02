import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../layouts/Navbar';
import MainService from '../services/main.service';

function AnnoncesForCat() {

    const [data, setData] = React.useState([])
    const [cat, setCat] = React.useState([])


    const { id } = useParams();

    const fetchData = () => {
      MainService.getCategory(id)
      .then((res) => {
        console.log(res.data)
        setData(res.data.category.annonces)
        setCat(res.data.category)

      }).catch((err) => {
        console.log(err)
      })
    }


    React.useEffect(() => {
      fetchData();

    }, []);

  return (
    <>
      <Navbar />

      <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex mb-8">
        <div className="overflow-hidden">
        <img src={cat.image} alt={cat.image} className="w-80 rounded-lg" />
        </div>
        <div className="ml-4 py-16">
        <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>  
        <p className="text-gray-700">{cat.description}</p>

        </div>
        </div>
        
        <hr /> 

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id}>
              <div className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.images[0]}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}DT</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Voir plus<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default AnnoncesForCat