import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Home from '../view/Home';
import NotFound from '../main/not-found';

const rotas = {

}


export default function Routes() {

  return (
    <Switch>
      <Route path='/' exact component={Home} />

      {Object.keys(rotas).map((rota, index) => (
        <Route key={rota ? rota : index} path={`/${rota}*`} exact component={rotas[rota]} />
      ))}

      <Route path='*' component={NotFound} />
    </Switch>
  );
}