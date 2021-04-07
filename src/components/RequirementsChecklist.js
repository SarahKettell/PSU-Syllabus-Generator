import React, {useEffect, useState} from 'react';

// Displays a dynamic checklist that updates as the user adds information to the syllabus


export default function RequirementsChecklist(props) {
    // used to check if included
    const basicCourseInfo = props.content.basicCourseInfo;
    const instructorInfo = props.content.instructorInfo;
    const courseMaterials = props.content.courseMaterials;
    const courseDescriptions = props.content.courseDescriptions;
    const coursePolicies = props.content.coursePolicies;
    const courseSchedule = props.content.courseSchedule;
    const studentServices = props.content.studentServices;

    const [checklist, setChecklist] = useState({
        basicCourseInfo: {
            course_num:     {removed: false, icon_style: 'remove', name: "Course Number"},
            course_name:    {removed: false, icon_style: 'remove', name: "Course Name"},
            course_section: {removed: false, icon_style: 'remove', name: "Course Section"},
            num_credits:    {removed: false, icon_style: 'remove', name: "Credit Hours"},
            prerequisites:  {removed: false, icon_style: 'remove', name: "Prerequisites (courses, skills, experience)"},
            permission_req: {removed: false, icon_style: 'remove', name: "Permission from instructor required to register"},
            class_location: {removed: false, icon_style: 'remove', name: "Classroom Location"},
            class_days:     {removed: false, icon_style: 'remove', name: "Class meeting times"},
            lab_location:   {removed: false, icon_style: 'remove', name: "Lab/Recitation location"},
            lab_days:       {removed: false, icon_style: 'remove', name: "Lab/Recitation times"},
            canvas_info:    {removed: false, icon_style: 'remove', name: "CANVAS Information"},
            semester:       {removed: false, icon_style: 'remove', name: "Semester"},
        },
        instructorInfo: {
            instructor_name:    {removed: false, icon_style: 'remove', name: "Full name and title"},
            office_location:    {removed: false, icon_style: 'remove', name: "Office location"},
            office_phone:       {removed: false, icon_style: 'remove', name: "Office phone"},
            contact_info:       {removed: false, icon_style: 'remove', name: "Contact information"},
            ta_info:            {removed: false, icon_style: 'remove', name: "TA information"},
            department_info:    {removed: false, icon_style: 'remove', name: "Department information"},
            office_hours:       {removed: false, icon_style: 'remove', name: "Office Hours"},
            educational_phil:   {removed: false, icon_style: 'remove', name: "Educational Philosophy"}
        },
        courseMaterials: {
            textbook_info:      {removed: false, icon_style: 'remove', name: "Textbook(s): title, author, date and edition, publisher, cost, ISBN#"},
            add_material_info:  {removed: false, icon_style: 'remove', name: "Other required materials"},
            supp_material_info: {removed: false, icon_style: 'remove', name: "Supplementary readings"}
        },
        courseDescriptions: {
            course_description:         {removed: false, icon_style: 'remove', name: "Course description"},
            course_goals:               {removed: false, icon_style: 'remove', name: "Course goals"},
            learning_objs:              {removed: false, icon_style: 'remove', name: "Learning objectives for students"},
            instruction_methods:        {removed: false, icon_style: 'remove', name: "Instructional methods"},
            tech_used:                  {removed: false, icon_style: 'remove', name: "Technologies to be used"},
            student_responsibilities:   {removed: false, icon_style: 'remove', name: "Student responsibilities"},
            grading_scale: 				{removed: false, icon_style: 'remove', name: "Grading scales"},
            assignment_info:            {removed: false, icon_style: 'remove', name: "Descriptions of major assignments"},
        },
        coursePolicies: {
            academic_integrity:     {removed: false, icon_style: 'remove', name: "Academic integrity policy"},
            grading:                {removed: false, icon_style: 'remove', name: "Your Grading policy"},
            exam_policy:            {removed: false, icon_style: 'remove', name: "Examination policy"},
            disability_statement:   {removed: false, icon_style: 'remove', name: "Disability Access Statement"},
            edu_equity:             {removed: false, icon_style: 'remove', name: "Reporting Educational Equity Concerns"},
            mandated_reporting:     {removed: false, icon_style: 'remove', name: "Mandated Reporting Statement"},
            attendance:             {removed: false, icon_style: 'remove', name: "Attendance, lateness, policy for missed classes"},
            class_participation:    {removed: false, icon_style: 'remove', name: "Class participation"},
            missed_assignments:     {removed: false, icon_style: 'remove', name: "Policy for missed assignments, make-up quizzes and exams"},
            extra_credit:           {removed: false, icon_style: 'remove', name: "Extra credit policies"},
            lab_safety:             {removed: false, icon_style: 'remove', name: "Laboratory safety"},
            emergency_statement:    {removed: false, icon_style: 'remove', name: "Emergency statement"},
            code_of_conduct:        {removed: false, icon_style: 'remove', name: "Penn State’s Code of Conduct"},
        },
        courseSchedule: {
            start_date:             {removed: false, icon_style: 'remove', name: "Course Start Date"},
            end_date:               {removed: false, icon_style: 'remove', name: "Course End Date"},
            add_schedule: 			{removed: false, icon_style: 'remove', name: "Tentative weekly schedule"},
        },
        studentServices: {
            learning_center:        {removed: false, icon_style: 'remove', name: "Russell E. Horn Sr. Learning Center, SEC 201"},
            disability:             {removed: false, icon_style: 'remove', name: "Disability Services, SEC 205"},
            library:                {removed: false, icon_style: 'remove', name: "Library Services"},
            academic_advising:      {removed: false, icon_style: 'remove', name: "Academic Advising, SEC 204"},
            career:                 {removed: false, icon_style: 'remove', name: "Career Services & Student Conduct, SEC 212"},
            counselling:            {removed: false, icon_style: 'remove', name: "Counseling &Psychological Services, SEC 205"},
            tech_help:              {removed: false, icon_style: 'remove', name: "Technology Help Desk, Basement of Olmsted Building"},
        }
    });
    useEffect(() => {
        props.updateState(checklist);
    });

    function removeItem(props) {
        const category = props.target.getAttribute('name').split("-")[0];
        const fieldName = props.target.getAttribute('name').split("-")[1];
        const remove = !checklist[category][fieldName].removed;
        const contents = checklist[category][fieldName].name;
        if(remove) {setChecklist({
            ...checklist,
            [category]: {
                ...checklist[category],
                [fieldName]: {removed: remove, icon_style: 'add', name: contents}
            }
        })}
        else {setChecklist({
            ...checklist,
            [category]: {
                ...checklist[category],
                [fieldName]: {removed: remove, icon_style: 'remove', name: contents}
            }
        })}
    }

    return (
        <div className="checklist-section">
            <div className="row">
            <div className="col-sm-12 col-md-8">
                <h2 id="syllabus-checklist">Syllabus Checklist</h2>
                <p>A syllabus is a roadmap that students follow in order to be successful in a course. A thorough syllabus
                    will contain most or all of the following items. To help you keep track of what is required, those
                    items are marked with <span className="required-symbol">an</span> symbol.
                </p>
                <p className="alert"><span className="emph">Development Note: </span> The "Remove/Add Item From/To Syllabus" feature currently only works for the checklist.
                    It will not remove them from the form fields below or the syllabus preview/download.
                    This feature is still being developed.
                </p>
            </div>
            <div className="col-sm-12 col-md-4 info-box">
                <div className="info-box-title">
                    <i className="material-icons left">lightbulb_outline</i>
                    Tip
                </div>
                <div className="info-box-content">
                    <h6>Track Your Changes</h6>
                    If you build your syllabus using the generator, items in this list will automatically be
                    marked as complete as they are filled in.
                </div>
            </div>
            </div>
            <div className="checklist-legend row">
                <div className="col-sm-12">
                    <div className="emph">Legend: </div>
                    <div><i className="material-icons checkmark left">check</i>Included</div>
                    <div><i className="material-icons left">check_box_outline_blank</i>Not Included</div>
                    <div><i className="material-icons remove left">remove_circle_outline</i>Remove Item from Syllabus</div>
                    <div><i className="material-icons add left">add_circle_outline</i>Add Item to Syllabus</div>
                    <div><span className="required-symbol">Required Item</span></div>
                </div>
            </div>
            <div className="checklist row">
                <div className="col-sm-12 col-md-6">
                    <div className="checklist-sublist">
                        <h5><a href="#basic-course-info">Basic Course Information</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.basicCourseInfo).map(([key, value]) =>
                                <li key={"basicCourseInfo-" + key} className={"adv_checklist_item col s12" + " "
                                + (basicCourseInfo[key].req ? 'required-symbol' : '') + " "
                                + (basicCourseInfo[key].included ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"basicCourseInfo-" + key} onClick={removeItem} disabled={basicCourseInfo[key].req}>
                                        <i name={"basicCourseInfo-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + ((basicCourseInfo[key].included && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{basicCourseInfo[key].included ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5><a href="#instructor-information">Instructor Information</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.instructorInfo).map(([key, value]) =>
                                <li key={"instructorInfo-" + key} className={"adv_checklist_item col s12" + " "
                                + (instructorInfo[key].req ? 'required-symbol' : '') + " "
                                + (instructorInfo[key].included ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"instructorInfo-" + key} onClick={removeItem} disabled={instructorInfo[key].req}>
                                        <i name={"instructorInfo-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + ((instructorInfo[key].included && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{instructorInfo[key].included ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5><a href="#course-materials">Text, Readings, and Materials</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.courseMaterials).map(([key, value]) =>
                                <li key={"courseMaterials-" + key} className={"adv_checklist_item col s12" + " "
                                + (courseMaterials[key].req ? 'required-symbol' : '') + " "
                                + (courseMaterials[key].included ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"courseMaterials-" + key} onClick={removeItem} disabled={courseMaterials[key].req}>
                                        <i name={"courseMaterials-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + ((courseMaterials[key].included && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{courseMaterials[key].included ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5><a href="#course-description">Course Descriptions and Expectations</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.courseDescriptions).map(([key, value]) =>
                                <li key={"courseDescriptions-" + key} className={"adv_checklist_item col s12" + " "
                                + (courseDescriptions[key].req ? 'required-symbol' : '') + " "
                                + (courseDescriptions[key].included ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"courseDescriptions-" + key} onClick={removeItem} disabled={courseDescriptions[key].req}>
                                        <i name={"courseDescriptions-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + ((courseDescriptions[key].included && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{courseDescriptions[key].included ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6">
                    <div className="checklist-sublist">
                        <h5><a href="#course-schedule">Course Schedule</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.courseSchedule).map(([key, value]) =>
                                <li key={"courseSchedule-" + key} className={"adv_checklist_item col s12 " + " "
                                + (courseSchedule[key].req ? 'required-symbol' : '') + " "
                                + (courseSchedule[key].included ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"basicCourseInfo-" + key} onClick={removeItem} disabled={courseSchedule[key].req}>
                                        <i name={"courseSchedule-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + ((courseSchedule[key].included && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{courseSchedule[key].included ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5><a href="#course-policies">Course Policies</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.coursePolicies).map(([key, value]) =>
                                <li key={"coursePolicies-" + key} className={"adv_checklist_item col s12" + " "
                                + (coursePolicies[key].req ? 'required-symbol' : '') + " "
                                + (coursePolicies[key].included || coursePolicies[key].checked ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"coursePolicies-" + key} onClick={removeItem} disabled={coursePolicies[key].req}>
                                        <i name={"coursePolicies-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + (((coursePolicies[key].included || coursePolicies[key].checked) && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{(coursePolicies[key].included || coursePolicies[key].checked) ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="checklist-sublist">
                        <h5><a href="#student-services">Available Student Support Services</a></h5>
                        <ul className="adv_checklist">
                            {Object.entries(checklist.studentServices).map(([key, value]) =>
                                <li key={"studentServices-" + key} className={"adv_checklist_item col s12" + " "
                                + (studentServices[key].req ? 'required-symbol' : '') + " "
                                + (studentServices[key].included || studentServices[key].checked ? 'included' : '') + " "
                                + (value.removed ? 'removed' : '')}>
                                    <button className="btn-flat left" name={"studentServices-" + key} onClick={removeItem} disabled={studentServices[key].req}>
                                        <i name={"studentServices-" + key} className={"material-icons " + value.icon_style}>
                                            {value.removed ? "add_circle_outline" : "remove_circle_outline"}</i>
                                    </button>
                                    {value.name}
                                    <i className={"material-icons right " + (((studentServices[key].included || studentServices[key].checked) && !value.removed) ? 'checkmark' : '')}>
                                        {value.removed ?
                                            <span className="remove_check">disabled_by_default</span>
                                            :
                                            <>{(studentServices[key].included || studentServices[key].checked) ? "check" : "check_box_outline_blank"}</>
                                        }
                                    </i>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
