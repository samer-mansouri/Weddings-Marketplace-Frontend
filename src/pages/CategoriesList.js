import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import MainService from '../services/main.service';

function CategoriesList() {

  const [categories, setCategories] = React.useState([])

  const fetchCategories = async () => {
    MainService.getAllCategories()
      .then(res => {
        console.log(res.data)
        setCategories(res.data.categories)
      })
      .catch(err => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    fetchCategories();
  }, [])


  return (
    <>
      <Navbar />
      <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Nos catégories</h2>
         
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {categories.length > 0 ? categories.map((product) => (
            <div key={product._id} className="group relative mb-6">
              <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.image}
                  alt={product.image}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg text-gray-700">
                <Link to={`/category/${product._id}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
            </div>
          )) : ''}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Shop the collection<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

export default CategoriesList