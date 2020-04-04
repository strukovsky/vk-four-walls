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
    constructor(props) {
        super(props);
        this.state = {
            activities: Cookie.getCurrentActivities(),
            activeModal: null,
            item: null,
        }
        this.until = Cookie.getUntil();
    }

    handleActivity(item, id) {

        this.setState({activeModal: "edit", item: item, id: id});
    }


    componentWillUnmount() {
        Cookie.setCurrentActivities(this.state.activities);
    }

    changeActivityTitle(title) {
        let item = this.state.item;
        if (item === null) {
            item = {
                title: "",
                status: "process",
            }
        }
        let activities = this.state.activities;
        let id = this.state.id;
        item.title = title;
        activities[id] = item;
        this.setState({item: item, activities: activities})
    }

    changeActivityStatus(status) {
        let item = this.state.item;
        let activities = this.state.activities;
        let id = this.state.id;
        item.status = status;
        activities[id] = item;
        this.setState({item: item, activities: activities, activeModal: null})
    }

    render() {
        let array = this.state.activities.map((item, i) => {
            if (item === null) {
                return (
                    <Card size="l" key={i}
                          className={"card" + (i + 37) % 4} onClick={() => {
                        this.handleActivity(item, i)
                    }}>

                        <Header>Нажми меня</Header>
                    </Card>
                );
            } else {
                let status = item.status;
                let view = (<Card onClick={() => {
                    this.handleActivity(item, i)
                }} size={"l"} key={i}
                                  className={"cardProcess"}>
                    <Header>{item.title} в процессе <Icon24Flash/></Header>
                </Card>);
                if (status === 'done') {
                    view = (<Card onClick={() => {
                        this.handleActivity(item, i)
                    }} size={"m"} key={i}
                                  className={"cardDone"}>
                        <Header>{item.title} сделано <Icon24Done/></Header>
                    </Card>);
                } else if (status === 'dismiss') {
                    view = (<Card onClick={() => {
                        this.handleActivity(item, i)
                    }} size={"s"} key={i}
                                  className={"cardDismiss"}>
                        <Header>{item.title} Отмена <Icon24DismissSubstract/></Header>
                    </Card>);
                }

                return view;
            }
        });
        const modal = (
            <ModalRoot
                activeModal={this.state.activeModal}
                onClose={() => {
                    this.setState({activeModal: null})
                }}
            >
                <ModalPage id={"edit"} onClose={() => {
                    this.setState({activeModal: null})
                    if(this.state.activities.toString() !== ',,,')
                    {
                        Cookie.setCurrentActivities(this.state.activities);
                    }
                }}
                           header={
                               <ModalPageHeader>{
                                   (this.state.item === null) ? "Редактируйте цель" : this.state.item.title
                               }</ModalPageHeader>
                           }
                >
                    <FormLayout>
                        <Input placeholder={"Имя"} value={this.state.item === null ? "" : this.state.item.title}
                               onChange={(e) => {
                                   this.changeActivityTitle(e.target.value);
                               }}/>
                        {
                            (this.state.item === null || this.state.item.status !== 'process') ?
                                (<Button onClick={() => {
                                    this.setState({activeModal: null})
                                }}>Закрыть</Button>) :
                                (<div>
                                        <Button mode={"commerce"} onClick={
                                            () => {

                                                this.changeActivityStatus("done");
                                                if(this.state.activities.toString() !== ',,,')
                                                {
                                                    Cookie.setCurrentActivities(this.state.activities);
                                                }

                                            }
                                        }>Завершить цель</Button>
                                        <Button mode={"destructive"} onClick={
                                            () => {
                                                this.changeActivityStatus("dismiss");
                                                if(this.state.activities.toString() !== ',,,')
                                                {
                                                    Cookie.setCurrentActivities(this.state.activities);
                                                }
                                            }
                                        }>Отказаться от цели</Button>
                                        <Button onClick={() => {
                                            if(this.state.activities.toString() !== ',,,')
                                            {
                                                Cookie.setCurrentActivities(this.state.activities);
                                            }
                                            this.setState({activeModal: null})


                                        }}>Закрыть</Button>
                                    </div>

                                )
                        }

                        <div style={{height: 128}}/>
                    </FormLayout>

                </ModalPage>
            </ModalRoot>
        );
        let until = (<Header>Успей до {this.until}. <Button onClick={() => {
            let activities = this.state.activities;
            Cookie.setCurrentActivities(activities);
            this.setState({activities: [null, null, null, null]});
            let date =  Cookie.getUntilDate();
            Cookie.addToStats(activities, date);
            this.until = null;
            Cookie.removeActivities();
            Cookie.removeDate();


        }}>Завершить досрочно</Button></Header>);
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