import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'normalize.css/normalize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Layout from 'components/Layout';
import App from './config/server';

export default new App();

ReactDOM.render(<Layout />, document.getElementById('root'));
