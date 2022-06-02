import Navbar from "../layouts/Navbar";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import { useState } from 'react';
import { Redirect } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email field is required'),
    password: Yup.string().required('Password field is required'),
  });

export default function Login() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [notUser, setNotUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendData = (data) => {
        setLoading(true);
        setTimeout(() => {
            AuthService.login(data)
        .then(res => {
          console.log(res)
            setLoggedIn(true)
        })
        .catch(err => {
          console.log(err)
          if(err.response.status === 404 || err.response.status === 401) {
            setNotUser(true)
          }
        }).finally(() => {
            setLoading(false)
            })}, 3000);   
    }

    if(loggedIn) {
        return <Redirect exact to="/" />
    } else {
        return (
            <>
              <Navbar />
              <div className="min-h-full flex mt-8 ml-72 mr-72 mb-8">
                <div className="flex-1 flex border shadow     flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
                  <div className="mx-auto w-full max-w-sm lg:w-96 py-36">
                    <div>
                    <h1 className="text-[#d83d2e] font-extrabold text-2xl" >WEDD'IT</h1>
      
                      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Se connecter à votre compte</h2>
                      <p className="mt-2 text-sm text-gray-600">
                        Ou{' '}
                        <a href="#" className="font-medium text-[#d83d2e] hover:text-[#d83d2e]">
                          s'inscrire
                        </a>
                      </p>

                      {
                  notUser ? 
                    <div className="mt-3">
                      <ErrorAlert 
                      title="Ce compte n'existe pas"
                      message="Veuillez vérifier vos identifiants"
                    />  
                    
                    </div>
                  : ''
                }
                    </div>
        
                    <div className="mt-8">
                     
                      <div className="mt-6">
                        <Formik
                         initialValues={{
                            email: '',
                            password: '',
                            }}
                            validationSchema={SignInSchema}
                            onSubmit={values => sendData(values)}
                        >

                        <Form action="#" method="POST" className="space-y-6">
                          
                        
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
                                <span>SE CONNECTER</span>
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
  }