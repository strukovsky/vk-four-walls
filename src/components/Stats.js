import React, {Component} from 'react'
import Cookie from "../cookie/Cookie";
import {CardGrid, FormLayout, Header, Card, Cell} from "@vkontakte/vkui";

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
        if(countOfEmpties === 1)
        {
            return "Не прописана одна цель";
        }
        if(countOfEmpties === 2)
            return "Не прописаны две цели";
        if(countOfEmpties === 3)
            return "Не прописаны три цели";
    }
    render() {
        if(typeof this.stats !== "undefined")
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
                        return <Cell key={i}>{item.title} - {Stats.prettyStatus(item.status)}</Cell>
                    else
                        countOfEmpties++;
                });

                if(countOfEmpties === 0)
                {
                    return <Card key={i} size={"m"} className={"card"+(i%4)}>
                        <FormLayout className={"Stats"}>
                            <Cell>Дата: {dateStr}</Cell>
                            {activities}
                        </FormLayout>
                    </Card>
                }

                if(countOfEmpties === size)
                {
                    return <Card key={i} size={"s"} className={"card"+(i%4)}>
                        <Cell>Дата: {dateStr}. Ничего не сделано :(</Cell>
                    </Card>
                }

                return <Card key={i} size={"l"} className={"card"+(i%4)}>

                    <FormLayout className={"Stats"}>
                        <Cell>Дата: {dateStr}. {Stats.prettyEmpties(countOfEmpties)} (из четырех)</Cell>
                        {activities}
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