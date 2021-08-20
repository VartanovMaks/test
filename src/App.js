import './App.css';
import Rules from './Components/Rules'
import Game from './Components/Game'
import Base from './Components/Base'
import BaseDetails from './Components/BaseDetails'
import Home from './Components/Home'
import Header1 from './Components/Header1'
import Header2 from './Components/Header2'
import EmptyComponent from './Components/EmptyComponent'
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'
import React, {useState} from 'react';

function Greeting(props) {
  const [isBaseMenu, setIsBaseMenu]=useState(false);

  if (!isBaseMenu) {    
    return <Header1 lastClick={()=>setIsBaseMenu(!isBaseMenu)}/>;
  }  
  return <Header2 lastClick={()=>setIsBaseMenu(!isBaseMenu)}/>;
}

function App() {

  return (
    <div className="App">
      <Router>
            <Greeting />
          <Switch>
            <Route path="/" exact component={Home}/> 
            <Route path="/rules" component={Rules}/> 
            <Route path="/game" exact component={Game}/>
            {/* <Route path="/base" exact component={Base}/> */}
              <Route path="/base" exact>
                <EmptyComponent lastClick={()=>console.log("hello")} />
              </Route> 
            <Route path="/base/:id" component={BaseDetails}/>
            <Redirect to='/rules' />
        </Switch>
      </Router>
     
    </div>
  );
}

export default App;
