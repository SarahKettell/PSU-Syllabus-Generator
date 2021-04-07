import React, { useState } from 'react';
import SyllabusSchedule from '../scripts/SyllabusSchedule';
// Generate a blank schedule to be filled in, using only the course state/end date

export default function CourseSchedule (props) {

    // Test
    //  start:  August 24, 2020
    //  end:    December 11, 2020

    // Format of date from input
    //  "YYYY-MM-DD"    Type: String
    const start_date = props.course_start_date;
    const end_date = props.course_end_date;


    // should only generate schedule when the start_date/end_date are not null
    let course_schedule = new SyllabusSchedule(start_date, end_date);
    course_schedule.generateSchedule();


    console.log(course_schedule.schedule);

    const schedule_list = 
        <ul>
            <li>List item of things to do this week</li>
            <li>List item of things to do this week</li>
            <li>List item of things to do this week</li>
        </ul>;


    let schedule_header = course_schedule.schedule.map((ele) => 
        <div key={ele.entry_key.toString()}>
            <h3>Week {ele.entry_key}: [Optional Topic] {ele.week}</h3>
            {schedule_list}
        </div>
    );


    //console.log(schedule_header);

    return (
        <div className="course-schedule" id="course-schedule">
            <h2 id="schedule">Course Schedule</h2>
            <div>
                {schedule_header}
            </div>
        </div>
    )
}