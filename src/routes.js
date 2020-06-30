import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Local from './pages/Local';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/local" render={() => <Local />}/>
            </Switch>
        </BrowserRouter>
    );
}