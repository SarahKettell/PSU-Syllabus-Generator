import React, {useEffect, useState, Component} from 'react';

// Displays a dynamic checklist that updates as the user adds information to the syllabus

export default function RequirementsChecklist(props) {
    // Assign a shorthand reference to the requirements details sent in props
    const includedContentCheck = props.requirementsInfo;
    return (
        <div className="row">
            <h2 id="syllabus-checklist">Syllabus Checklist for 2020-2021</h2>
            <p>A syllabus is a roadmap that students follow in order to be successful in a course. A thorough syllabus
                will contain most or all of the following items. To help you keep track of what is required, those
                items are marked with <span className="required-symbol">a</span> symbol.
            </p>
            <div className="checklist">
                <div className="col s6 m4">
                    <h5>Basic Course Information</h5>
                    <ul>
                        <li className="check-item" name="course_num">{includedContentCheck.course_num.added && <span className="included-symbol"></span>}{includedContentCheck.course_num.content} </li>
                        <li className="check-item" name="course_name">{includedContentCheck.course_name.content} {includedContentCheck.course_name.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="meeting_location">{includedContentCheck.meeting_location.content} {includedContentCheck.meeting_location.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="meeting_times">{includedContentCheck.meeting_times.content} {includedContentCheck.meeting_times.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <h5>Instructor Information</h5>
                    <ul>
                        <li className="check-item" name="course_num">{includedContentCheck.course_num.content} {includedContentCheck.course_num.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="course_name">{includedContentCheck.course_name.content} {includedContentCheck.course_name.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="meeting_location">{includedContentCheck.meeting_location.content} {includedContentCheck.meeting_location.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="meeting_times">{includedContentCheck.meeting_times.content} {includedContentCheck.meeting_times.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <h5>Text, Readings, and Materials</h5>
                    <ul>
                        <li className="check-item required-symbol" name="instructor_name">{includedContentCheck.instructor_name.content} {includedContentCheck.instructor_name.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="instructor_contact">{includedContentCheck.instructor_contact.content} {includedContentCheck.instructor_contact.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="office_hours">{includedContentCheck.office_hours.content} {includedContentCheck.office_hours.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <h5>Course Descriptions and Expectations</h5>
                    <ul>
                        <li className="check-item required-symbol" name="course_objectives">{includedContentCheck.course_objectives.content} {includedContentCheck.course_objectives.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="course_prereqs">{includedContentCheck.course_prereqs.content} {includedContentCheck.course_prereqs.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="req_materials">Required Materials {(includedContentCheck.req_textbooks.added || includedContentCheck.req_add_materials.added || includedContentCheck.req_lab_info.added) && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="add_materials">{includedContentCheck.add_materials.content} {includedContentCheck.add_materials.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="assessment_info">{includedContentCheck.assessment_info.content} {includedContentCheck.assessment_info.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="exam_info">{includedContentCheck.exam_info.content} {includedContentCheck.exam_info.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item" name="detailed_sched">{includedContentCheck.detailed_sched.content} {includedContentCheck.detailed_sched.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <h5>Course Policies</h5>
                    <ul>
                        <li className="check-item required-symbol" name="required_policies_0">{includedContentCheck.required_policies.content[0]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_1">{includedContentCheck.required_policies.content[1]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_2">{includedContentCheck.required_policies.content[2]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_3">{includedContentCheck.required_policies.content[3]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_4">{includedContentCheck.required_policies.content[4]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_5">{includedContentCheck.required_policies.content[5]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}