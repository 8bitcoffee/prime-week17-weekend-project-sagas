import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/details/1'>Details</Link></li>
          <li><Link to='/add'>Add Movie</Link></li>
        </ul>
      </nav>     
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
    </div>
  );
}


export default App;
