import React, { useState } from "react";
import { Event } from "../../../Redux/Slices/userSlice";
import EventPreview from "../../../components/EventPreview";
import './styles/TaskViewer.css';

interface MessageProps {
    tasks: Event[];
    title: string;
}

export default function TaskViewer(props: MessageProps) {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const events = props.tasks;

    const previousEvent = () => {
        if (currentEventIndex > 0) {
            setCurrentEventIndex(currentEventIndex - 1);
        }
    };

    const nextEvent = () => {
        if (currentEventIndex < events.length - 1) {
            setCurrentEventIndex(currentEventIndex + 1);
        }
    };

    return (
        <div className="dashboard-section-container seventy-percent-height">
            {events.length > 0 ? (
                <div>
                    <span className={'dashboard-title-text'}>{`${props.title} Tasks`}</span>
                    <div className="event-container">
                        {events[currentEventIndex] && (
                            <EventPreview event={events[currentEventIndex]}/>
                        )}
                    </div>
                    <button onClick={previousEvent} className="arrow-button left">
                        &lt;
                    </button>
                    <button onClick={nextEvent} className="arrow-button right">
                        &gt;
                    </button>
                </div>
            ) : (
                <span className={'dashboard-body-text'}>{`No ${props.title} Tasks`}</span>
            )}
        </div>
    );
}
