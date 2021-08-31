import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from '../Routes/Home';
import Search from '../Routes/Search';
import TV from '../Routes/TV';
import Detail from '../Routes/Detail';
import Header from '../Components/Header'
import Collections from '../Routes/Collections';

export default () => (
    <Router>
        <Header/>
        <Switch>
        <Route path="/" exact component={Home} ></Route>
        <Route path="/search" component={Search} ></Route>
        <Route path="/tv" exact component={TV} ></Route>
        {/* <Route path="/tv/popular" render={()=> <h1>popular</h1>}/> */}
        <Route path="/movie/:id" component={Detail} ></Route>
        <Route path="/collections/:id" component={Collections} ></Route>
        <Route path="/tv/:id" component={Detail} ></Route>
        <Redirect from="*" to="/" />
        </Switch>
    </Router>
)