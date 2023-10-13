import React, {useState} from "react";
import {Application} from "../../../Redux/Slices/userSlice";
import {Event} from "../../../Redux/Slices/userSlice";
import ApplicationPreview from "../../../components/ApplicationPreview";

interface MessageProps {
    applications: Application[];
}

export default function ApplicationViewer(props: MessageProps){
    const applications = props.applications;
    const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);
    const currentApplication = applications[currentApplicationIndex];


    const calculateDaysSinceLastUpdate = (events: Event[]): number => {
        if (events.length === 0) {
            return 0; // No events, so it's up to date
        }

        const currentDate = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Current date in Unix timestamp in days
        const mostRecentEvent: Event = events.reduce((prev, current) => (prev.date > current.date ? prev : current));

        return currentDate - mostRecentEvent.date;
    };

    const previousApplication = () => {
        if (currentApplicationIndex > 0) {
            setCurrentApplicationIndex(currentApplicationIndex - 1);
        }
    };

    const nextApplication = () => {
        if (currentApplicationIndex < applications.length - 1) {
            setCurrentApplicationIndex(currentApplicationIndex + 1);
        }
    };

    const daysSinceLastUpdate = calculateDaysSinceLastUpdate(currentApplication.events);

    return (
        <div className="application-view-container">
            {currentApplication.events.length > 0 ? (
                <>
                    <button onClick={previousApplication} className="arrow-button left">
                        &lt;
                    </button>
                    <ApplicationPreview application={currentApplication}>
                    <button onClick={nextApplication} className="arrow-button right">
                        &gt;
                    </button>
                </>
            ) : (
                <p>No Events</p>
            )}
            <p>{`Days Since Last Update: ${daysSinceLastUpdate}`}</p>
        </div>
    );
}