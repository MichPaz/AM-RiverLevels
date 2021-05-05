import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './index'

const Routes = () => {
    const route = 'dadosHidrometeorologicos'
    return (
        <Switch>
            <Route path={`/${route}/:id/:method`} component={List} />
            <Route path={`/${route}/:method`} component={List} />
            <Route path={`/${route}`} component={List} />
        </Switch>
    );
}


export default Routes