import React, { useState } from "react";
import { Event } from "../../../Redux/Slices/userSlice";
import EventPreview from "../../../components/EventPreview";
import './TaskViewer.css';

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
        <div className="task-view-container">
            {events.length > 0 ? (
                <>
                    <span>{`${props.title} Tasks`}</span>
                    <button onClick={previousEvent} className="arrow-button left">
                        &lt;
                    </button>
                    <div className="event-container">
                        {events[currentEventIndex] && (
                            <EventPreview event={events[currentEventIndex]} />
                        )}
                    </div>
                    <button onClick={nextEvent} className="arrow-button right">
                        &gt;
                    </button>
                </>
            ) : (
                <p>{`No ${props.title} Tasks`}</p>
            )}
        </div>
    );
}
