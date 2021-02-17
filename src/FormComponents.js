import React, {useState} from "react";

export function BasicCourseInfo(){
    const [courseInfo, setCourseInfo] = useState( {
        course_num:         {content: "", req: false},
        course_name:        {content: "", req: false},
        course_section:     {content: "", req: false},
        num_credit_hours:   {content: "", req: false},
        prerequisites:      {content: "", req: false},
        permission_req:     {content: false, req: false},
        class_location:     {content: [], req: false},
        class_time:         {content: [], req: false},
        class_days:         {content: [], req: false},
        lab_location:       {content: [], req: false},
        lab_time:           {content: [], req: false},
        canvas_info:        {content: "", req: false},
        start_date:         {content: "", req: false},
        end_date:           {content: "", req: false}
    });

    function handleCourseInfo(){

    }

    return(
        <fieldset className="row">
            <legend id="basic-course-info">Basic Course Information</legend>
            <div className="form-section">
                <p>Description for information in this section goes here.</p>
                <div className="input-field col s12 m6">
                    <label htmlFor="course_name">Course Number:</label>
                    <input type="text" id="course_name" placeholder="EDUC 305"
                           name="course_num"
                           value={courseInfo.course_num.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="course_name">Course Name:</label>
                    <input type="text" id="course_name" placeholder="Creative Arts"
                           name="course_name"
                           value={courseInfo.course_name.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m6">
                    <label id="course_section">Section:</label>
                    <input type="email" id="course_section" placeholder="001"
                           name="course_section"
                           value={courseInfo.course_section.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="meeting_location">Meeting Location:</label>
                    <input type="text" id="meeting_location" placeholder="Olmsted 205"
                           name="meeting_location"
                           value={courseInfo.meeting_location}
                           onChange={handleCourseInfo}/>
                </div>
            </div>
        </fieldset>
    )
}

export function InstructorInfo(){
    const [instructorInfo, setInstructorInfo] = useState({
        instructor_name: {content: "", req: true},
        office_location: {content: "", req: false},
        office_phone: {content: "", req: false},
        office_hours: {content: [], req: false},
        contact_info: {content: "", req: true},
        ta_info: {content: "", req: false},
        department_info: {content: "", req: false},
        social_info: {content: "", req: false},
        educational_phil: {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}

export function CourseMaterials(){
    const [courseMaterials, setCourseMaterials] = useState({
        textbook_info: {content: "", req: true},
        add_material_info: {content: "", req: true},
        supp_material_info: {content: "", req: false},
    });

    return(
        <div>Test</div>
    )
}

export function CourseDescriptions(){
    const [courseDescriptions, setCourseDescriptions] = useState({
        course_description: {content: "", req: true},
        course_goals: {content: "", req: false},
        learning_objs: {content: "", req: false},
        tech_used: {content: "", req: false},
        assignment_info: {content: [], req: false},
        student_responsibilities: {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}

export function CoursePolicies(){
    const [coursePolicies, setCoursePolicies] = useState({
        academic_integrity: {content: "", req: true},
        grading: {content: "", req: true},
        exam_policy: {content: "", req: true},
        disability_statement: {content: "", req: true},
        edu_equity: {content: "", req: false},
        mandated_reporting: {content: "", req: true},
        attendance: {content: "", req: false},
        class_participation: {content: "", req: false},
        missed_assignments: {content: "", req: false},
        extra_credit: {content: "", req: false},
        lab_safety: {content: "", req: false},
        emergency_statement: {content: "", req: false},
        code_of_conduct: {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}

export function CourseSchedule(){
    const [courseScheduleInfo, setCourseScheduleInfo] = useState({
        syllabus_changes: {content: "", req: false},
        test_dates: {content: "", req: false},
        major_assignment_dates: {content: "", req: false},
        special_events: {content: "", req: false}
    });

    const [weeklySchedule, setWeeklySchedule] = useState({
       // add info here
    });

    return(
        <div>Test</div>
    )
}

export function AvailableStudentServices(){
    const [supportServices, setSupportServices] = useState({
        learning_center: {content: "", req: false},
        disability: {content: "", req: true},
        library: {content: "", req: false},
        academic_advising: {content: "", req: false},
        career: {content: "", req: false},
        counselling: {content: "", req: true},
        tech_help: {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}