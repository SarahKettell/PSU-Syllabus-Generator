import React, {useEffect} from 'react';
import {
    ACADEMIC_INTEGRITY,
    EDUC_EQ,
    MANDATED_REP,
    ATTENDANCE,
    PARTICIPATION,
    GRADING,
    EXAMINATION,
    MISSED_ASSIGNMENTS,
    EXTRA_CREDIT,
    LAB_SAFETY,
    EMERGENCY_STATEMENT,
    LEARNING_CENTER,
    DISABILITY_SERV,
    LIBRARY,
    ACADEMIC_ADVISING,
    CAREER_SERVICES,
    COUNSELING,
    TECH_HELP,
    CODE_OF_CONDUCT,
    DISABILITY_RESOURCES
} from '../information/policy-information';


// Displays and manages the syllabus preview module, which includes the HTML formatted
// content of the syllabus. This content is updated live as the user adds to the form.


export default function SyllabusPreview(props) {

    useEffect( () => {
        console.log(props.content.courseDescriptions.assignment_info);
    })

    const updatePreview = () => {
        props.updatePreview(props.refresh + 1);
    }

    const basicCourseInfo = props.content.basicCourseInfo;
    const instructorInfo = props.content.instructorInfo;
    const courseMaterials = props.content.courseMaterials;
    const courseDescriptions = props.content.courseDescriptions;
    const coursePolicies = props.content.coursePolicies;
    const courseSchedule = props.content.courseSchedule;
    const studentServices = props.content.studentServices;


    // Schedule
    const schedule = courseSchedule.schedule.content;
    const gradingScale = props.content.courseDescriptions.grading_scale;

    // Not sure where to put these
    const schedule_list =
        <ul>
            <li>List item of things to do this week</li>
            <li>List item of things to do this week</li>
            <li>List item of things to do this week</li>
        </ul>;

    if(courseSchedule.add_schedule.content) {
        let schedule_header = schedule.map((ele) =>
            <div key={ele.entry_key.toString()}>
                <h3>Week {ele.entry_key}: [Optional Topic] {ele.week}</h3>
                {schedule_list}
            </div>
        );
    }


    // Assign defaults for each of the fields
    const course_num = "[Course Number]";
    const course_name = "[Course Name]";
    const semester = "[Semester Year]"
    const course_section = "[Section 000]";
    const meeting_location = "[Class Meeting Location]";
    const meeting_times = "[Days], [Start Time] - [End Time]";
    const instructor_name = "[Instructor Name]";
    const email = "[email@psu.edu]";
    const phone = "###-###-####";
    const office_location = "[Office Location]";
    const course_objectives = "<p>[Course Description]</p>" +
        "<ul><li>Example Objective 1</li>" +
        "<li>Example Objective 1</li>" +
        "<li>Example Objective 1</li></ul>";
    const details_needed = "[Add details here]"
    const textbooks = "[APA format - Author, A. A. (Year of publication). Title of work: Capital letter also for subtitle. Location (City, State): Publisher.]"


    return (
        <div className="preview">
            <div className="row">
                <h2 className="col-sm-12" id="syllabus-preview">Syllabus Preview</h2>
            </div>
            <div className="row">
                <p className="col-sm-12">
                    Below is a preview of the syllabus based on the information added above. You can download
                    this to use as your class syllabus or download it incomplete and fill it in as a template.
                </p>
            </div>
            <div className="row">
                <div className="col s12 right-align">
                    <button className="btn-flat waves-effect waves-psu refresh-button" onClick={updatePreview}>
                        <i className="material-icons left">refresh</i>
                        <span>Refresh Preview</span>
                    </button>
                </div>
            </div>
            <div id="html-preview" className="row">
                <div className="syllabus-container col-sm-12">
                    <div className="header">
                        <div className="header-text">
                            <h1>{(basicCourseInfo.course_num.included) ? basicCourseInfo.course_num.content : course_num}: &nbsp;
                                {(basicCourseInfo.course_name.included) ? basicCourseInfo.course_name.content : course_name}
                            </h1>
                            <h2>{(basicCourseInfo.semester.included) ? basicCourseInfo.semester.content : semester}
                                {", "}
                                {(basicCourseInfo.course_section.included) ?
                                    <span>Section {basicCourseInfo.course_section.content}</span> : course_section}</h2>
                            <div className="table-of-contents">
                                <ul className="anchor-links">
                                    <li><a href="#information">Course Information</a></li>
                                    <li><a href="#objectives">Description and Objectives</a></li>
                                    <li><a href="#course_materials">Course Materials</a></li>
                                    <li><a href="#assignment-info">Assignments and Exams</a></li>
                                    <li><a href="#grading_info">Grading Scale</a></li>
                                    <li><a href="#course_policies">Course Policies</a></li>
                                    <li><a href="#additional_policies">Additional Policies</a></li>
                                    <li><a href="#student_services">Student Services</a></li>
                                    {courseSchedule.add_schedule.content &&
                                    <li><a href="#schedule">Course Schedule</a></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="course-information" id="information">
                        <p><span className="title">Instructor:</span>
                            {instructorInfo.instructor_name.included ? instructorInfo.instructor_name.content : instructor_name}
                        </p>
                        {(instructorInfo.department_info.included) &&
                        <p><span className="title">Department:</span>
                            {instructorInfo.department_info.content}
                        </p>
                        }
                        {(instructorInfo.office_phone.included) &&
                        <p><span className="title">Office Phone:</span>
                            {instructorInfo.office_phone.content}
                        </p>
                        }
                        <p><span className="title">Contact Information:</span>
                            {(instructorInfo.contact_info.included) ?
                                <div dangerouslySetInnerHTML={{__html: instructorInfo.contact_info.content}}/>
                                :
                                "[Email, Phone, or other contact preferences]"}
                        </p>
                        {(instructorInfo.ta_info.included) &&
                        <p><span className="title">Teaching Assistant(s):</span>
                            <div dangerouslySetInnerHTML={{__html: instructorInfo.ta_info.content}}/>
                        </p>
                        }
                        <p><span className="title">Class Location:</span>
                            {(basicCourseInfo.class_location.included) ? basicCourseInfo.class_location.content : meeting_location}
                        </p>
                        <p><span className="title">Class Meetings:</span>
                            <ul>
                                <li>
                                    {(basicCourseInfo.class_days.included) ?
                                        <span>
                                            {basicCourseInfo.class_days.content.monday && "Monday, "}
                                            {basicCourseInfo.class_days.content.tuesday && "Tuesday, "}
                                            {basicCourseInfo.class_days.content.wednesday && "Wednesday, "}
                                            {basicCourseInfo.class_days.content.thursday && "Thursday, "}
                                            {basicCourseInfo.class_days.content.friday && "Friday, "}
                                            {basicCourseInfo.class_days.content.saturday && "Saturday, "}
                                            {basicCourseInfo.class_days.content.sunday && "Sunday, "}
                                        </span>
                                        :
                                        "[Days], "}
                                    {basicCourseInfo.class_start_time.included ?
                                        basicCourseInfo.class_start_time.content
                                        :
                                        "[Start Time]"
                                    }
                                    {" - "}
                                    {basicCourseInfo.class_end_time.included ?
                                        basicCourseInfo.class_end_time.content
                                        :
                                        "[End Time]"
                                    }
                                </li>
                            </ul>
                        </p>
                        {(basicCourseInfo.lab_location.included) &&
                        <p><span className="title">Lab Location:</span>
                            {basicCourseInfo.lab_location.content}
                        </p>
                        }
                        <p><span className="title">Lab Meetings:</span>
                            <ul>
                                <li>
                                    {(basicCourseInfo.lab_days.included) ?
                                        <span>
                                            {basicCourseInfo.lab_days.content.monday && "Monday, "}
                                            {basicCourseInfo.lab_days.content.tuesday && "Tuesday, "}
                                            {basicCourseInfo.lab_days.content.wednesday && "Wednesday, "}
                                            {basicCourseInfo.lab_days.content.thursday && "Thursday, "}
                                            {basicCourseInfo.lab_days.content.friday && "Friday, "}
                                            {basicCourseInfo.lab_days.content.saturday && "Saturday, "}
                                            {basicCourseInfo.lab_days.content.sunday && "Sunday, "}
                                        </span>
                                        :
                                        "[Days], "}
                                    {basicCourseInfo.lab_start_time.included ?
                                        basicCourseInfo.lab_start_time.content
                                        :
                                        "[Start Time]"
                                    }
                                    {" - "}
                                    {basicCourseInfo.lab_end_time.included ?
                                        basicCourseInfo.lab_end_time.content
                                        :
                                        "[End Time]"
                                    }
                                </li>
                            </ul>
                        </p>
                        <p><span className="title">Office Hours Location:</span>{office_location}</p>
                        <span className="title">Office Hours:</span>
                        <ul>
                            {instructorInfo.office_hours.included && instructorInfo.office_hours.content.length > 0 ?
                                instructorInfo.office_hours.content.map(slot =>
                                    <li key={"OH_" + slot.office_start_time + "-" + slot.office_end_time}>
                                        {slot.office_days.monday && "Monday, "}
                                        {slot.office_days.tuesday && "Tuesday, "}
                                        {slot.office_days.wednesday && "Wednesday, "}
                                        {slot.office_days.thursday && "Thursday, "}
                                        {slot.office_days.friday && "Friday, "}
                                        {slot.office_days.saturday && "Saturday, "}
                                        {slot.office_days.sunday && "Sunday, "}
                                        {slot.office_start_time} - {slot.office_end_time}
                                    </li>
                                )
                                :
                                <li>{meeting_times}</li>
                            }
                        </ul>
                        {basicCourseInfo.permission_req.content &&
                        <p><span className="title">Note:</span>Permission from the instruction is required to register
                            for this course.</p>}
                        {(instructorInfo.educational_phil.included) &&
                        <p><span className="title">Educational Philosophy:</span>
                            <div dangerouslySetInnerHTML={{__html: instructorInfo.educational_phil.content}}/>
                        </p>
                        }
                    </div>
                    <div className="course-description-objectives" id="prereqs">
                        <h2>Course Details</h2>
                        <span id="course_materials">
                        {courseMaterials.has_no_required.content &&
                            <>
                                <h3>Textbooks</h3>
                                No textbooks or materials are required for this class.
                            </>
                        }
                        {((courseMaterials.textbook_info.req || courseMaterials.textbook_info.included) && !courseMaterials.has_no_required.content) &&
                        <><h3>Textbooks</h3>
                            {(courseMaterials.textbook_info.included) ? <div
                                dangerouslySetInnerHTML={{__html: courseMaterials.textbook_info.content}}/> : textbooks}
                        </>
                        }
                            {((courseMaterials.add_material_info.req || courseMaterials.add_material_info.included) && !courseMaterials.has_no_required.content) &&
                            <><h3>Other Required Materials</h3>
                                {(courseMaterials.add_material_info.included) ? <div
                                    dangerouslySetInnerHTML={{__html: courseMaterials.add_material_info.content}}/> : details_needed}
                            </>
                            }
                            {(courseMaterials.supp_material_info.req || courseMaterials.supp_material_info.included) &&
                            <><h3>Supplementary Readings and Resources</h3>
                                {(courseMaterials.supp_material_info.included) ? <div
                                    dangerouslySetInnerHTML={{__html: courseMaterials.supp_material_info.content}}/> : details_needed}
                            </>
                            }
                            {(basicCourseInfo.canvas_info.req || basicCourseInfo.canvas_info.included) &&
                            <><h3>Canvas Information</h3>
                                {(basicCourseInfo.canvas_info.included) ? <div
                                    dangerouslySetInnerHTML={{__html: basicCourseInfo.canvas_info.content}}/> : details_needed}
                            </>
                            }
                        </span>
                        <span id="objectives">
                        {(courseDescriptions.course_description.req || courseDescriptions.course_description.included) &&
                        <><h3>Course Description</h3>
                            {(courseDescriptions.course_description.included) ? <div
                                dangerouslySetInnerHTML={{__html: courseDescriptions.course_description.content}}/> : details_needed}
                        </>
                        }
                            {(courseDescriptions.course_goals.req || courseDescriptions.course_goals.included) &&
                            <><h3>Course Goals</h3>
                                {(courseDescriptions.course_goals.included) ? <div
                                    dangerouslySetInnerHTML={{__html: courseDescriptions.course_goals.content}}/> : details_needed}
                            </>
                            }
                            {(courseDescriptions.learning_objs.req || courseDescriptions.learning_objs.included) &&
                            <><h3>Learning Objectives</h3>
                                {(courseDescriptions.learning_objs.included) ? <div
                                    dangerouslySetInnerHTML={{__html: courseDescriptions.learning_objs.content}}/> : details_needed}
                            </>
                            }
                            {(basicCourseInfo.prerequisites.req || basicCourseInfo.prerequisites.included) &&
                            <><h3>Prerequisites</h3>
                                {(basicCourseInfo.prerequisites.included) ? <div
                                    dangerouslySetInnerHTML={{__html: basicCourseInfo.prerequisites.content}}/> : details_needed}
                            </>
                            }
                        </span>
                        {(courseDescriptions.tech_used.req || courseDescriptions.tech_used.included) &&
                        <><h3>Technologies to be Used</h3>
                            {(courseDescriptions.tech_used.included) ? <div
                                dangerouslySetInnerHTML={{__html: courseDescriptions.tech_used.content}}/> : details_needed}
                        </>
                        }
                        {(courseDescriptions.instruction_methods.req || courseDescriptions.instruction_methods.included) &&
                        <><h3>Instructional Methods</h3>
                            {(courseDescriptions.instruction_methods.included) ? <div
                                dangerouslySetInnerHTML={{__html: courseDescriptions.instruction_methods.content}}/> : details_needed}
                        </>
                        }
                        {(courseDescriptions.student_responsibilities.req || courseDescriptions.student_responsibilities.included) &&
                        <><h3>Student Responsibilities</h3>
                            {(courseDescriptions.student_responsibilities.included) ? <div
                                dangerouslySetInnerHTML={{__html: courseDescriptions.student_responsibilities.content}}/> : details_needed}
                        </>
                        }
                        {(courseDescriptions.assignment_info.req || courseDescriptions.assignment_info.included) &&
                            <>
                            <h3>Assignment Information</h3>
                            {courseDescriptions.assignment_info.content.map(item =>
                                <div className="assignment-information">
                                    <h4 className="assignment-title">{item.title}: {item.percent_total}%</h4>
                                    <p>{item.points_each} points each, {item.points_total} points total</p>
                                    <div dangerouslySetInnerHTML={{__html: item.description}} />
                                </div>
                            )}
                            </>
                        }
                    </div>
                    <div id="policies">
                        <div className="policy_section" id="course_policies">
                            <h2>Course Policies</h2>
                            {(coursePolicies.grading.req || coursePolicies.grading.included) &&
                            <><h3>Grading Policy</h3>
                                {coursePolicies.grading.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.grading.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: GRADING}}/>
                                }
                            </>
                            }
                            {courseDescriptions.grading_scale.included &&
                            <>
                                <h3 id="grading_info">Grading Scale</h3>
                                <ul className="grading-scale">
                                    <li className="grade-scale-titles">
                                        <span className="grade">Grade</span>
                                        {(courseDescriptions.grading_scale_type.percent)
                                        && <span className="percentage">Percentage</span>}
                                        {(courseDescriptions.grading_scale_type.points)
                                        && <span className="points">Points</span>}
                                    </li>
                                    {gradingScale.content.map(grade =>
                                        <li key={"grade-" + grade.letter}>
                                            <span className="grade">{grade.letter}</span>
                                            {(courseDescriptions.grading_scale_type.percent)
                                            &&
                                            <span className="percentage">{grade.percent.low} &lt; {grade.percent.high}%</span>}
                                            {(courseDescriptions.grading_scale_type.points)
                                            && <span className="points">{grade.points.low} &lt; {grade.points.high} pts</span>}
                                        </li>
                                    )}
                                </ul>
                            </>

                            }
                            {(coursePolicies.exam_policy.req || coursePolicies.exam_policy.checked || coursePolicies.exam_policy.included) &&
                            <><h3>Examination Policy</h3>
                                {coursePolicies.exam_policy.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.exam_policy.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: EXAMINATION}}/>}
                            </>
                            }
                            {(coursePolicies.attendance.req || coursePolicies.attendance.checked || coursePolicies.attendance.included) &&
                            <><h3>Attendance, Lateness, and Policy for Missed Classes</h3>
                                {coursePolicies.attendance.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.attendance.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: ATTENDANCE}}/>}
                            </>
                            }
                            {(coursePolicies.class_participation.req || coursePolicies.class_participation.checked || coursePolicies.class_participation.included) &&
                            <><h3>Class Participation</h3>
                                {coursePolicies.class_participation.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.class_participation.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: PARTICIPATION}}/>}
                            </>
                            }
                            {(coursePolicies.missed_assignments.req || coursePolicies.missed_assignments.checked || coursePolicies.missed_assignments.included) &&
                            <><h3>Missed Assignments, Make-up Quizzes and Exams</h3>
                                {coursePolicies.missed_assignments.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.missed_assignments.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: MISSED_ASSIGNMENTS}}/>}
                            </>
                            }
                            {(coursePolicies.extra_credit.req || coursePolicies.extra_credit.checked || coursePolicies.extra_credit.included) &&
                            <><h3>Extra Credit</h3>
                                {coursePolicies.extra_credit.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.extra_credit.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: EXTRA_CREDIT}}/>}
                            </>
                            }
                            {(coursePolicies.lab_safety.req || coursePolicies.lab_safety.checked || coursePolicies.lab_safety.included) &&
                            <><h3>Laboratory Safety</h3>
                                {coursePolicies.lab_safety.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.lab_safety.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: LAB_SAFETY}}/>}
                            </>
                            }
                            {(coursePolicies.emergency_statement.req || coursePolicies.emergency_statement.checked || coursePolicies.emergency_statement.included) &&
                            <><h3>Emergency Statement</h3>
                                {coursePolicies.emergency_statement.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.emergency_statement.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: EMERGENCY_STATEMENT}}/>}
                            </>
                            }
                            {(coursePolicies.code_of_conduct.req || coursePolicies.code_of_conduct.checked || coursePolicies.code_of_conduct.included) &&
                            <><h3>Penn State's Code of Conduct</h3>
                                {coursePolicies.code_of_conduct.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.code_of_conduct.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: CODE_OF_CONDUCT}}/>}
                            </>
                            }
                        </div>
                        <div className="policy_section" id="additional_policies">
                            <h2>Additional Policies</h2>
                            {(coursePolicies.academic_integrity.req || coursePolicies.academic_integrity.included) &&
                            <><h3>Academic Integrity</h3>
                                {coursePolicies.academic_integrity.included ?
                                    <div
                                        dangerouslySetInnerHTML={{__html: coursePolicies.academic_integrity.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: ACADEMIC_INTEGRITY}}/>}
                            </>
                            }
                            {(coursePolicies.mandated_reporting.req || coursePolicies.mandated_reporting.included) &&
                            <><h3>Mandated Reporting</h3>
                                {coursePolicies.mandated_reporting.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.mandated_reporting.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: MANDATED_REP}}/>}
                            </>
                            }
                            {(coursePolicies.disability_statement.req || coursePolicies.disability_statement.included) &&
                            <><h3>Disability Access</h3>
                                {coursePolicies.disability_statement.included ?
                                    <div
                                        dangerouslySetInnerHTML={{__html: coursePolicies.disability_statement.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: DISABILITY_SERV}}/>}
                            </>
                            }
                            {(coursePolicies.edu_equity.req || coursePolicies.edu_equity.included) &&
                            <><h3>Educational Equity</h3>
                                {coursePolicies.edu_equity.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.edu_equity.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: EDUC_EQ}}/>
                                }
                            </>
                            }
                            {(coursePolicies.emergency_statement.req || coursePolicies.emergency_statement.included) &&
                            <><h3>Emergency Statement</h3>
                                {coursePolicies.emergency_statement.included ?
                                    <div
                                        dangerouslySetInnerHTML={{__html: coursePolicies.emergency_statement.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: EMERGENCY_STATEMENT}}/>}
                            </>
                            }
                            {(coursePolicies.code_of_conduct.req || coursePolicies.code_of_conduct.included) &&
                            <><h3>Penn State's Code of Conduct</h3>
                                {coursePolicies.code_of_conduct.included ?
                                    <div dangerouslySetInnerHTML={{__html: coursePolicies.code_of_conduct.content}}/> :
                                    <div dangerouslySetInnerHTML={{__html: CODE_OF_CONDUCT}}/>
                                }
                            </>
                            }
                        </div>
                        <div className="policy_section" id="student_services">
                            <h2>Student Services</h2>
                            {(studentServices.learning_center.req || studentServices.learning_center.included || studentServices.learning_center.checked) &&
                            <>
                                <h3>Russell E. Horn Sr. Learning Center</h3>
                                <div dangerouslySetInnerHTML={{__html: LEARNING_CENTER}}/>
                            </>
                            }
                            {(studentServices.disability.req || studentServices.disability.included || studentServices.disability.checked) &&
                            <>
                                <h3>Disability Services</h3>
                                <div dangerouslySetInnerHTML={{__html: DISABILITY_RESOURCES}}/>
                            </>
                            }
                            {(studentServices.library.req || studentServices.library.included || studentServices.library.checked) &&
                            <>
                                <h3>Library Services</h3>
                                <div dangerouslySetInnerHTML={{__html: LIBRARY}}/>
                            </>
                            }
                            {(studentServices.academic_advising.req || studentServices.academic_advising.included || studentServices.academic_advising.checked) &&
                            <>
                                <h3>Academic Advising</h3>
                                <div dangerouslySetInnerHTML={{__html: ACADEMIC_ADVISING}}/>
                            </>
                            }
                            {(studentServices.career.req || studentServices.career.included || studentServices.career.checked) &&
                            <>
                                <h3>Career Services & Student Conduct</h3>
                                <div dangerouslySetInnerHTML={{__html: CAREER_SERVICES}}/>
                            </>
                            }
                            {(studentServices.counselling.req || studentServices.counselling.included || studentServices.counselling.checked) &&
                            <>
                                <h3>Counseling & Psychological Services</h3>
                                <div dangerouslySetInnerHTML={{__html: COUNSELING}}/>
                            </>
                            }
                            {(studentServices.tech_help.req || studentServices.tech_help.included || studentServices.tech_help.checked) &&
                            <>
                                <h3>Technology Help Desk, Basement of Olmsted Building:</h3>
                                <div dangerouslySetInnerHTML={{__html: TECH_HELP}}/>
                            </>
                            }
                        </div>
                    </div>
                    {(courseSchedule.add_schedule.included) &&
                    <div className="course-schedule" id="course-schedule">
                        <h2 id="schedule">Course Schedule</h2>
                        <div>
                            {schedule.map((ele) =>
                                <div key={ele.entry_key.toString()}>
                                    <h3>Week {ele.entry_key}: [Optional Topic] {ele.week}</h3>
                                    {schedule_list}
                                </div>
                            )}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}
