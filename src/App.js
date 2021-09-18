import './App.css';
import React from 'react';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom'
import Header from './Components/Header';
import Home from './Components/Home';
import Films from './Components/Films';
import Film from './Components/Film.js';
import FilmCreate from './Components/FilmCreate';

function App() {

  return (
    <div className="App">
      <Router>
        <Header/>
          <Switch>
            <Route path="/" exact component={Home}/> 
            <Route exact path="/films/create" component={FilmCreate}/> 
            <Route exact path="/films/:filmID" component={Film}/> 
            <Route path="/films" component={Films}/> 
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
