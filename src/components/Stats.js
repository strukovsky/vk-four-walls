import React, {Component} from 'react'
import Cookie from "../cookie/Cookie";
import {CardGrid, FormLayout, Header, Card, Cell, List} from "@vkontakte/vkui";
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24DismissSubstract from '@vkontakte/icons/dist/24/dismiss_substract';

export default class Stats extends Component{
    constructor(props) {
        super(props);
        this.stats = Cookie.getStats();
    }

    analyze()
    {
        if(typeof this.stats !== "undefined")
        {
            let done = 0;
            let dismissed = 0;
            this.stats.forEach((item) => {
                let activities = item.activities;
                activities.forEach((item) => {
                    if(typeof item !== "undefined" && item !== null)
                    {
                        if(item.status === 'done')
                            done++;
                        else dismissed++;
                    }

                });
            });
            return [done, dismissed];
        }
        else return [];
    }

    static prettyStatus(status)
    {
        if(status === 'done')
        {
            return "Сделано";
        }
        else
        {
            return "Отменено";
        }
    }

    static prettyEmpties(countOfEmpties)
    {
        switch (countOfEmpties) {
            case 1:
                return "не прописана одна цель";
            case 2:
                return "не прописаны две цели";
            case 3:
                return "не прописаны три цели";
            case 4:
                return "не прописаны четыре цели";
            case 5:
                return "не прописаны пять целей";
            case 6:
                return "не прописаны шесть целей";
            case 7:
                return "не прописаны семь целей";
            case 8:
                return "не прописаны восемь целей";
            case 9:
                return "не прописаны девять целей";
            case 10:
                return "не прописаны десять целей";
            default:
                return countOfEmpties + " штук";
        }
    }

    static prettySize(size) {
        switch (size) {
            case 1:
                return " одной";
            case 2:
                return "двух";
            case 3:
                return "трех";
            case 4:
                return "четырех";
            case 5:
                return "пяти";
            case 6:
                return "шести";
            case 7:
                return "семи";
            case 8:
                return "восьми";
            case 9:
                return "девяти";
            case 10:
                return "десяти";
            default:
                return size + " штук";
        }
    }



    render() {
        if(this.stats.length > 0)
        {
            let analysis = this.analyze();
            let array = this.stats.map((item, i) => {
                let date = new Date(parseInt(item.date));
                let options = { weekday: 'short', month: 'long', day: 'numeric'};
                let dateStr = date.toLocaleDateString("ru-RU", options);

                let size = item.activities.length;
                let countOfEmpties = 0;
                let activities = item.activities.map((item, i) =>{
                    if(typeof item !== "undefined" && item !== null)
                        if (item.status === 'done') {
                            return (<Cell before={<Icon24Done fill={"#111"}/>} key={i}>{item.title} - {Stats.prettyStatus(item.status)}</Cell>);
                        } else {
                            return (<Cell before={<Icon24DismissSubstract fill={"#111"}/>} key={i}>{item.title} - {Stats.prettyStatus(item.status)}</Cell>);
                        }
                    else
                        countOfEmpties++;
                });

                if(countOfEmpties === 0)
                {
                    return <Card key={i} size={"m"} className={"cardDone"}>
                        <FormLayout className={"Stats"}>
                            <Cell>{dateStr}</Cell>
                            <List>
                                {activities}
                            </List>
                        </FormLayout>
                    </Card>
                }

                if(countOfEmpties === size)
                {
                    return <Card key={i} size={"s"} className={"cardDismiss"}>
                        <Cell>{dateStr}. Ничего не сделано :(</Cell>
                    </Card>
                }

                return <Card key={i} size={"l"} className={"cardDismiss"}>

                    <FormLayout className={"Stats"}>
                        <Cell>{dateStr}. {Stats.prettyEmpties(countOfEmpties)} (из {Stats.prettySize(size)})</Cell>
                        <List>
                            {activities}
                        </List>
                    </FormLayout>

                </Card>





            });
            return (
                <CardGrid>
                    <Card size={"l"}>
                            <Header>Общая статистика</Header>
                            <Header>Сделано: {analysis[0]}</Header>
                            <Header>Отменено: {analysis[1]}</Header>
                    </Card>
                    {array}

                </CardGrid>
            )
        }
        else
        {
            return <div style={{display: "flex"}}><Header>Пока нет статистики((</Header></div>
        }

    }


}