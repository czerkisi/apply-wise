import React, {useState} from "react";
import ApplicationPreview from "../../../components/ApplicationPreview";
import {Application} from "../../../Redux/Slices/userSlice";

interface MessageProps {
    applications: Application[];
}

export default function ApplicationViewer(props: MessageProps){
    const applications = props.applications;
    const [currentApplicationIndex, setCurrentApplicationIndex] = useState(0);
    const currentApplication = currentApplicationIndex < applications.length ? applications[currentApplicationIndex]: null;

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


    return (
        <div className="application-view-container">
            {currentApplication && currentApplication.events.length > 0 ? (
                <>
                    <ApplicationPreview application={currentApplication}/>
                    <button onClick={previousApplication} className="arrow-button left">
                        &lt;
                    </button>
                    <button onClick={nextApplication} className="arrow-button right">
                        &gt;
                    </button>
                </>
            ) : (
                <p>No Events</p>
            )}
        </div>
    );
}