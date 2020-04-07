import React, {Component} from 'react'
import {Card, Panel, PanelHeader, View} from "@vkontakte/vkui";
import Cookie from "../cookie/Cookie";

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: "hello1"
        }

    }

    consoleText(words, console, id, colors) {
        if (colors === undefined) colors = ['#111'];
        let visible = true;
        let con = document.getElementById(console);
        let letterCount = 1;
        let x = 1;
        let waiting = false;
        let target = document.getElementById(id);
        target.setAttribute('style', 'color:' + colors[0]);
        let i = 0;
        window.setInterval(function () {

            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                window.setTimeout(function () {
                    let usedColor = colors.shift();
                    colors.push(usedColor);
                    let usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' + colors[0]);
                    letterCount += x;
                    waiting = false;


                }, 500)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                waiting = true;
                window.setTimeout(function () {
                    if (i >= 2) {

                        return;
                    }
                    x = -1;
                    letterCount += x;
                    waiting = false;
                    i++;


                }, 500)
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount);
                letterCount += x;
            }
        }, 60);
        window.setInterval(function () {
            if (visible === true) {
                con.className = 'console-underscore hidden';
                visible = false;

            } else {
                con.className = 'console-underscore';

                visible = true;
            }
        }, 400)
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    componentDidMount() {
        this.performAnimation(this.text1, 1);
    }

    text1 = ["Это FourWalls", "Есть дело", "Нажми сюда"];
    text2 = ["Сейчас выбери ровно 4 цели.", "Столько, сколько стен в твоей комнате.", "Жми сюда, чтобы начать."];

    performAnimation(texts, id) {
        this.consoleText(texts, 'console' + id, 'text' + id);
    }


    secondPageClick()
    {
        Cookie.setAuth();
        document.location.replace("http:localhost:3000/main/")
    }

    render() {
        return (
            <View id={"hello"} activePanel={this.state.activePanel}>
                <Panel id={"hello1"} style={{display: "flex"}}>
                    <PanelHeader>Привет! Это FourWalls!</PanelHeader>
                    <Card id={"firstCard"} className={"Console console-container"} onClick={async () => {
                        this.setState({activePanel: "hello2"});
                        await this.sleep(1000);
                        this.performAnimation(this.text2, 2);
                    }}
                          style={{width: "auto", height: "auto", margin: "auto", display: "flex"}} >
                        {<div style={{height: 196, margin: "auto"}}>
                            <span id='text1'/>
                            <div className='console-underscore' id='console1'>&#95;</div>
                        </div>}


                    </Card>
                </Panel>
                <Panel id={"hello2"}>
                    <PanelHeader>А как этим пользоваться?</PanelHeader>
                    <Card id={"secondCard"} className={"Console console-container"}
                          style={{width: "auto", height: "auto", margin: "auto", display: "flex"}} onClick={ this.secondPageClick
                    }>
                        <div style={{height: 196, margin: "auto"}}>
                            <span id='text2'/>
                            <div className='console-underscore' id='console2'>&#95;</div>

                        </div>
                    </Card>
                </Panel>
            </View>
        );
    }

}