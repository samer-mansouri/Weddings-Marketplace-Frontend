import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../layouts/Navbar';
import MainService from '../services/main.service';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Moment from 'react-moment';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import SuccessAlert from '../components/SuccessAlert';
import TokenService from '../services/token.service';
import { Link } from 'react-router-dom';


function SingleAnnonce() {

    const [data, setData] = React.useState([])
    const [images, setImages] = React.useState([])
    const [user, setUser] = React.useState([])
    const [date, setDate] = React.useState('')
    const [resLoading, setResLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)

    const { id } = useParams();



    const fetchData = () => {
        MainService.getAnnonce(id)
        .then((res) => {
            console.log(res.data)
            setData(res.data.annonce)
            setUser(res.data.annonce.user[0])
            setImages(res.data.annonce.images)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const sendReservation  = () => {

        setResLoading(true)

        const dataToSend = {
            receiver: user._id,
            annonceId: data._id,
            reservationDate: date
        }

        MainService.createReservation(dataToSend)
        .then(res => {
            console.log(res);
            setSuccess(true)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setResLoading(false)
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
            <div className="mb-8 w-3/4">
            {
                success ? 
                <div className="mb-4">
                    <SuccessAlert
                    title="Votre réservation a été effectuée avec succès"
                    message="Merci pour votre temps"
                />
                </div>
                : ''
            }

            <div className="flex items-center justify-between">
                
                <div className="flex items-center">
                <img src={user.picture} alt={user.picture} className=" rounded-full w-32" />
                <div className="ml-4">
                    <h1 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-700 text-base"><i>Publiée le: <span className="text-gray-500"><Moment format="DD/MM/YYYY">{data.createdAt}</Moment></span></i></p>
                    <div className="flex">
                    <LocationMarkerIcon className="text-gray-500 w-6 h-6 mb-4" />
                    <p className="text-gray-700 text-base mb-2 ml-1"><i>{user.address}</i></p>
                    
                    </div>
                    {
                        TokenService.getCurrentUserRole() === 'Client' ?
                        <Link to={`/messages/${user._id}`}
                    className="bg-green-600 text-white py-2 px-4 rounded mt-4">
                    
                        CONTACTER
                    </Link>
                    : null
                    }
                    
                </div>
                </div>
                {
                    TokenService.getCurrentUserRole() === 'Client' ?
                    <div className="flex flex-col">
                    
                    <div className="flex flex-col">
                        <button className="bg-blue-500 rounded-md text-white py-2 hover:cursor-pointer px-4 disabled:bg-blue-400"
                        disabled={date == '' || resLoading}
                        onClick={() => sendReservation()}
                        >
                            {
                                resLoading ?
                                'En cours' : 'Réserver'
                            }
                        </button>
                        <input type="date" 
                            className="rounded border border-gray-500 mt-1.5 py-2 px-4"
                            onChange={(e) => setDate(e.target.value)}
                       
                        />
                    </div>
                </div> : ''
                }
            </div>
            <div className="w-full object-center overflow-hidden mt-4">
            <Carousel>
                {images.map((image) => (
                    <div key={image}>
                        <img src={image} alt={image} className="w-full" />
                    </div>
                ))}
            </Carousel>
            </div>
            <div className="ml-4 pt-2">
            <div className="flex justify-between items-end  mb-3">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">{data.title}</h1>
                <p className="text-gray-700 font-bold">Prix: {data.price}<sup>DT</sup></p>
            </div>
            
            <p className="text-gray-700">{data.description}</p>
            
            {/*<p className="text-gray-700">{data.category}</p>
            <p className="text-gray-700">{data.createdAt}</p>*/}</div></div></div></div>
    </>
  )
}

export default SingleAnnonce