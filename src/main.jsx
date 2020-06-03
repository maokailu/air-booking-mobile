import React from 'react';
import { render } from 'react-dom';
import Test from './components/test.jsx';
import 'assets/fonts/global.scss';
import './main.scss';

if (module.hot) {
    module.hot.accept('./components/test.jsx', function() {
        render(
            <Test />,
            document.body
        );
    });
}
render(
    <Test />,
    document.body
);
