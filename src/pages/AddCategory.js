import React from 'react'
import Navbar from '../layouts/Navbar'
import MainService from '../services/main.service'

import * as Yup from 'yup';

import { useFormik, validateYupSchema, ErrorMessage } from 'formik';
import axios from 'axios';
import api1 from '../services/api';
import SuccessAlert from '../components/SuccessAlert';

const ValidateSchema = Yup.object().shape({
  name: Yup.string().required('Champ obligatoire'),
  description: Yup.string().required('Champ obligatoire'),

});


export default function AddCategory() {

  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const [selectedImage, setSelectedImage] = React.useState(null)
  const [url, setUrl] = React.useState(null)
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
    formData.append('name', data.name)
    formData.append('description', data.description)

      formData.append('picture', selectedImage)

    console.log(formData)



    api1.post('/create_category', formData).then(res => {
      console.log(res)
      setLoading(false)
      setSuccess(true)
    }).catch(err => {
      console.log(err)
      setLoading(false)

    })

  }

  const onFileChange = (e) => {


    const files = e.target.files

    setSelectedImage(files[0])
    setUrl(URL.createObjectURL(files[0]))
    
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    //validationSchema: ValidateSchema,
    onSubmit: values => {
      sendData(values)
    },
  });


  return (
    <>
        <Navbar />

        <div className="mx-56 mt-8 shadow-xl px-8 py-8 ">
               
                        <form action="#" method="POST" className="space-y-6" onSubmit={formik.handleSubmit}>

                          <div>
                            <h2 className="text-3xl font-bold mb-2">Créer une catégorie</h2>
                          </div>

                          {
                            success && <SuccessAlert title="Annonce ajoutée" message="Votre annonce a été publiée avec succès" />
                          }
                          
                        
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Nom
                            </label>
                            <div className="mt-1">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}

                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                              {
                                formik.touched.nom && formik.errors.nom && (
                                  <div className="text-red-500 text-xs italic">
                                    {formik.errors.nom}
                                  </div>
                                )
                              }


                            </div>
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
                                onChange={onFileChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
                          </div>
                            
                          <div className="flex flex-wrap">
                            { 
                              url &&
                                <img src={url} alt="" className="w-72 mx-2 my-2"/>
                              
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
