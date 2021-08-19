import './App.css';
import Rules from './Components/Rules'
import Game from './Components/Game'
import Base from './Components/Base'
import BaseDetails from './Components/BaseDetails'
import Home from './Components/Home'
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
            <Link className="link-menu" to="/"  >Home</Link>
            <Link className="link-menu" to="/rules" >Rules</Link>
            <Link className="link-menu" to="/game" >Gam</Link>
            <Link className="link-menu" to="/base" >Base</Link>
        <Switch>
            <Route path="/" exact component={Home}/> 
            <Route path="/rules" component={Rules}/> 
            <Route path="/game" component={Game}/>
            <Route path="/base" exact component={Base}/>
            <Route path="/base/:id" component={BaseDetails}/>
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
