import React, {useEffect, useState, Component} from 'react';

// Displays a dynamic checklist that updates as the user adds information to the syllabus

export default function RequirementsChecklist(props) {
    // Assign a shorthand reference to the requirements details sent in props
    const includedContentCheck = props.requirementsInfo;
    return (
        <div className="checklist-section">
            <div className="row">
            <div className="col-sm-12 col-md-8">
                <h2 id="syllabus-checklist">Syllabus Checklist</h2>
                <p>A syllabus is a roadmap that students follow in order to be successful in a course. A thorough syllabus
                    will contain most or all of the following items. To help you keep track of what is required, those
                    items are marked with <span className="required-symbol">an</span> symbol.
                </p>
            </div>
            <div className="col-sm-12 col-md-4 info-box">
                <div className="info-box-title">
                    <i className="material-icons left">lightbulb_outline</i>
                    Tip
                </div>
                <p className="info-box-content">
                    <h6>Track Your Changes</h6>
                    If you build your syllabus using the generator, items in this list will automatically be
                    marked as complete as they are filled in.
                </p>
            </div>
            </div>
            <div className="checklist row">
                <div className="col-sm-12 col-md-6">
                    <div className="checklist-sublist">
                        <h5>Basic Course Information</h5>
                        <ul>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Course ID, Name, Number/Section title</li>
                            <li className="check-item"><i className="material-icons left item-checked">check</i>Credit hours</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Prerequisites (courses, skills, experience)</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Permission from instructor required to register</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Classroom location</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Lab/Recitation location and time</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Class meeting days and times</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>CANVAS information</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Course start/end dates</li>
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5>Instructor Information</h5>
                        <ul>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Full name and title</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Office location</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Office phone</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Office hours and how to arrange a meeting at times not regularly scheduled</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Contact information</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Teaching Assistants’ names, locations, and phone numbers</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Department location and phone number</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Educational Philosophy</li>
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5>Text, Readings, and Materials</h5>
                        <ul>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Textbook(s): title, author, date and edition, publisher, cost, ISBN#</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Other required materials</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Supplementary readings</li>
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5>Course Descriptions and Expectations</h5>
                        <ul>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Course description </li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Course goals</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Learning objectives for students</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Instructional methods to be used</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Technologies to be used</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Descriptions of major assignments</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Student responsibilities are described</li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="checklist-sublist">
                        <h5>Course Policies</h5>
                        <ul>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Academic integrity policy</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Your Grading policy</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Examination policy</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Disability Access Statement</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Reporting Educational Equity Concerns through the Report Bias site</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Mandated Reporting Statement</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Attendance, lateness, policy for missed classes</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Class participation</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Policy for missed assignments, make-up quizzes and exams</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Extra credit policies</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Laboratory safety</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Emergency statement</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Penn State’s Code of Conduct</li>
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5>Course Schedule</h5>
                        <ul>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Syllabus subject to change statement </li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Tentative weekly schedule of topics, assignments and due dates</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Dates for exams/quizzes</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Due dates for major assignments</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Required special events</li>
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5>Available Student Support Services</h5>
                        <ul>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Russell E. Horn Sr. Learning Center, SEC 201 </li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Disability Services, SEC 205</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Library</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Academic Advising, SEC 204</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Career Services & Student Conduct, SEC 212</li>
                            <li className="check-item required-symbol"><i className="material-icons left">check_box_outline_blank</i>Counseling &Psychological Services, SEC 205</li>
                            <li className="check-item"><i className="material-icons left">check_box_outline_blank</i>Technology Help Desk, Basement of Olmsted Building </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}