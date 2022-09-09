import * as React from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore +++
import { Header } from "../shared/header";

window.addEventListener('load', () => {
    ReactDOM.hydrate(<Header/>, document.getElementById('react_root'));
});