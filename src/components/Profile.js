import React, {Component} from 'react'
import {
    Cell,
    CellButton,
    FormLayout,
    Group, Slider
} from "@vkontakte/vkui";
import Cookie from "../cookie/Cookie";


export default class Profile extends Component {
    constructor(props) {
        super(props);
        let endFromCookie = Cookie.getEndOfDay();
        let countFromCookie = Cookie.getCountOfActivities();
        this.state = {
            activeModal: null,
            end: endFromCookie,
            countOfActivities: countFromCookie
        }
    }

    componentWillUnmount() {
        Cookie.setEndOfDay(this.state.end);
        Cookie.setCountOfActivities(this.state.countOfActivities);
        window.location.reload();
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

    static prettyCount(countStr)
    {
        let count = parseInt(countStr);
        switch (count) {
            case 1:
                return "одна цель";
            case 2:
                return "две цели";
            case 3:
                return "три цели";
            case 4:
                return "четыре цели";
            case 5:
                return "пять целей";
            case 6:
                return "шесть целей";
            case 7:
                return "семь целей";
            case 8:
                return "восемь целей";
            case 9:
                return "девять целей";
            case 10:
                return "десять целей";
            default:
                return count + " штук";
        }
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
                    <Slider
                        step={1}
                        min={2}
                        max={10}
                        value={this.state.countOfActivities}
                        top={"Сколько целей в день вы хотите достигать? Сейчас выбрано " + Profile.prettyCount(this.state.countOfActivities)}
                        onChange={value => this.setState({countOfActivities: value})}
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