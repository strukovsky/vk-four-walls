import React, {Component} from 'react';
import "@vkontakte/vkui/dist/vkui.css"
import {Panel, View, Epic, TabbarItem, Tabbar, PanelHeader} from '@vkontakte/vkui'
import Icon24Education from '@vkontakte/icons/dist/24/education';
import Icon24Poll from '@vkontakte/icons/dist/24/poll';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Today from "./Today";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStory: 'today'
        };
        this.onStoryChange = this.onStoryChange.bind(this);
    }

    onStoryChange(e) {
        this.setState({
            activeStory: e.currentTarget.dataset.story
        });
    }

    render() {
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
                <View id={"today"} activePanel={"today"}>
                    <Panel id={"today"}>
                        <PanelHeader>DADADA</PanelHeader>
                        <Today/>
                    </Panel>
                </View>
            </Epic>
        );
    }
}

export default Main;
