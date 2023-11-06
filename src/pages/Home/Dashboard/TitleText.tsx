import React, {useEffect, useState} from "react";
import './styles/TitleText.css';

interface MessageProps{
    overdue: boolean;
    numTasks: number;
    name: string;
}

export default function TitleText(props: MessageProps){
    const [text, setText] = useState('');
    useEffect(() => {
        let tempText = `You have ${props.numTasks} `;
        if (props.overdue){
            tempText += 'overdue ';
        } else {
            tempText += 'upcoming ';
        }
        tempText += props.numTasks === 1 ? 'task.' : 'tasks.';
        setText(tempText);
    }, [props.overdue, props.numTasks])
    return (
        <div className={'dashboard-section-container thirty-percent-height'}>
            <span className={'dashboard-title-text'}>{`Hi, ${props.name}!`}</span>
            <span className={'dashboard-body-text'}>{text}</span>
        </div>
    )
}