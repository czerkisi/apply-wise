import React from "react";
import { Application, Event } from "../Redux/Slices/userSlice";

interface MessageProps {
    application: Application;
}

export default function ApplicationPreview(props: MessageProps) {
    const calculateDaysSinceLastUpdate = (events: Event[]): number => {
        if (events.length === 0) {
            return 0;
        }

        const currentDate = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Current date in Unix timestamp in days
        const mostRecentEvent: Event = events.reduce(
            (prev, current) => (prev.date > current.date ? prev : current)
        );

        return currentDate - mostRecentEvent.date;
    };

    const daysSinceLastUpdate = calculateDaysSinceLastUpdate(props.application.events);

    return (
        <div>
            <span className={'dashboard-body-text'}>Company Name: {props.application.companyName}</span>
            <span className={'dashboard-body-text'}>Job Title: {props.application.jobTitle}</span>
            <span className={'dashboard-body-text'}>Days Since Last Update: {daysSinceLastUpdate}</span>
        </div>
    );
}
