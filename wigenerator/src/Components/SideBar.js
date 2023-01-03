import './SideBar.css'
import {React, Component} from "react";
import dict from './dictionary.csv'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const getFile = async() => {
            const response = await fetch(dict);
            const data = await response.text();
            const rows = data.split('\n').slice(1);
            return rows
        }
        const getWordsFromDictionary = (e) => {
            let button = e.target
            button.disabled = true
            button.innerHTML = '가져오는 중...'
            if(!window.confirm('표준국어대사전에 등록된 단어 27만개 중 100개를 랜덤으로 가져옵니다. 계속하시겠습니까?'))
            {
                button.disabled = false
                button.innerHTML = '사전에서 단어 가져오기'
                return
            }
            getFile().then((data) => {
                let selectedWords = []
                for (let i = 0; i < 100; i++) {
                    let randomIndex = Math.floor(Math.random() * data.length)
                    let selected = data[randomIndex]
                    selectedWords.push(selected.replace('-', ''))
                }
                this.props.addMultiWords(selectedWords)
                button.disabled = false
                button.innerHTML = '사전에서 단어 가져오기'
            })
        }
        if(!this.props.isInputing) {
            return (
                <div className="sideBar">
                    <p id='wordCount'>입력된 단어: {this.props.wordCount}개</p>
                </div>
            );
        }
        return (
            <div className="sideBar">
                <button onClick={getWordsFromDictionary} id='getWordsFromOnline'>사전에서 단어 가져오기</button>
                <p id='wordCount'>입력된 단어: {this.props.wordCount}개</p>
            </div>
        );
    }
}