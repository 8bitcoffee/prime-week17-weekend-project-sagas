import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />    
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/add" exact>
          <AddMovie/>
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
      </Router>
      <Footer />
    </div>
  );
}

export default App;