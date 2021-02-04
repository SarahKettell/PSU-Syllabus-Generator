import React, {useEffect, useState, Component} from 'react';

// Displays a dynamic checklist that updates as the user adds information to the syllabus

export default function RequirementsChecklist(props) {
    // Assign a shorthand reference to the requirements details sent in props
    const includedContentCheck = props.requirementsInfo;
    return (
        <div className="row main-content-row">
            <h2 id="syllabus-checklist">Syllabus Checklist</h2>
            <div className="checklist">
                <ul>
                    <li>Course Information</li>
                    <ul>
                        <li className="check-item optional-symbol" name="course_num">{includedContentCheck.course_num.content} {includedContentCheck.course_num.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item optional-symbol" name="course_name">{includedContentCheck.course_name.content} {includedContentCheck.course_name.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item optional-symbol" name="meeting_location">{includedContentCheck.meeting_location.content} {includedContentCheck.meeting_location.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item optional-symbol" name="meeting_times">{includedContentCheck.meeting_times.content} {includedContentCheck.meeting_times.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <li>Contact information</li>
                    <ul>
                        <li className="check-item required-symbol" name="instructor_name">{includedContentCheck.instructor_name.content} {includedContentCheck.instructor_name.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="instructor_contact">{includedContentCheck.instructor_contact.content} {includedContentCheck.instructor_contact.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="office_hours">{includedContentCheck.office_hours.content} {includedContentCheck.office_hours.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <li>Course Description</li>
                    <ul>
                        <li className="check-item required-symbol" name="course_objectives">{includedContentCheck.course_objectives.content} {includedContentCheck.course_objectives.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item optional-symbol" name="course_prereqs">{includedContentCheck.course_prereqs.content} {includedContentCheck.course_prereqs.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="req_materials">Required Materials {(includedContentCheck.req_textbooks.added || includedContentCheck.req_add_materials.added || includedContentCheck.req_lab_info.added) && <span className="included-symbol"></span>}</li>
                        <li className="check-item optional-symbol" name="add_materials">{includedContentCheck.add_materials.content} {includedContentCheck.add_materials.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="assessment_info">{includedContentCheck.assessment_info.content} {includedContentCheck.assessment_info.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="exam_info">{includedContentCheck.exam_info.content} {includedContentCheck.exam_info.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item optional-symbol" name="detailed_sched">{includedContentCheck.detailed_sched.content} {includedContentCheck.detailed_sched.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <li>Additional Content</li>
                    <ul>
                        <li className="check-item optional-symbol" name="additional_content">{includedContentCheck.additional_content.content} {includedContentCheck.additional_content.added && <span className="included-symbol"></span>}</li>
                    </ul>
                    <li>Required Policies</li>
                    <ul>
                        <li className="check-item required-symbol" name="required_policies_0">{includedContentCheck.required_policies.content[0]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_1">{includedContentCheck.required_policies.content[1]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_2">{includedContentCheck.required_policies.content[2]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_3">{includedContentCheck.required_policies.content[3]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_4">{includedContentCheck.required_policies.content[4]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                        <li className="check-item required-symbol" name="required_policies_5">{includedContentCheck.required_policies.content[5]} {includedContentCheck.required_policies.added && <span className="included-symbol"></span>}</li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}