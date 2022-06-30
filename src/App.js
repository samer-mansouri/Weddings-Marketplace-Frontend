import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import AnnoncesList from './pages/AnnoncesList';
import CategoriesList from './pages/CategoriesList';
import AnnoncesForCat from './pages/AnnoncesForCat';
import SingleAnnonce from './pages/SingleAnnonce';
import AddAnnonce from './pages/AddAnnonce';
import AddCategory from './pages/AddCategory';
import UserAnnoncesList from './pages/UserAnnoncesList';
import ReservationsList from './pages/ReservationsList';
import Logout from './components/Logout';
import SenderReservations from './pages/SenderReservations';
import Chat from './pages/Chat/Chat';
import { useEffect, useState, useRef } from 'react';
import TokenService from './services/token.service';
import { io } from "socket.io-client";
import AdminCategories from './pages/AdminCategories';
import AllAnnoncesAdmin from './pages/AllAnnoncesAdmin';
import AllUsersAdmin from './pages/AllUsersAdmin';


const HOST = 'http://localhost:5000';



function App() {



  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    socket.current = io(HOST);
    socket.current.emit('add-user', TokenService.getCurrentUserId());
  }, []);

  
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />  
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/annonces">
          <AnnoncesList />  
        </Route>
        <Route path="/categories">
          <CategoriesList />  
        </Route>
        <Route path="/category/:id">
          <AnnoncesForCat />
        </Route>
        <Route path="/annonce/:id">
          <SingleAnnonce />
        </Route>
        <Route path="/addanonnce">
          <AddAnnonce />
        </Route>
        <Route path="/addcategory">
          <AddCategory />
          </Route>
          <Route path="/mes_annonces">
            <UserAnnoncesList />
          </Route>
          <Route path="/reservations_recue">
            <ReservationsList  />
          </Route>
          <Route path="/reservations">
            <SenderReservations />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/messages/:id">
            <Chat 
              socket={socket}
            />
          </Route>
          <Route path="/admin_cats">
            <AdminCategories />
          </Route>
          <Route path="/admin_annonces">
            <AllAnnoncesAdmin />
          </Route>
          <Route path="/admin_users">
            <AllUsersAdmin />
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
