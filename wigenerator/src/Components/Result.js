import './Result.css'
import { useEffect, useState } from 'react'
import {Base64} from 'js-base64'

export default function Result({mixList}) {
    let diagram
    const [image, setImage] = useState()
    useEffect(() => {
        diagram = makeDiagram(mixList)
        getRenderImage(diagram)
        
        .then((result) => {
            setImage(<img alt='결과 그래프' src={makeImageUrl(result)}></img>)
        })
        .catch((err) => {
            console.log(err)
            setImage('error')
        })
    }, [])
    if(!image) {
        return loading()
    }
    else {
        if (image === 'error') {
            let text = <p></p>
            let copy = () => {
                navigator.clipboard.writeText(diagram)
                .then(() => {
                    alert('복사가 완료되었어요.')
                })
                .catch(() => {
                    alert('복사에 실패했어요. 아래 텍스트를 복사해 주세요.')
                    text = <p className='newline'>{diagram}</p>
                })
            }
            return (
                <div>
                    <div>
                        <p>현재 기능을 준비 중이에요. <a className="blueText click" href='https://play.d2lang.com/?layout=elk' target='blank'>여기</a>에 들어가 텍스트를 넣어주세요.</p>
                        <button onClick={copy}>복사하기</button>
                    </div>
                    {text}
                </div>
            )
        }
        console.log(image)
        return (
            <div className='overflow'>
                {image}
            </div>
        )
    }
}
async function getRenderImage(code) {
    const url = 'http://localhost:8080/'
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'code=' + code
    })
    const text = await result.body.getReader().read()
    return new TextDecoder().decode(text.value)
}
function loading() {
    return <div>로딩중</div>
}

function decodeBase64ToSvg(base64) {
    return Base64.decode(base64)
}

function makeImageUrl(image) {
    const svg = decodeBase64ToSvg(image)
    const blob = new Blob([svg], {type: 'image/svg+xml'})
    const url = URL.createObjectURL(blob)
    return url
}

function makeDiagram(mixList) {
    //make diagram with d2
    let diagram = ''
    for(let mix in mixList) {
        for(let word of mixList[mix]) {
            diagram.includes(word + '<->' + mix) || (diagram += mix + '<->' + word + '\n')
        }
    }
    return diagram
}
