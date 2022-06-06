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


function App() {
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
      </Switch>
    </Router>
  );
}

export default App;
