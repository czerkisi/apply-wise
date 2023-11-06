import React, {useEffect, useState} from 'react';

import './styles/Dashboard.css';
import {useAppSelector} from "../../../Redux/hooks";
import {UserState} from "../../../Redux/Slices/userSlice";
import Header from "../../../components/Header";
import TitleText from "./TitleText";
import TaskViewer from "./TaskViewer";
import {Event} from "../../../Redux/Slices/userSlice";
import FollowUpApplications from "./FollowUpApplications";

export default function Dashboard(){
    const user = useAppSelector(state => state.user);
    const overdue = isOverdue(user);
    const [upcomingTasks, setUpcomingTasks] = useState<Event[]>([]);
    const [overdueTasks, setOverdueTasks] = useState<Event[]>([]);

    function isOverdue(user: UserState): boolean {
        const currentDate = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Current date in Unix timestamp in days
        for (const application of user.applications) {
            for (const event of application.events) {
                if (!event.complete && event.date <= currentDate) {
                    return true;
                }
            }
        }
        return false;
    }

    useEffect(() => {
        const currentDate = Math.floor(Date.now() / (24 * 60 * 60 * 1000)); // Current date in Unix timestamp in days

        const overdueTasks = [];
        const dueIn7DaysTasks = [];

        for (const application of user.applications) {
            for (const event of application.events) {
                const eventDate = event.date;

                if (!event.complete) {
                    if (eventDate < currentDate) {
                        overdueTasks.push(event);
                    } else {
                        // Calculate the date 7 days from now
                        const sevenDaysFromNow = currentDate + 7;

                        if (eventDate <= sevenDaysFromNow) {
                            dueIn7DaysTasks.push(event);
                        }
                    }
                }
            }
        }

        setOverdueTasks(overdueTasks);
        setUpcomingTasks(dueIn7DaysTasks);
    }, [overdue, user.applications]);

    return (
        <div>
            <Header />
            <div className="horizontal-container">
                <div className="half-screen-div">
                    <TitleText
                        overdue={overdue}
                        numTasks={overdue ? overdueTasks.length : upcomingTasks.length}
                        name={user.name === null ? '': user.name}
                    />
                    <TaskViewer tasks={overdueTasks} title={'Overdue'} />
                </div>
                <div className="half-screen-div">
                    <TaskViewer tasks={upcomingTasks} title={'Upcoming'} />
                    <FollowUpApplications />
                </div>
            </div>
        </div>
    )
}