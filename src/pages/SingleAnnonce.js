import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../layouts/Navbar';
import MainService from '../services/main.service';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Moment from 'react-moment';


function SingleAnnonce() {

    const [data, setData] = React.useState([])
    const [images, setImages] = React.useState([])
    const [user, setUser] = React.useState([])

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

    React.useEffect(() => {
        fetchData();
    }, []);
    
  return (
    <>
        <Navbar />
        <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mb-8 w-3/4">
            <div className="flex items-center">
                <img src={user.picture} alt={user.picture} className="w-full rounded-full w-32" />
                <div className="ml-4">
                    <h1 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-700 text-base mb-2"><i>Publiée le: <span className="text-gray-500"><Moment format="YYYY/MM/DD">{data.createdAt}</Moment></span></i></p>
                </div>
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