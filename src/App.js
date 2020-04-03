import React, {Component} from 'react';
import logo from './logo.svg';
import "@vkontakte/vkui/dist/vkui.css"
import './App.css';
import {Panel, View, Epic, TabbarItem, Tabbar} from '@vkontakte/vkui'
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Poll from '@vkontakte/icons/dist/24/poll';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Main from "./components/Main";


class App extends Component {


    render() {
        return (
            <Main/>
        );
    }
}

export default App;
