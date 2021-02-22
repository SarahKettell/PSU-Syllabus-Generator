import React, {useState} from "react";
import ControlledEditor from "./ControlledEditor";

export function BasicCourseInfo(){
    const [courseInfo, setCourseInfo] = useState( {
            course_num:         {content: "", req: false},
            course_name:        {content: "", req: false},
            course_section:     {content: "", req: false},
            num_credits:   {content: "", req: false},
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
                    <label id="f1-1" htmlFor="course_name">Course Number:</label>
                    <input type="text" id="course_name" placeholder="EDUC 305"
                           name="course_num"
                           value={courseInfo.course_num.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m3">
                    <label id="f1-2" id="course_section">Section:</label>
                    <input type="email" id="course_section" placeholder="001"
                           name="course_section"
                           value={courseInfo.course_section.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m3">
                    <label id="f1-3" id="course_section">Number of Credits:</label>
                    <input type="number" id="num_credits" placeholder="3"
                           name="num_credits"
                           value={courseInfo.num_credits.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m6">
                    <label id="f1-4" htmlFor="course_name">Course Name:</label>
                    <input type="text" id="course_name" placeholder="Creative Arts"
                           name="course_name"
                           value={courseInfo.course_name.content}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="input-field col s12 m6">
                    <label id="f1-5" htmlFor="meeting_location">Class Meeting Location:</label>
                    <input type="text" id="meeting_location" placeholder="Olmsted 205"
                           name="meeting_location"
                           value={courseInfo.meeting_location}
                           onChange={handleCourseInfo}/>
                </div>
                <div className="form-divider col s12"></div>
                <div class="input-field col s12 m6">
                    <input id="end-date" type="date"
                           name="start_date"
                           value={courseInfo.start_date.content}
                           onChange={handleCourseInfo}/>
                    <label id="f1-6" className="active" htmlFor="start-date">Course Start Date:</label>
                </div>
                <div class="input-field col s12 m6">
                    <input id="end-date" type="date"
                           name="end_date"
                           value={courseInfo.end_date.content}
                           onChange={handleCourseInfo}
                    />
                    <label id="f1-7" htmlFor="end-date" className="active">Course End Date:</label>
                </div>
                <div className="col s12">
                        <p id="f1-8" className="simple-radio-group">
                            <span className="radio-title"> Is permission from the instructor required to register?</span>
                            <label>
                                <input className="with-gap" name="permission_req" type="radio"/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input className="with-gap" name="permission_req" type="radio" checked/>
                                <span>No</span>
                            </label>
                        </p>
                </div>
                <div className="col s12 m12">
                    <label htmlFor="prerequisites">Prerequisites:</label>
                    <ControlledEditor updateContent={handleCourseInfo} id="course_prereqs"/>
                </div>
                <div className="col s12 m12">
                    <label htmlFor="prerequisites">Canvas Information:</label>
                    <ControlledEditor updateContent={handleCourseInfo} id="canvas_info"/>
                </div>
            </div>
        </fieldset>
    )
}

export function InstructorInfo(){
    const [instructorInfo, setInstructorInfo] = useState({
        instructor_name:    {content: "", req: true},
        office_location:    {content: "", req: false},
        office_phone:       {content: "", req: false},
        office_hours:       {content: [], req: false},
        contact_info:       {content: "", req: true},
        ta_info:            {content: "", req: false},
        department_info:    {content: "", req: false},
        educational_phil:   {content: "", req: false}
    });

    function handleInstructorInfo(){
    }

    return(
        <fieldset className="row">
            <legend id="instructor-information">Instructor Information</legend>
            <div className="form-section">
                <p>Description for information in this section goes here.</p>
                <div className="input-field col s12 m6">
                    <label htmlFor="name"><span className="required-symbol">Instructor Name:</span></label>
                    <input type="text" id="name" name="name" placeholder="Dr. John Smith" required="Required"
                           name="instructor_name"
                           value={instructorInfo.instructor_name.content}
                           onChange={handleInstructorInfo}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="department_info">Department:</label>
                    <input type="text" id="department_info" name="department_info" placeholder="School of Humanities" required=""
                           name="department_info"
                           value={instructorInfo.department_info.content}
                           onChange={handleInstructorInfo}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="office">Office Location:</label>
                    <input type="text" id="office" name="office" placeholder="Olmsted 203" required=""
                           name="office_location"
                           value={instructorInfo.office_location.content}
                           onChange={handleInstructorInfo}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="phone">Office Phone:</label>
                    <input type="tel" id="phone" name="phone" placeholder="000-000-0000" required=""
                           name="phone"
                           value={instructorInfo.office_phone.content}
                           onChange={handleInstructorInfo}
                    />
                </div>
                <div className="col s12 m12">
                    <label htmlFor="contact_info"><span className="required-symbol">Contact Information and Preferences:</span></label>
                    <ControlledEditor updateContent={handleInstructorInfo()} id="contact_info"/>
                </div>
                <div className="col s12 m12">
                    <label htmlFor="ta_info">Teaching Assistant(s) Information:</label>
                    <ControlledEditor updateContent={handleInstructorInfo()} id="ta_info"/>
                </div>
                <div className="col s12 m12">
                    <label htmlFor="educational_phil">Educational Philosophy:</label>
                    <ControlledEditor updateContent={handleInstructorInfo()} id="educational_phil"/>
                </div>
            </div>
        </fieldset>
    )
}

export function CourseMaterials(){
    const [courseMaterials, setCourseMaterials] = useState({
        textbook_info:      {content: "", req: true},
        add_material_info:  {content: "", req: true},
        supp_material_info: {content: "", req: false},
        has_no_required:    {content: false, req: true}
    });

    function handleCourseMaterials(){

    }
    return(
        <fieldset className="row">
            <legend id="course-materials">Required Materials</legend>
            <div className="form-section">
                <p>Description for information in this section goes here.</p>
            <div className="col s12">
                <label htmlFor="textbook_info"><span className="required-symbol">Required Textbooks:</span></label>
                <ControlledEditor updateContent={handleCourseMaterials} id="textbook_info"/>
            </div>
            <div className="col s12">
                <label htmlFor="add_material_info"><span className="required-symbol">Additional Required Materials:</span></label>
                <ControlledEditor updateContent={handleCourseMaterials} id="add_material_info"/>
            </div>
            <div className="col s12">
                <label htmlFor="supp_material_info">Supplementary Readings:</label>
                <ControlledEditor updateContent={handleCourseMaterials} id="supp_material_info"/>
            </div>
            <div className="col s12">
                <div className="simple-radio-group">
                    <label>
                        <input type="checkbox" className="filled-in" id="has_no_required"
                               checked={courseMaterials.has_no_required.content}
                               onChange={handleCourseMaterials}
                        />
                        <span>There are no required materials for this course.</span>
                    </label>
                </div>
            </div>
            </div>
        </fieldset>
    )
}

export function CourseDescriptions(){
    const [courseDescriptions, setCourseDescriptions] = useState({
        course_description:         {content: "", req: true},
        course_goals:               {content: "", req: false},
        learning_objs:              {content: "", req: false},
        tech_used:                  {content: "", req: false},
        assignment_info:            {content: [], req: false},
        student_responsibilities:   {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}

export function CoursePolicies(){
    const [coursePolicies, setCoursePolicies] = useState({
        academic_integrity:     {content: "", req: true},
        grading:                {content: "", req: true},
        exam_policy:            {content: "", req: true},
        disability_statement:   {content: "", req: true},
        edu_equity:             {content: "", req: false},
        mandated_reporting:     {content: "", req: true},
        attendance:             {content: "", req: false},
        class_participation:    {content: "", req: false},
        missed_assignments:     {content: "", req: false},
        extra_credit:           {content: "", req: false},
        lab_safety:             {content: "", req: false},
        emergency_statement:    {content: "", req: false},
        code_of_conduct:        {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}

export function CourseSchedule(){
    const [courseScheduleInfo, setCourseScheduleInfo] = useState({
        syllabus_changes:       {content: "", req: false},
        test_dates:             {content: "", req: false},
        major_assignment_dates: {content: "", req: false},
        special_events:         {content: "", req: false}
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
        learning_center:        {content: "", req: false},
        disability:             {content: "", req: true},
        library:                {content: "", req: false},
        academic_advising:      {content: "", req: false},
        career:                 {content: "", req: false},
        counselling:            {content: "", req: true},
        tech_help:              {content: "", req: false}
    });

    return(
        <div>Test</div>
    )
}