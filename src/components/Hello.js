import React, {Component} from 'react'
import {Cell, CellButton, Group, Panel, PanelHeader, View} from "@vkontakte/vkui";
import Cookie from "../cookie/Cookie";

export default class Hello extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activePanel: "hello1"
        }

    }

    render() {
        return (
            <View id={"hello"} activePanel={this.state.activePanel}>
                <Panel id={"hello1"}>
                    <PanelHeader>Привет! Это FourWalls!</PanelHeader>
                    <Group>
                        <Cell>
                            Не чувствуй себя в 4 стенах как в тюрьме!
                        </Cell>
                        <Cell>
                            Развивай себя и прокачивай свою самостоятельность!
                        </Cell>
                        <CellButton onClick={()=>{this.setState({activePanel: "hello2"})}}>
                            Давайте
                        </CellButton>

                    </Group>
                </Panel>
                <Panel id={"hello2"}>
                    <PanelHeader>А как этим пользоваться?</PanelHeader>
                    <Group>
                        <Cell>
                            Выбери ровно 4 вещи, чтобы сделать сегодня.
                        </Cell>
                        <Cell>
                            Сколько стен в твоей комнате, столько и привычек. Не больше.
                        </Cell>
                        <Cell>
                            В настройках ты всегда сможешь настроить, во сколько пора заканчивать.
                        </Cell>
                        <CellButton onClick={()=>{
                            Cookie.setAuth();
                            document.location.replace("http:localhost:3000/main/")}}>
                            ОК, приступаю.
                        </CellButton>

                    </Group>
                </Panel>
            </View>
        );
    }

}