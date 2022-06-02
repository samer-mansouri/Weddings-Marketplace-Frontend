
  
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service'; 
import { useRef, useState } from 'react';
import Navbar from '../layouts/Navbar';
import SuccessAlert from '../components/SuccessAlert';
import ExclamationAlertNew from '../components/ExclamationAlertNew';


const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email field is required'),
    password: Yup.string().required('Password field is required'),
  });

export default function Register() {
    const [success, setSuccess] = useState(false);
    const [mailErr, setMailErr] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const myForm = useRef(null)
  
    const createAccount = (values) => {
        console.log(values)
      setLoading(true)
      AuthService.register(values)
      .then(res => {
        console.log(values)
        console.log(res)
        setSuccess(true)
        myForm.current.resetForm();
        setTimeout(() => {
          setSuccess(false)
        }, 5000);
      })
      .catch(err => {
        console.log(err.response.status)
        if(err.response.status === 409) {
          setMailErr(true)
          setTimeout(() => {
            setMailErr(false)
          }, 5000);
        }
      }).finally(() => {
          setLoading(false)
      })
    }
  
  
        return (
            <>
            <Navbar />
              <div className="min-h-full flex mt-8 ml-72 mr-72 mb-8">
                <div className="flex-1 flex border shadow     flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
                  <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                    <h1 className="text-[#d83d2e] font-extrabold text-2xl" >WEDD'IT</h1>
      
                      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Créer un nouveau compte</h2>
                      <p className="mt-2 text-sm text-gray-600">
                        Ou{' '}
                        <a href="#" className="font-medium text-[#d83d2e] hover:text-[#d83d2e]">
                          connectez vous à votre compte
                        </a>
                      </p>
                      {
              success ? 
              <div className="mt-3">
               <SuccessAlert 
                title={'Votre compte a été créé avec succès'}
                message={'Bienvenue parmis nous, vous pouvez maintenant vous connecter'}
              />  
              </div>
              : ''
            }
            {
              mailErr ?
              <div className="mt-3">
              <ExclamationAlertNew
                title={'Cette adresse mail est déjà utilisée'} 
                message={'Veuillez en choisir une autre'}
              />   
              </div>
              
              : ''
            }
                    </div>
        
                    <div className="mt-8">
                     
                      <div className="mt-6">
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                address: '',
                                email: '',
                                gender: '',
                                role: '',
                                password: '',
                                }}
                                validationSchema={SignUpSchema}
                                onSubmit={values => createAccount(values)}
                                innerRef={f => (myForm.current = f)}

                        >

                        <Form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                              Nom
                            </label>
                            <div className="mt-1">
                              <Field
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                              Prénom
                            </label>
                            <div className="mt-1">
                              <Field
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Adresse email
                            </label>
                            <div className="mt-1">
                              <Field
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                              Adresse
                            </label>
                            <div className="mt-1">
                              <Field
                                id="address"
                                name="address"
                                type="text"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          

                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Genre
                            </label>
                            <Field
                            id="gender"
                            as="select"
                            name="gender"
                            required
                            className="appearance-none rounded-md bg-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                            placeholder="Genre"
                            >
                            <option value="" className="text-gray-500">{'-'}</option>
                            <option value="Male" className="text-gray-500">Homme</option>
                            <option value="Female" className="text-gray-500">Femme</option>
                            </Field>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Type de compte
                            </label>
                            <Field
                            id="role"
                            as="select"
                            name="role"
                            required
                            className="appearance-none rounded-md bg-white relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                            placeholder="Genre"
                            >
                            <option value="" className="text-gray-500">{'-'}</option>
                            <option value="Client" className="text-gray-500">Client</option>
                            <option value="Annonceur" className="text-gray-500">Annonceur</option>
                            </Field>
                        </div>


        
                          <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Mot de passe
                            </label>
                            <div className="mt-1">
                              <Field
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#d83d2e] focus:border-gray-500 sm:text-sm"
                              />
                            </div>
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
                                <span>S'INSCRIRE</span>
                              }
                            </button>
                          </div>
                        </Form>
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block relative w-0 flex-1">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://static.onecms.io/wp-content/uploads/sites/34/2022/03/23/anastasia-eliran-wedding-couple-0322.jpg"
                    alt=""
                  />
                </div>
              </div>
            </>
          )
    
  }