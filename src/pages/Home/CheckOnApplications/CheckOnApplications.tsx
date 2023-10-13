import './CheckOnApplications.css';
import {useAppSelector} from "../../../Redux/hooks";
import {useEffect, useState} from "react";
import {Application} from "../../../Redux/Slices/userSlice";

export default function CheckOnApplications(){
    const applications = useAppSelector(state => state.user.applications);
    const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);

    function filterApplications(applications: Application[]): Application[] {
        const currentDate = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Current date in Unix timestamp in days

        return applications.filter(application => {
            if (application.events.length === 0) {
                return true; // No events, include the application
            }

            // Find the most recent event
            const mostRecentEvent = application.events.reduce((prev, current) => {
                return prev.date > current.date ? prev : current;
            });

            if (mostRecentEvent.date < currentDate - 3) {
                return true; // Most recent event is more than 3 days ago, include the application
            }

            return false; // Exclude the application
        });
    }

    useEffect(() => {
        setFilteredApplications(filterApplications(applications));
    }, [applications]);



}