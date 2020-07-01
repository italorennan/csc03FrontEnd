import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Local from './pages/Local/index';
import Global from './pages/Global/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/local" render={() => <Local />}/>
                <Route path="/global" render={() => <Global />} />
            </Switch>
        </BrowserRouter>
    );
}