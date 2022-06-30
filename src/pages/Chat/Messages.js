import React from 'react'
import Navbar from '../../layouts/Navbar'
import { PencilAltIcon } from "@heroicons/react/solid"
import MainService from '../../services/main.service'
import { Socket } from 'socket.io-client'
import TokenService from '../../services/token.service'

function Messages({ to, socket }) {

  const [msg, setMsg] = React.useState('')
  const [messages, setMessages] = React.useState([])
  const [arrivalMessage, setArrivalMessage] = React.useState(null)

  const scrollRef = React.useRef()


  const fetchMessages = () => {

    MainService.getMessages({ to: to })
      .then((res) => {
        console.log(res.data)
        setMessages(res.data)
      }).catch(err => {
        console.log(err)
      })
  }

  const handleSendMsg = () => {
    socket.current.emit('send-msg', {
      to: to,
      from: TokenService.getCurrentUserId(),
      msg,
    })

    MainService.addMessage({ to: to  ,message: msg })
      .then((res) => {
        console.log(res.data)
      }).catch(err => {
        console.log(err);
      })

    const msgs = [...messages]
    msgs.push({ fromSelf: true, message: msg})
    setMessages(msgs)
    setMsg('')
  }




  React.useEffect(() => {
    fetchMessages();
  }, [])

  React.useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }

    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);

  }, [arrivalMessage]);



  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);




  return (
    <div className="h-screen relative">
        <Navbar />

        <div className="lg:mx-96">
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-4 uppercase text-gray-500">Messages</h1>
        </div>
        <div id="msgs" 
        className="relative mt-4 pb-4 border border-gray-200 h-96 mx-16 shadow-lg overflow-auto rounded-lg">
          <div className="h-16  bg-gray-200 top-0 sticky flex items-center border-4 border-b-gray-500">
            <h4 className="font-bold ml-8">Samer Mansouri</h4>
          </div>
          {
            messages.length > 0 ?
            <>
            {messages.map((msg, index) => {
            if (msg.fromSelf) {
              return (
                <div key={index} className="flex justify-end"
                ref={scrollRef} 
                >
                  <div className="bg-blue-500 text-white rounded-lg p-2 mr-2 mt-2">
                    {msg.message}
                  </div>
                </div>
              )}
            else {
              return (
                <div key={index} className="flex justify-start"
                ref={scrollRef} 
                >
                  <div className="bg-gray-200 rounded-lg p-2 ml-2 mt-2">
                    {msg.message}
                  </div>
                </div>
              )
            }
          })}
            </> : 
            <div className="text-center flex items-center justify-center h-full">
              <h1 className="text-xl font-bold mt-4 uppercase text-gray-500">Vous n'avez aucun message</h1>
            </div>
          }
        </div>


        <div className="flex mx-16 mb-2 mt-2 ">
        <textarea
          type="text"
          placeholder="Écrire un message"
          className="border border-gray-400 rounded-l-lg px-4 h-12 py-2 w-full shadow-lg rounded-0 focus:border-gray-500 focus:outline-none"
          id="input-message"
          value={msg}
          onChange={(e) => {setMsg(e.target.value); console.log(e.target.value, ' changed')}}
        />
        <button
                disabled={msg.length == ''}
                onClick={(e) => handleSendMsg()}
        >
        <PencilAltIcon 
        className="h-12 w-12 disabled:bg-blue-300 cursor-pointer hover:bg-blue-700 bg-blue-500  py-2 px-2 text-white rounded-r-lg shadow-lg" />
        </button>
        </div>
        </div>
    </div>
  )
}

export default Messages