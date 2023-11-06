import React, { useState } from 'react';
import {Application, Event, saveApplication} from "../Redux/Slices/userSlice";
import {useAppDispatch} from "../Redux/hooks";

interface ApplicationOverlayProps {
    application: Application;
}

const ApplicationOverlay: React.FC<ApplicationOverlayProps> = ({ application }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedApplication, setEditedApplication] = useState(application);
    const dispatch = useAppDispatch();

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = () => {
        setIsEditMode(false);
        const token = localStorage.getItem('token');
        if (token !== null){
            dispatch(saveApplication({ token, application: editedApplication}))

        }
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
        setEditedApplication(application);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditedApplication({
            ...editedApplication,
            [name]: value,
        });
    };

    return (
        <div className="application-overlay">
            {isEditMode ? (
                <>
                    <h2>
                        <input
                            type="text"
                            name="companyName"
                            value={editedApplication.companyName}
                            onChange={handleChange}
                        />
                    </h2>
                    <p>
                        Job Title:{' '}
                        <input
                            type="text"
                            name="jobTitle"
                            value={editedApplication.jobTitle}
                            onChange={handleChange}
                        />
                    </p>
                    {editedApplication.recruiterName && (
                        <p>
                            Recruiter:{' '}
                            <input
                                type="text"
                                name="recruiterName"
                                value={editedApplication.recruiterName}
                                onChange={handleChange}
                            />
                        </p>
                    )}
                    {editedApplication.recruiterEmail && (
                        <p>
                            Email:{' '}
                            <input
                                type="text"
                                name="recruiterEmail"
                                value={editedApplication.recruiterEmail}
                                onChange={handleChange}
                            />
                        </p>
                    )}
                </>
            ) : (
                <>
                    <h2>{application.companyName}</h2>
                    <p>Job Title: {application.jobTitle}</p>
                    {application.recruiterName && <p>Recruiter: {application.recruiterName}</p>}
                    {application.recruiterEmail && <p>Email: {application.recruiterEmail}</p>}
                </>
            )
            }
            <div className="events">
                <h3>Events</h3>
                <ul>
                    {editedApplication.events.map((event: Event, index: number) => (
                        <li key={index}>
                            <div>
                                <h4>{event.title}</h4>
                                <p>Type: {event.type}</p>
                                <p>Date: {new Date(event.date * 1000).toLocaleDateString()}</p>
                                <p>Complete: {event.complete ? 'Yes' : 'No'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {isEditMode ? (
                <div>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </div>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
        </div>
    );
};

export default ApplicationOverlay;