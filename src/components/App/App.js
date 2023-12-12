import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import SearchDetails from '../SearchDetails/SearchDetails.jsx';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />    
        <Route path="/" exact>
          <MovieList movies={useSelector(store=>store.movies)} />
        </Route>
        <Route path="/add" exact>
          <AddMovie/>
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route path="/searchdetails/:id">
          <SearchDetails />
        </Route>
      </Router>
      <Footer />
    </div>
  );
}

export default App;