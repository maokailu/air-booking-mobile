import React from 'react';
import { render } from 'react-dom';
import App from './controller/list/first';
import 'assets/fonts/global.scss';
import './main.scss';

if (module.hot) {
    module.hot.accept('./controller/list/first', function() {
        render(
            <App />,
            document.body
        );
    });
}
render(
    <App />,
    document.body
);
