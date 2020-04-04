import React, {Component} from 'react'
import {
    Button,
    Cell,
    CellButton,
    FormLayout,
    Group, Header,
    Input,
    ModalPage,
    ModalPageHeader,
    ModalRoot, Slider
} from "@vkontakte/vkui";
import Cookie from "../cookie/Cookie";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        let endFromCookie = Cookie.getEndOfDay();
        this.state = {
            activeModal: null,
            end: endFromCookie,
        }
    }

    componentWillUnmount() {
        Cookie.setEndOfDay(this.state.end);
    }

    static prettyEnd(end)
    {
        if(end >= 22)
        {
            return "в "+ end + " часа";
        }
        if(end === 21)
        {
            return "в 21 час";
        }
        return "в " + end + " часов";
    }

    render() {
        return (
            <Group>
                <FormLayout>
                    <Slider
                        step={1}
                        min={14}
                        max={23}
                        value={this.state.end}
                        top={"Во сколько вы планируете заканчивать выполнение целей? Сейчас выбрано " + Profile.prettyEnd(this.state.end)}
                        onChange={value => this.setState({end: value})}
                    />
                </FormLayout>


                <CellButton onClick={() => {
                    this.setState({activeModal: "delete"})
                }}>
                    Очистить статистику
                </CellButton>

                {this.state.activeModal === "delete" ? (<div>
                    <Cell>Точно?</Cell>
                    <CellButton onClick={() => {
                        this.setState({activeModal: null});
                    }}>
                        Нет
                    </CellButton>
                    < CellButton mode={"destructive"} onClick={() => {
                        Cookie.deleteStats();
                        this.setState({activeModal: null});
                    }}>
                        Да
                    </CellButton>
                </div>) : <div/>}

            </Group>


        );
    }

}