import './styles/FollowUpApplications.css';
import React from 'react';
import ApplicationViewer from "./ApplicationViewer";
import {useAppSelector} from "../../../Redux/hooks";

export default function FollowUpApplications(){
    const applications = useAppSelector(state => state.user.applications);
    return (
        <div className={'dashboard-section-container thirty-percent-height'}>
            <span className={'dashboard-title-text'}>Consider Following Up</span>
            <ApplicationViewer applications={applications}/>
        </div>
    )
}