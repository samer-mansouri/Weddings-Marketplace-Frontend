import React from 'react'
import Navbar from '../layouts/Navbar'
import MainService from '../services/main.service'

import * as Yup from 'yup';

import { useFormik, validateYupSchema, ErrorMessage } from 'formik';
import axios from 'axios';
import api1 from '../services/api';
import SuccessAlert from '../components/SuccessAlert';

const ValidateSchema = Yup.object().shape({
  title: Yup.string().required('Champ obligatoire'),
  description: Yup.string().required('Champ obligatoire'),
  price: Yup.number('Veuillez saisir une valeur numérique').required('Champ obligatoire'),
  category: Yup.string().required('Champ obligatoire'),

});


export default function AddAnnonce() {

  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [selectedImages, setSelectedImages] = React.useState([])
  const [urls, setUrls] = React.useState([])
  const [success, setSuccess] = React.useState(false)

    
  

  const fetchCategories = () => {
    MainService.getCategoriesNames()
      .then(res => {
        console.log(res.data)
        setCategories(res.data.categories)
      }).catch(err => {
        console.log(err)
      })

  }

  const sendData =  (data) => {

    setLoading(true)

    const formData = new FormData();
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('categoryId', data.categoryId)
    for(let i = 0; i < selectedImages.length; i++){
      formData.append('pics', selectedImages[i])
    }
    console.log(formData)
    console.log(selectedImages)
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }


    api1.post('/post_annonce', formData).then(res => {
      console.log(res)
      setLoading(false)
      setSuccess(true)
    }).catch(err => {
      console.log(err)
      setLoading(false)

    })

  }

  const onFileChange = (e) => {
    setUrls([])
    setSelectedImages([])

    const files = e.target.files
  
    console.log(files)
    for(let i=0; i< files.length; i++){

      setUrls(urls => [...urls, URL.createObjectURL(files[i])])
      setSelectedImages(selectedImages => [...selectedImages, files[i]])
    }
    
    console.log(urls)
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      categoryId: '',
    },
    //validationSchema: ValidateSchema,
    onSubmit: values => {
      sendData(values)
    },
  });

  React.useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
        <Navbar />

        <div className="mx-56 mt-8 shadow-xl px-8 py-8 ">
               
                        <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>

                          <div>
                            <h2 className="text-3xl font-bold mb-2">Créer une annonce</h2>
                          </div>

                          {
                            success && <SuccessAlert title="Annonce ajoutée" message="Votre annonce a été publiée avec succès" />
                          }
                          
                        
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Titre
                            </label>
                            <div className="mt-1">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}

                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                              {
                                formik.touched.title && formik.errors.title && (
                                  <div className="text-red-500 text-xs italic">
                                    {formik.errors.title}
                                  </div>
                                )
                              }


                            </div>
                          </div>

                          <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Catégorie
                            </label>
                               <select 
                                id="categoryId"
                                as="select"
                                name="categoryId"
                                required
                                className="appearance-none rounded-md bg-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                                placeholder="Catégorie"
                                onChange={formik.handleChange}
                                value={formik.values.categoryId}

                               >
                                  <option value>-- Choisir une catégorie --</option>
                                  

                            {
                              categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                              ))
                            }
                                                            </select>

                                                            {
                                                              formik.touched.categoryId && formik.errors.categoryId && (
                                                                <div className="text-red-500 text-xs italic">
                                                                  {formik.errors.categoryId}
                                                                </div>
                                                              )
                                                            }

                        </div>


                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="description"
                                name="description"
                                type="text"
                                value={formik.values.description}
                                onChange={formik.handleChange}

                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              ></textarea>
                              {
                                formik.touched.description && formik.errors.description && (
                                  <div className="text-red-500 text-xs italic">
                                    {formik.errors.description}
                                  </div>
                                ) 
                              }
                            </div>
                          </div>
        
        
                          <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Prix
                            </label>
                            <div className="mt-1">
                              <input
                                id="price"
                                name="price"
                                type="text"
                                required
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>

                            {
                              formik.touched.price && formik.errors.price && (
                                <div className="text-red-500 text-xs italic">
                                  {formik.errors.price}
                                  </div>
                              )
                            }
                          </div>

                          <div className="space-y-1">
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                              Images
                            </label>
                            <div className="mt-1">
                              <input
                                id="images"
                                name="imges"
                                type="file"
                                required
                                accept="img/*" 
                                multiple
                                onChange={onFileChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
                          </div>
                            
                          <div className="flex flex-wrap">
                            { 
                              urls.map((url, index) => (
                                <img key={index} src={url} alt="" className="w-72 mx-2 my-2"/>
                              ))
                            }
                          </div>
                         
        
                          <div>
                            <button
                              type="submit"
                              disabled={loading}
                              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#d83d2e] hover:bg-[#d83d2e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d83d2e]"
                            >
                              {
                                loading ?
                                <span>CHARGEMENET...</span>
                                :
                                <span>CRÉER</span>
                              }
                            </button>
                           
                          </div>
                        </form>
                      </div>
    </>
  )
}
