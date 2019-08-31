import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import { Login } from './pages/login';
import { Dev } from './pages/main';

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dev/:id" component={Dev}/>
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
