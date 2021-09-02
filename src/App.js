import './App.css';
import Home from './Components/Home';
import Films from './Components/Films';
import Film from './Components/Film.js';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom'
import React from 'react';
import Header from './Components/Header';

function App() {

  return (
    <div className="App">
      <Router>
        <Header/>
          <Switch>
            <Route path="/" exact component={Home}/> 
            <Route exact path="/films/:filmID" component={Film}/> 
            <Route path="/films" component={Films}/> 
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
