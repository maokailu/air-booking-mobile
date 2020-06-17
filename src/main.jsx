import React from 'react';
import { render } from 'react-dom';
import App from './components/list/first.jsx';
import 'assets/fonts/global.scss';
import './main.scss';

if (module.hot) {
    module.hot.accept('./components/test.jsx', function() {
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
