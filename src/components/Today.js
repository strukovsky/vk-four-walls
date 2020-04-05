import React, {Component} from 'react'
import {
    CardGrid,
    Panel,
    PanelHeader,
    View,
    Card,
    Header,
    Input,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    FormLayout, Button
} from "@vkontakte/vkui"
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Flash from '@vkontakte/icons/dist/24/flash';
import Icon24DismissSubstract from '@vkontakte/icons/dist/24/dismiss_substract';
import Cookie from "../cookie/Cookie"

let countOfActivities = 4;


export default class Today extends Component {


    render() {



        if (typeof this.until === "undefined" || this.until === null || this.state.activities.toString() === ',,,')
            return (
                <CardGrid>
                    {array}
                    {modal}
                </CardGrid>
            );
        else return (
            <CardGrid>
                {until}
                {modal}
                {array}
            </CardGrid>
        );

    }

}