import React, {Component} from 'react';
import "@vkontakte/vkui/dist/vkui.css"
import {
    Panel,
    View,
    Epic,
    TabbarItem,
    Tabbar,
    PanelHeader,
    Card,
    Header,
    ModalRoot,
    ModalPage,
    ModalPageHeader, FormLayout, Input, Button, CardGrid
} from '@vkontakte/vkui'
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Poll from '@vkontakte/icons/dist/24/poll';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Flash from '@vkontakte/icons/dist/24/flash';
import Icon24DismissSubstract from '@vkontakte/icons/dist/24/dismiss_substract';
import Cookie from "../cookie/Cookie";
import Stats from "./Stats";
import Profile from "./Profile";


class Main extends Component {

    constructor(props) {
        super(props);
        if(!Cookie.isAuth())
            document.location.replace("/");
        let untilDateStr = Cookie.getUntilDate();
        if(typeof untilDateStr !== "undefined")
        {
            let now = new Date();
            let untilDate = new Date(parseInt(untilDateStr));
            if(now > untilDate)
            {
                console.log(now);
                console.log(untilDate);
                let activities = Cookie.getCurrentActivities();
                Cookie.removeActivities();
                Cookie.removeDate();
                Cookie.addToStats(activities, untilDateStr);
            }
        }

        this.state = {
            activeStory: 'today',
            activities: Cookie.getCurrentActivities(),
            activeModal: null,
            item: null,
        };

        this.onStoryChange = this.onStoryChange.bind(this);
        this.until = Cookie.getUntil();
        let countOfActivities = Cookie.getCountOfActivities();
        this.emptyActivitiesStr = ','.repeat(countOfActivities-1);
        this.emptyArray = [];
        for(let i = 0; i < countOfActivities; i++)
            this.emptyArray.push(null);
    }



    handleActivity(item, id) {

        this.setState({activeModal: "edit", item: item, id: id});
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

    onStoryChange(e) {
        let story = e.currentTarget.dataset.story;
        this.setState({
            activeStory: story
        });
    }

    render() {
        console.log(this.state.activities);
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
                    this.setState({activeModal: null});
                    if (this.state.activities.toString() !== this.emptyActivitiesStr) {
                        Cookie.setCurrentActivities(this.state.activities);
                    }
                }}
                           header={
                               <ModalPageHeader>{
                                   (this.state.item === null) ? "Редактируйте цель" : this.state.item.title
                               }</ModalPageHeader>
                           }
                ><FormLayout>
                    <Input autoFocus maxLength={15} placeholder={"Имя"}
                           value={this.state.item === null ? "" : this.state.item.title}
                           onChange={(e) => {
                               this.changeActivityTitle(e.target.value);
                           }}/>
                    {
                        (this.state.item === null || this.state.item.status !== 'process') ?
                            (<Button onClick={() => {
                                this.setState({activeModal: null})
                            }}>Закрыть</Button>) :
                            (<div>
                                    <Button onClick={() => {
                                        if (this.state.activities.toString() !== this.emptyActivitiesStr) {
                                            Cookie.setCurrentActivities(this.state.activities);
                                        }
                                        this.setState({activeModal: null})


                                    }}>Закрыть</Button>

                                    <Button mode={"commerce"} onClick={
                                        () => {

                                            this.changeActivityStatus("done");
                                            if (this.state.activities.toString() !== this.emptyActivitiesStr) {
                                                Cookie.setCurrentActivities(this.state.activities);
                                            }

                                        }
                                    }>Завершить цель</Button>
                                    <Button mode={"destructive"} onClick={
                                        () => {
                                            this.changeActivityStatus("dismiss");
                                            if (this.state.activities.toString() !== this.emptyActivitiesStr) {
                                                Cookie.setCurrentActivities(this.state.activities);
                                            }
                                        }
                                    }>Отказаться от цели</Button>
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
            this.setState({activities: this.emptyArray});
            let date = Cookie.getUntilDate();
            Cookie.addToStats(activities, date);
            this.until = null;
            Cookie.removeActivities();
            Cookie.removeDate();


        }}>Завершить досрочно</Button></Header>);

        let today = (<CardGrid>
            {until}
            {array}
        </CardGrid>);

        if (this.until === null || this.state.activities.toString() === this.emptyActivitiesStr)
            today = (
                <CardGrid>
                    {array}
                </CardGrid>
            );

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'today'}
                        data-story={"today"}
                        text={"На сегодня"}
                    ><Icon24Education/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'stats'}
                        data-story={"stats"}
                        text={"Статистика"}
                    ><Icon24Poll/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'profile'}
                        data-story={"profile"}
                        text={"Профиль"}
                    ><Icon24User/>
                    </TabbarItem>
                </Tabbar>
            }
            >
                <View id={"today"} activePanel={"today"} modal={modal} activeModal={this.state.activeModal}>
                    <Panel id={"today"}>
                        <PanelHeader>Сегодня</PanelHeader>
                        {today}
                    </Panel>
                </View>
                <View id={"stats"} activePanel={"stats"}>
                    <Panel id={"stats"}>
                        <PanelHeader>Статистика</PanelHeader>
                        <Stats/>
                    </Panel>
                </View>
                <View id={"profile"} activePanel={"profile"}>
                    <Panel id={"profile"}>
                        <PanelHeader>Настройки</PanelHeader>
                        <Profile/>
                    </Panel>
                </View>
            </Epic>
        );
    }
}

export default Main;
