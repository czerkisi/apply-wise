import React from "react";
import {Event} from "../Redux/Slices/userSlice";
import './styles/EventPreview.css';

interface MessageProps {
    event: Event;
}

export default function EventPreview(props: MessageProps){
    const event = props.event;
    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp * 60 * 60 * 24 * 1000); // Convert to milliseconds
        return date.toDateString();
    };

    return (
        <div className={`event-preview ${event.type}`}>
            <h2>{event.title}</h2>
            <p>Due Date: {formatTimestamp(event.date)}</p>
        </div>
    );

}