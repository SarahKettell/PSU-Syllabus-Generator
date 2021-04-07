import React, {Component, useEffect, useState} from "react";
import Assignment from './Assignment';
import AdditionalMeetingTimes from './AdditionalMeetingTimes';
import AdditionalOfficeHours from './AdditionalOfficeHours';
import SyllabusSchedule from '../scripts/SyllabusSchedule';
import {EditorState} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import sanitizeHtml from "sanitize-html";
import {Editor} from "react-draft-wysiwyg";
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
    DISABILITY_RESOURCES} from '../information/policy-information';
import {htmlExportSchedule} from "./ExportBuilder";

export default class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange: function = (editorState) => {
        this.setState({
            editorState,
        });
        let dirtyHTML = stateToHTML(editorState.getCurrentContent());
        if (dirtyHTML !== "") {
            let cleanHTML = sanitizeHtml(dirtyHTML, {
                allowedTags: ["address", "article", "aside",  "hgroup", "main", "nav", "section", "blockquote", "dd", "del", "div",
                    "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
                    "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
                    "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
                    "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
                    "col"],
                allowedAttributes: {
                    'a': [ 'href', 'name', 'target' ]
                },
            });
            if (cleanHTML === "<p><br /></p>") {
                cleanHTML = false
            }
            let tempInfo = {
                id: this.props.id,
                value: cleanHTML
            }
            if(tempInfo) {this.props.updateContent(tempInfo);}
        }
    };

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="rte-editor-full"
                editorClassName="rte-editor"
                toolbarClassName="rte-editor-toolbar"
                onEditorStateChange={this.onEditorStateChange}
                onBlur={this.props.changeFocus}
                toolbar = {{
                    options: ['inline', 'list', 'link'],
                    inline: {
                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                    },
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48],
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                    },
                    link: {
                        defaultTargetOption: '_blank',
                        options: ['link', 'unlink'],
                    },
                }}
            />
        )
    }
}

// primitive values can be updated with the same structure, while
// complex values hold arrays or objects and need special cases
const PRIM_VAL = "primitive value";
const COMPLEX_VAL = "complex value";

export function BasicCourseInfo(props){

    // local state to hold all updates
    const [basicInfo, setBasicInfo] = useState({
            course_num:         {content: "", req: false, included: false},
            course_name:        {content: "", req: false, included: false},
            course_section:     {content: "", req: false, included: false},
            num_credits:        {content: "", req: false, included: false},
            prerequisites:      {content: "", req: false, included: false},
            permission_req:     {content: false, req: false, included: false},
            class_location:     {content: "", req: false, included: false},
            class_time:         {content: "", req: false, included: false},
            class_start_time:   {content: "", req: false, included: false},
            class_end_time:   {content: "", req: false, included: false},
            class_days:         {content: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
                }, req: false, included: false},
            lab_location:       {content: "", req: false, included: false},
            lab_time:           {content: "", req: false, included: false},
            lab_start_time:   {content: "", req: false, included: false},
            lab_end_time:   {content: "", req: false, included: false},
            lab_days:           {content: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                }, req: false, included: false},
            canvas_info:        {content: "", req: false, included: false},
            semester: 			{content: "", req: false, included: false},
    });

    // user has switched to a new field, save new content to overall state
    const focusChange = () => {
        props.updateState(basicInfo);
    }

    const handleBasicChange = (info) => {
        const fieldName = (info.id) ? info.id : info.target.name;
        let fieldValue = (info.value !== undefined) ? info.value : info.target.value;
        const required = basicInfo[fieldName].req;
        const included = (fieldValue !== "" && fieldValue !== null);
        if(info.target && info.target.type === "time") {
            // make new time strings
            const newTime = info.target.value.split(':');
            fieldValue = (parseInt(newTime[0]) % 12) + ":" + newTime[1] + (parseInt(newTime[0]) > 12 ? "PM" : "AM");
        }
        setBasicInfo({
            ...basicInfo, [fieldName]: {content: fieldValue, req: required, included: included}
        });
    }

    const handleCheckChange = (info) => {
        const fieldName = info.target.name;
        const innerField = info.target.value;
        const currInfo = basicInfo[fieldName].content;
        currInfo[innerField] = info.target.checked;
        const required = basicInfo[fieldName].req;
        let includedCheck = (
            (currInfo.monday
                || currInfo.tuesday
                || currInfo.wednesday
                || currInfo.thursday
                || currInfo.friday
                || currInfo.saturday
                || currInfo.sunday)
        );
        setBasicInfo({
            ...basicInfo,
            [fieldName]: {content: currInfo, req: required, included: includedCheck}
        })
        focusChange();
    }

    return(
        <fieldset className="row">
            <legend id="basic-course-info">Basic Course Information</legend>
            <div className="form-section">
                <p>Description for information in this section goes here.</p>
                <div className="input-field col s12 m6">
                    <label id="f1-1" htmlFor="course_name">Course Number:</label>
                    <input type="text" id="course_num" placeholder="EDUC 305"
                           name="course_num"
                           value={basicInfo.course_num.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m3">
                    <label id="f1-2" id="course_section">Section:</label>
                    <input type="email" id="course_section" placeholder="001"
                           name="course_section"
                           value={basicInfo.course_section.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m3">
                    <label id="f1-3" id="course_section">Number of Credits:</label>
                    <input type="number" id="num_credits" placeholder="3"
                           name="num_credits"
                           value={basicInfo.num_credits.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label id="f1-4" htmlFor="course_name" className="active">Course Name:</label>
                    <input type="text" id="course_name" placeholder="Creative Arts"
                           name="course_name"
                           value={basicInfo.course_name.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label id="f1-4" htmlFor="semester" className="active">Semester:</label>
                    <input type="text" id="semester" placeholder="Spring 2021"
                           name="semester"
                           value={basicInfo.semester.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="form-divider col s12"></div>
                <div className="input-field col s12 m12">
                    <label id="f1-5" htmlFor="class_location" className="active">Class Meeting Location(s):</label>
                    <input type="text" id="class_location" placeholder="Olmsted 205"
                           name="class_location"
                           value={basicInfo.class_location.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="checkbox-row col s12 m6">
                    <p className="simple-radio-group">
                        <span className="radio-title"> Class Day(s):</span>
                        <label htmlFor="class_days_monday">
                            <input className="filled-in"
                                   value="monday"
                                   name="class_days"
                                   id="class_days_monday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Mon</span>
                        </label>
                        <label htmlFor="class_days_tuesday">
                            <input className="filled-in"
                                   value="tuesday"
                                   name="class_days"
                                   id="class_days_tuesday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Tue</span>
                        </label>
                        <label htmlFor="class_days_wednesday">
                            <input className="filled-in"
                                   value="wednesday"
                                   name="class_days"
                                   id="class_days_wednesday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Wed</span>
                        </label>
                        <label htmlFor="class_days_thursday">
                            <input className="filled-in"
                                   value="thursday"
                                   name="class_days"
                                   id="class_days_thursday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Thu</span>
                        </label>
                        <label htmlFor="class_days_friday">
                            <input className="filled-in"
                                   value="friday"
                                   name="class_days"
                                   id="class_days_friday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Fri</span>
                        </label>
                        <label htmlFor="class_days_saturday">
                            <input className="filled-in"
                                   value="saturday"
                                   name="class_days"
                                   id="class_days_saturday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Sat</span>
                        </label>
                        <label htmlFor="class_days_sunday">
                            <input className="filled-in"
                                   value="sunday"
                                   name="class_days"
                                   id="class_days_sunday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Sun</span>
                        </label>
                    </p>
                </div>
                <div className="input-field col s12 m3">
                    <input id="class_start_time" type="time"
                           name="class_start_time"
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                    <label className="active" htmlFor="class_start_time">Class Start Time:</label>
                </div>
                <div className="input-field col s12 m3">
                    <input id="class_end_time" type="time"
                           name="class_end_time"
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                    <label htmlFor="class_end_time" className="active">Class End Time:</label>
                </div>
                <div className="form-divider col s12"></div>
                <div className="input-field col s12 m12">
                    <label id="f1-6" htmlFor="lab_location" className="active">Lab/Recitation Location(s):</label>
                    <input type="text" id="lab_location" placeholder="Olmsted 205"
                           name="lab_location"
                           value={basicInfo.lab_location.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="checkbox-row col s12 m6">
                    <p className="simple-radio-group">
                        <span className="radio-title"> Lab Day(s):</span>
                        <label htmlFor="lab_days_monday">
                            <input className="filled-in"
                                   value="monday"
                                   name="lab_days"
                                   id="lab_days_monday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Mon</span>
                        </label>
                        <label htmlFor="lab_days_tuesday">
                            <input className="filled-in"
                                   value="tuesday"
                                   name="lab_days"
                                   id="lab_days_tuesday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Tue</span>
                        </label>
                        <label htmlFor="lab_days_wednesday">
                            <input className="filled-in"
                                   value="wednesday"
                                   name="lab_days"
                                   id="lab_days_wednesday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Wed</span>
                        </label>
                        <label htmlFor="lab_days_thursday">
                            <input className="filled-in"
                                   value="thursday"
                                   name="lab_days"
                                   id="lab_days_thursday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Thu</span>
                        </label>
                        <label htmlFor="lab_days_friday">
                            <input className="filled-in"
                                   value="friday"
                                   name="lab_days"
                                   id="lab_days_friday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Fri</span>
                        </label>
                        <label htmlFor="lab_days_saturday">
                            <input className="filled-in"
                                   value="saturday"
                                   name="lab_days"
                                   id="lab_days_saturday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Sat</span>
                        </label>
                        <label htmlFor="lab_days_sunday">
                            <input className="filled-in"
                                   value="sunday"
                                   name="lab_days"
                                   id="lab_days_sunday"
                                   onChange={handleCheckChange}
                                   type="checkbox"/>
                            <span>Sun</span>
                        </label>
                    </p>
                </div>
                <div className="input-field col s12 m3">
                    <input id="lab_start_time" type="time"
                           name="lab_start_time"
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                    <label className="active" htmlFor="lab_start_time">Lab Start Time:</label>
                </div>
                <div className="input-field col s12 m3">
                    <input id="lab_end_time" type="time"
                           name="lab_end_time"
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                    <label htmlFor="lab_end_time" className="active">Lab End Time:</label>
                </div>
                <div className="col s12">
                        <p id="f1-8" className="simple-radio-group"
                           onChange={handleBasicChange}
                            onBlur={focusChange}>
                            <span className="radio-title"> Is permission from the instructor required to register?</span>
                            <label>
                                <input id="perm_req_true" className="with-gap" name="permission_req" value={true} type="radio"/>
                                <span>Yes</span>
                            </label>
                            <label>
                                <input id="perm_req_false" className="with-gap" name="permission_req" type="radio" value={false}/>
                                <span>No</span>
                            </label>
                        </p>
                </div>
                <div className="col s12 m12 xl6">
                    <label htmlFor="prerequisites">Prerequisites:</label>
                    <ControlledEditor
                        updateContent={handleBasicChange}
                        id="prerequisites"
                        changeFocus={focusChange}
                    />
                </div>
                <div className="col s12 m12 xl6">
                    <label htmlFor="canvas_info">Canvas Information:</label>
                    <ControlledEditor
                        id="canvas_info"
                        updateContent={handleBasicChange}
                        changeFocus={focusChange}
                    />
                </div>
            </div>
        </fieldset>
    )
}

export function InstructorInfo(props){
    const [instructorInfo, setInstructorInfo] = useState({
        instructor_name:    {content: "", req: true, included: false},
        office_location:    {content: "", req: false, included: false},
        office_phone:       {content: "", req: false, included: false},
        contact_info:       {content: "", req: true, included: false},
        ta_info:            {content: "", req: false, included: false},
        department_info:    {content: "", req: false, included: false},
        educational_phil:   {content: "", req: false, included: false},
        office_hours:       {content: [{
                office_start_time: "",
                office_end_time: "",
                office_days: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                }
            }], req: false, included: false},
    });
    useEffect(() => {
        console.log(instructorInfo.office_hours)
        focusChange()
    }, [instructorInfo.office_hours])



    function handleAddOfficeHoursInfo(info, id) {
        const fullOfficeHours = instructorInfo.office_hours.content;
        const currentOfficeHourSlot = fullOfficeHours[id];
        const required = instructorInfo.office_hours.req;
        const included = instructorInfo.office_hours.included;
        if(info.target.type === "checkbox") {
            const value = info.target.checked;
            currentOfficeHourSlot.office_days[info.target.name] = value;
        }
        if(info.target.type === "time") {
            // make new time strings
            const newTime = info.target.value.split(':');
            const value = (parseInt(newTime[0]) % 12) + ":" + newTime[1] + (parseInt(newTime[0]) > 12 ? "PM" : "AM");
            const timeType = info.target.name;
            currentOfficeHourSlot[timeType] = value;
        }
        let includedCheck = false;
        // check if currently included
        includedCheck = ((currentOfficeHourSlot.office_days.monday
                || currentOfficeHourSlot.office_days.tuesday
                || currentOfficeHourSlot.office_days.wednesday
                || currentOfficeHourSlot.office_days.thursday
                || currentOfficeHourSlot.office_days.friday
                || currentOfficeHourSlot.office_days.saturday
                || currentOfficeHourSlot.office_days.sunday)
            &&
            (currentOfficeHourSlot.office_start_time.length > 0
                && currentOfficeHourSlot.office_end_time.length > 0)
            || included
        );
        setInstructorInfo({
            ...instructorInfo,
            office_hours: {content: fullOfficeHours, req: required, included: includedCheck}
        })
    }

    function addAddOfficeHours(evt) {
        evt.preventDefault();

        let new_add_office_hours = [{
            office_start_time: "",
            office_end_time: "",
            office_days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }
        }];

        const curr_office_hours = instructorInfo.office_hours.content;
        const add_office_hours = curr_office_hours.concat(new_add_office_hours);
        const req = instructorInfo.office_hours.req;
        setInstructorInfo({
            ...instructorInfo,
            office_hours: {content: add_office_hours, req: req, included: false}
        });
    }

    // user has switched to a new field, save new content to overall state
    const focusChange = () => {
        props.updateState(instructorInfo);
    }

    const handleBasicChange = (info) => {
        const fieldName = (info.id) ? info.id : info.target.name;
        const fieldValue = (info.value !== undefined) ? info.value : info.target.value;
        const required = instructorInfo[fieldName].req;
        const included = (fieldValue !== "" && fieldValue);
        setInstructorInfo({
            ...instructorInfo, [fieldName]: {content: fieldValue, req: required, included: included}
        });
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
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="department_info">Department:</label>
                    <input type="text" id="department_info" name="department_info" placeholder="School of Humanities" required=""
                           name="department_info"
                           value={instructorInfo.department_info.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="office">Office Location:</label>
                    <input type="text" id="office" name="office" placeholder="Olmsted 203" required=""
                           name="office_location"
                           value={instructorInfo.office_location.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="input-field col s12 m6">
                    <label htmlFor="phone">Office Phone:</label>
                    <input type="tel" id="phone" name="phone" placeholder="000-000-0000" required=""
                           name="office_phone"
                           value={instructorInfo.office_phone.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                </div>
                <div className="col s12 m12">
                    <label htmlFor="contact_info"><span className="required-symbol">Contact Information and Preferences:</span></label>
                    <ControlledEditor
                        id="contact_info"
                        updateContent={handleBasicChange}
                        changeFocus={focusChange}
                    />
                </div>
                <div className="col s12 m12">
                    <label htmlFor="ta_info">Teaching Assistant(s) Information:</label>
                    <ControlledEditor
                        id="ta_info"
                        updateContent={handleBasicChange}
                        changeFocus={focusChange}
                    />
                </div>
                <div className="col s12 m12">
                    <label htmlFor="educational_phil">Educational Philosophy:</label>
                    <ControlledEditor
                        id="educational_phil"
                        updateContent={handleBasicChange}
                        changeFocus={focusChange}
                    />
                </div>

                <h4 className="col s12 oh-title">Office Hours:</h4>
                <div className="oh-fields">
                        {instructorInfo.office_hours.content.map((add_office_hours, i) => {
                            return (
                                <AdditionalOfficeHours
                                    add_office_hours_days={instructorInfo.office_hours.content[i].office_days}
                                    add_office_hours_start_time={instructorInfo.office_hours.content[i].office_start_time}
                                    add_office_hours_end_time={instructorInfo.office_hours.content[i].office_end_time}
                                    add_office_hours_key={i}
                                    handleAddOfficeHoursInfo={handleAddOfficeHoursInfo}
                                />
                            );
                        })}
                </div>
                    <div className="add-another">
                        <button className="btn-small" onClick={addAddOfficeHours}>
                            + Add Another Office Hours Timeslot
                        </button>
                    </div>
            </div>
        </fieldset>
    )
}

export function CourseMaterials(props){
    const [courseMaterials, setCourseMaterials] = useState({
        textbook_info:      {content: "", req: true, included: false},
        add_material_info:  {content: "", req: true, included: false},
        supp_material_info: {content: "", req: false, included: false},
        has_no_required:    {content: false, req: true, included: false}
    });

    // user has switched to a new field, save new content to overall state
    const focusChange = () => {
        props.updateState(courseMaterials);
    }

    const handleBasicChange = (info) => {
        const fieldName = (info.id) ? info.id : info.target.name;
        const fieldValue = (info.value !== undefined) ? info.value : info.target.value;
        const required = courseMaterials[fieldName].req;
        const included = (fieldValue !== "" && fieldValue);
        setCourseMaterials({
            ...courseMaterials, [fieldName]: {content: fieldValue, req: required, included: included}
        });
    }

    const handleCheckbox = (info) => {
        const fieldName = info.target.name;
        const fieldValue = info.target.checked;
        const required = courseMaterials[fieldName].req;
        const included = (fieldValue !== "" && fieldValue);
        setCourseMaterials({
            ...courseMaterials, [fieldName]: {content: fieldValue, req: required, included: included}
        });
    }

    return(
        <fieldset className="row">
            <legend id="course-materials">Required Materials</legend>
            <div className="form-section">
                <p>Description for information in this section goes here.</p>
            <div className="col s12">
                <label htmlFor="textbook_info"><span className="required-symbol">Required Textbooks:</span></label>
                <ControlledEditor
                    id="textbook_info"
                    updateContent={handleBasicChange}
                    changeFocus={focusChange}
                />
            </div>
            <div className="col s12">
                <label htmlFor="add_material_info"><span className="required-symbol">Additional Required Materials:</span></label>
                <ControlledEditor
                    id="add_material_info"
                    updateContent={handleBasicChange}
                    changeFocus={focusChange}
                />
            </div>
            <div className="col s12">
                <label htmlFor="supp_material_info">Supplementary Readings:</label>
                <ControlledEditor
                    id="supp_material_info"
                    updateContent={handleBasicChange}
                    changeFocus={focusChange}
                />
            </div>
            <div className="col s12">
                <div className="simple-radio-group">
                    <label>
                        <input type="checkbox" className="filled-in" name="has_no_required"
                               onChange={handleCheckbox}
                               onBlur={focusChange}
                        />
                        <span>There are no required materials for this course.</span>
                    </label>
                </div>
            </div>
            </div>
        </fieldset>
    )
}

export function CourseDescriptions(props){
    const GRADE_SCALE_INDEX = ["A", "A-", "B+", "B", "B-", "C+", "C", "D", "F"];

    const [courseDescriptions, setCourseDescriptions] = useState({
        course_description:         {content: "", req: true, included: false},
        course_goals:               {content: "", req: false, included: false},
        learning_objs:              {content: "", req: false, included: false},
        instruction_methods:        {content: "", req: false, included: false},
        tech_used:                  {content: "", req: false, included: false},
        student_responsibilities:   {content: "", req: false, included: false},
        grading_scale_type:         {percent: true, points: false},
        grading_scale: 				{content: [
                {letter: "A",   percent: {low: 94, high: 100}, points: {low: 940, high: 1000}},
                {letter: "A-",  percent: {low: 90, high:  94}, points: {low: 900, high:  940}},
                {letter: "B+",  percent: {low: 87, high:  90}, points: {low: 870, high:  900}},
                {letter: "B",   percent: {low: 83, high:  87}, points: {low: 830, high:  870}},
                {letter: "B-",  percent: {low: 80, high:  83}, points: {low: 800, high:  830}},
                {letter: "C+",  percent: {low: 77, high:  80}, points: {low: 770, high:  800}},
                {letter: "C",   percent: {low: 70, high:  77}, points: {low: 700, high:  770}},
                {letter: "D",   percent: {low: 60, high:  70}, points: {low: 600, high:  700}},
                {letter: "F",   percent: {low:  0, high:  60}, points: {low:   0, high:  600}},
            ], req: false, included: true},
        number_assignment_types:    0,
        assignment_info:            {content: [
            {id: 0, title:"", description:"", points_each: 0, num_of: 0, points_total: 0}
            ], req: false, included: false},
    });
    useEffect(() =>{
        console.log(courseDescriptions.assignment_info)
        focusChange();
    }, [courseDescriptions.number_assignment_types])

    const [assessmentInfo, setAssessmentInfo] = useState({
        assignments: [{
            id: 0,
            title:"",
            description:"",
            points_each: 0,
            num_of: 0,
            points_total: 0,
            percent_total: 0
        }]
    });

    // onClick function for add assessment button
    // Adds blank assessment object into assessmentInfo.assignment array
    function addAssignment(evt) {
        evt.preventDefault();
        let newAssignmentID = courseDescriptions.number_assignment_types + 1;
        let blank_assessment = {
            id: newAssignmentID,
            title:"",
            description:"",
            points_each: 0,
            num_of: 0,
            points_total: 0,
            percent: 0
        };
        const assignments = courseDescriptions.assignment_info.content.concat(blank_assessment);
        setCourseDescriptions({
            ...courseDescriptions,
            number_assignment_types: newAssignmentID,
            assignment_info: {
                content: assignments,
                req: courseDescriptions.assignment_info.req,
                included: courseDescriptions.assignment_info.included}
        });
    }

    // onChange function for assignments in assessmentInfo
    // TODO: check out the other variables in assessmentInfo
    function handleAssessmentInfo(info, index) {
        const name = (info.id) ? info.id : info.target.name;
        const value = (info.value !== undefined) ? info.value : info.target.value;
        const required = courseDescriptions.assignment_info.req;
        const include = courseDescriptions.assignment_info.included || value !== "";

        let assignment = courseDescriptions.assignment_info.content[index];
        assignment[name] = value;

        let assignments = courseDescriptions.assignment_info.content;
        assignments[index] = assignment;

        setCourseDescriptions({
            ...courseDescriptions,
            assignment_info: {content: assignments, req: required, included: include}
        });
    }

    function deleteAssignment(evt, index) {
        evt.preventDefault();
        let assignments = courseDescriptions.assignment_info.content;
        assignments.splice(index, 1);

        setCourseDescriptions({
            ...courseDescriptions,
            assignment_info: {
                content: assignments,
                req: courseDescriptions.assignment_info.req,
                included: courseDescriptions.assignment_info.included
            }
        });
    }

    // user has switched to a new field, save new content to overall state
    const focusChange = () => {
        props.updateState(courseDescriptions);
    }

    const handleBasicChange = (info) => {
        const fieldName = (info.id) ? info.id : info.target.name;
        const fieldValue = (info.value !== undefined) ? info.value : info.target.value;
        const required = courseDescriptions[fieldName].req;
        const included = (fieldValue !== "" && fieldValue);
        setCourseDescriptions ({
            ...courseDescriptions, [fieldName]: {content: fieldValue, req: required, included: included}
        });
    }

    const handleCheckChange = (info) => {
        const value = info.target.value;
        if(value === "percent"){
            setCourseDescriptions({
                ...courseDescriptions, grading_scale_type: {percent: true, points: false}
            });
        }
        else if (value === "points"){
            setCourseDescriptions({
                ...courseDescriptions, grading_scale_type: {percent: false, points: true}
            });
        }
        else {
            setCourseDescriptions({
                ...courseDescriptions, grading_scale_type: {percent: true, points: true}
            });
        }
        focusChange();
    }

    const handleGradingScale = (info) => {
        const fieldName = info.target.name;
        const fieldValue = parseFloat(info.target.value);
        const type = fieldName.split("_")[0];
        const level = fieldName.split("_")[1];
        const index = fieldName.split("_")[2];
        const required = courseDescriptions.grading_scale.req;
        const included = courseDescriptions.grading_scale.included;

        let newGradeScaleValue = courseDescriptions.grading_scale.content[index];
        newGradeScaleValue[type][level] = fieldValue;
        let currGradingScale = courseDescriptions.grading_scale.content;
        currGradingScale[index] = newGradeScaleValue;

        setCourseDescriptions({
            ...courseDescriptions,
            grading_scale: {content: currGradingScale, req: required, included: included}
        })
    }


    return(
        <fieldset className="row">
            <legend id="course-materials">Course Descriptions and Expectations</legend>
            <div className="form-section">
                <div className="col s12 xl6">
                    <label htmlFor="textbook_info"><span className="required-symbol">Course Description:</span></label>
                    <ControlledEditor updateContent={handleBasicChange}
                                        id="course_description"
                                        changeFocus={focusChange}/>
                </div>
                <div className="col s12 xl6">
                    <label htmlFor="add_material_info">Course Goals:</label>
                    <ControlledEditor updateContent={handleBasicChange}
                                      id="course_goals"
                                      changeFocus={focusChange} />
                </div>
                <div className="col s12 xl6">
                    <label htmlFor="supp_material_info">Learning Objectives for Students:</label>
                    <ControlledEditor updateContent={handleBasicChange}
                                      id="learning_objs"
                                      changeFocus={focusChange}/>
                </div>
                <div className="col s12 xl6">
                    <label htmlFor="supp_material_info">Instructional Methods to be Used:</label>
                    <ControlledEditor updateContent={handleBasicChange}
                                      id="instruction_methods"
                                      changeFocus={focusChange}/>
                </div>
                <div className="col s12 xl6">
                    <label htmlFor="supp_material_info">Technology to be Used:</label>
                    <ControlledEditor updateContent={handleBasicChange}
                                      id="tech_used"
                                      changeFocus={focusChange}/>
                </div>
                <div className="col s12 xl6">
                    <label htmlFor="supp_material_info">Student Responsibilities:</label>
                    <ControlledEditor updateContent={handleBasicChange}
                                      id="student_responsibilities"
                                      changeFocus={focusChange}/>
                </div>
                <div className="col s12">
                    <h4>Grading Scale</h4>
                    <p>Grading scales can be listed using percents, points, or a combination of both. Fill
                    the fields in below and totals will be automatically calculated.</p>
                    <div className="col s12">
                        <p id="f4-1" className="simple-radio-group"
                           onChange={handleCheckChange}
                           onBlur={focusChange}>
                            <span className="radio-title">Format to be Included: </span>
                            <label>
                                <input id="grading_scale_type_percent" className="with-gap" name="grading_scale_type" value="percent" type="radio"  defaultChecked="defaultChecked"/>
                                <span>Percent</span>
                            </label>
                            <label>
                                <input id="grading_scale_type_points" className="with-gap" name="grading_scale_type" type="radio" value="points" />
                                <span>Points</span>
                            </label>
                            <label>
                                <input id="grading_scale_type_both" className="with-gap" name="grading_scale_type" type="radio" value="both"/>
                                <span>Both</span>
                            </label>
                        </p>
                    </div>
                    <table className="table table-bordered table-responsive center">
                        <thead>
                        <tr>
                            <td rowSpan="2"></td>
                            <th colSpan="2" scope="colgroup">Percent</th>
                            <th colSpan="2" scope="colgroup">Points</th>
                        </tr>
                        <tr>
                            <th className="reg-col" scope="col">Min</th>
                            <th className="reg-col" scope="col">Max</th>
                            <th className="reg-col" scope="col">Min</th>
                            <th className="reg-col" scope="col">Max</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">A</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_0L"
                                       name="percent_low_0"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[0].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_0H"
                                       name="percent_high_0"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[0].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_0L"
                                       name="points_low_0"
                                       type="number"
                                       value={courseDescriptions.grading_scale.content[0].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_0H"
                                       name="points_high_0"
                                       type="number"
                                       value={courseDescriptions.grading_scale.content[0].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">A-</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_1L"
                                       name="percent_low_1"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[1].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_1H"
                                       name="percent_high_1"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[1].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_1L"
                                       name="points_low_1"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[1].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_1H"
                                       name="points_high_1"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[1].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">B+</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_2L"
                                       name="percent_high_2"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[2].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_2H"
                                       name="percent_high_2"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[2].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_2L"
                                       name="points_low_2"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[2].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_2H"
                                       name="points_high_2"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[2].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">B</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_3L"
                                       name="percent_high_3"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[3].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_3H"
                                       name="percent_high_3"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[3].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_3L"
                                       name="points_low_3"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[3].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_3H"
                                       name="points_high_3"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[3].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">B-</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_4L"
                                       name="percent_high_4"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[4].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_4H"
                                       name="percent_high_4"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[4].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_4L"
                                       name="points_low_4"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[4].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_4H"
                                       name="points_high_4"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[4].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">C+</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_5L"
                                       name="percent_high_5"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[5].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_5H"
                                       name="percent_high_5"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[5].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_5L"
                                       name="points_low_5"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[5].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_5H"
                                       name="points_high_5"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[5].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">C</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_6L"
                                       name="percent_low_6"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[6].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_6H"
                                       name="percent_high_6"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[6].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_6L"
                                       name="points_low_6"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[6].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_6H"
                                       name="points_high_6"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[6].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">D</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_7L"
                                       name="percent_low_7"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[7].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_7H"
                                       name="percent_high_7"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[7].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_7L"
                                       name="points_low_7"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[7].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_7H"
                                       name="points_high_7"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[7].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">F</th>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_8L"
                                       name="percent_low_8"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[8].percent.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_percent_8H"
                                       name="percent_high_8"
                                       type="number"
                                       min="0"
                                       max="100"
                                       value={courseDescriptions.grading_scale.content[8].percent.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>%</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_8L"
                                       name="points_low_8"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[8].points.low}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                            <td>
                                <input placeholder="0"
                                       id="gs_points_8H"
                                       name="points_high_8"
                                       type="number"
                                       min="0"
                                       value={courseDescriptions.grading_scale.content[8].points.high}
                                       onChange={handleGradingScale}
                                       onBlur={focusChange}
                                />
                                <label>pts</label>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col s12">
                    <h4>Major Assignment Descriptions</h4>
                    <p>List the major types of assignments in the course with grading details.</p>
                    {courseDescriptions.assignment_info.content.map((assignments, i) => {
                        return (
                            <Assignment
                                curr_id={courseDescriptions.number_assignment_types + 1}
                                assignment_title={courseDescriptions.assignment_info.content[i].title}
                                assignment_points_each={courseDescriptions.assignment_info.content[i].points_each}
                                assignment_num_of={courseDescriptions.assignment_info.content[i].num_of}
                                assignment_points_total={courseDescriptions.assignment_info.content[i].points_total}
                                assignment_description={courseDescriptions.assignment_info.content[i].description}
                                handleAssessmentInfo={info => {
                                    handleAssessmentInfo(info, i);
                                }}
                                handleFocusChange = {focusChange}
                                deleteAssignment={info => {deleteAssignment(info, i);}}
                            />
                        )
                    })}
                    <div className="add-another">
                        <p>
                            <button onClick={addAssignment} className="btn-small">
                            + Add Another Assignment
                            </button>
                        </p>
                    </div>
                </div>

            </div>
        </fieldset>
    )
}

export function CoursePolicies(props){
    const [coursePolicies, setCoursePolicies] = useState({
        academic_integrity:     {content: "", req: true, included: false, checked: true},
        grading:                {content: "", req: true, included: false, checked: true},
        exam_policy:            {content: "", req: true, included: false, checked: true},
        disability_statement:   {content: "", req: true, included: false, checked: true},
        edu_equity:             {content: "", req: true, included: false, checked: true},
        mandated_reporting:     {content: "", req: true, included: false, checked: true},
        attendance:             {content: "", req: false, included: false, checked: false},
        class_participation:    {content: "", req: false, included: false, checked: false},
        missed_assignments:     {content: "", req: false, included: false, checked: false},
        extra_credit:           {content: "", req: false, included: false, checked: false},
        lab_safety:             {content: "", req: false, included: false, checked: false},
        emergency_statement:    {content: "", req: false, included: false, checked: false},
        code_of_conduct:        {content: "", req: false, included: false, checked: false}
    });
    useEffect(() => {
        props.updateState(coursePolicies);
    }, [
        coursePolicies.academic_integrity.checked,
        coursePolicies.grading.checked,
        coursePolicies.exam_policy.checked,
        coursePolicies.disability_statement.checked,
        coursePolicies.edu_equity.checked,
        coursePolicies.mandated_reporting.checked,
        coursePolicies.attendance.checked,
        coursePolicies.class_participation.checked,
        coursePolicies.missed_assignments.checked,
        coursePolicies.extra_credit.checked,
        coursePolicies.lab_safety.checked,
        coursePolicies.emergency_statement.checked,
        coursePolicies.code_of_conduct.checked
    ])

    // user has switched to a new field, save new content to overall state
    const focusChange = () => {
        props.updateState(coursePolicies);
    }

    const handleBasicChange = (info) => {
        const fieldName = (info.id) ? info.id : info.target.name;
        const fieldValue = (info.value !== undefined) ? info.value : info.target.value;
        const required = coursePolicies[fieldName].req;
        const included = (fieldValue !== "" && fieldValue);
        const checked = coursePolicies[fieldName].checked;
        setCoursePolicies({
            ...coursePolicies, [fieldName]: {content: fieldValue, req: required, included: included, checked: checked}
        });
    }

    const handleCheckChange = (info) => {
        const fieldName = info.target.name;
        const checked = info.target.checked;
        const content = coursePolicies[fieldName].content;
        const required = coursePolicies[fieldName].req;
        const included = coursePolicies[fieldName].included;
        setCoursePolicies({
            ...coursePolicies, [fieldName]: {content: content, req: required, included: included, checked: checked}
        });
    }

    return(
        <fieldset className="row" id="course-policies">
            <legend>Course Policies</legend>
            <div className="form-section">
                <p className="intro-info">
                    Below is a list of the required and suggested course policies to be included in your syllabus.
                    The default policy statement will be automatically added to your syllabus when checked.
                    <br/><br/>
                    To see a preview of the policy, click on the arrow to the right.
                </p>
                <div className="col s12">
                    <ul id="course_policy_accordion">
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="academic_integrity" className="filled-in policy-header" checked disabled="disabled" onChange={handleCheckChange}/>
                                <span>Academic integrity policy</span>
                                <span className="required-symbol"></span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-1" aria-expanded="false" aria-controls="course_policies-1">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-1" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <p className="emph">Policy Contents:</p>
                                    <div dangerouslySetInnerHTML={{__html: ACADEMIC_INTEGRITY}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="grading" className="filled-in policy-header" checked disabled="disabled" onChange={handleCheckChange}/>
                                <span>Grading Policy</span>
                                <span className="required-symbol"></span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-2" aria-expanded="false" aria-controls="course_policies-2">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-2" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="grading">
                                        <p className="emph">Your Grading Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="grading"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: GRADING}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label >
                                <input type="checkbox" name="exam_policy" className="filled-in" checked disabled="disabled" onChange={handleCheckChange}/>
                                <span>Examination Policy</span>
                                <span className="required-symbol"></span>
                                </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-3" aria-expanded="false" aria-controls="course_policies-3">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>

                            <div id="course_policies-3" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="exam_policy">
                                        <p className="emph">Your Exam Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="exam_policy"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: EXAMINATION}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="disability_statement" className="filled-in" checked disabled="disabled" onChange={handleCheckChange}/>
                                <span>Disability Access Statement</span>
                                <span className="required-symbol"></span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-4" aria-expanded="false" aria-controls="course_policies-4">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-4" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <p className="emph">Policy Contents:</p>
                                    <div dangerouslySetInnerHTML={{__html: DISABILITY_SERV}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label >
                                <input type="checkbox" name="edu_equity" className="filled-in" checked disabled="disabled" onChange={handleCheckChange}/>
                                <span>Reporting Educational Equity Concerns</span>
                                <span className="required-symbol"></span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-5" aria-expanded="false" aria-controls="course_policies-5">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-5" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <p className="emph">Policy Contents:</p>
                                    <div dangerouslySetInnerHTML={{__html: EDUC_EQ}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="mandated_reporting" className="filled-in" checked disabled="disabled" onChange={handleCheckChange}/>
                                <span>Mandated Reporting Statement</span>
                                <span className="required-symbol"></span>
                                </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-6" aria-expanded="false" aria-controls="course_policies-6">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-6" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <p className="emph">Policy Contents:</p>
                                    <div dangerouslySetInnerHTML={{__html: MANDATED_REP}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="attendance" className="filled-in" onChange={handleCheckChange}/>
                                <span>Attendance Policy</span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-7" aria-expanded="false" aria-controls="course_policies-7">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>

                            <div id="course_policies-7" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="attendance">
                                        <p className="emph">Your Attendance, Lateness, and Missed Class Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="attendance"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: ATTENDANCE}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="class_participation" className="filled-in" onChange={handleCheckChange} />
                                <span>Class Participation</span>
                                </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-8" aria-expanded="false" aria-controls="course_policies-8">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>

                            <div id="course_policies-8" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="class_participation">
                                        <p className="emph">Your Attendance, Lateness, and Missed Class Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="class_participation"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: PARTICIPATION}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="missed_assignments" className="filled-in" onChange={handleCheckChange} />
                                <span>Missed Assignments and Exams</span>
                                </label>
                            <button type="button" name="grading" className="col-sm-1 form-dropdown-button  collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-9" aria-expanded="false" aria-controls="course_policies-9">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-9" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="missed_assignments">
                                        <p className="emph">Your Missed Assignments, Quizzes and Exams Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="missed_assignments"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: MISSED_ASSIGNMENTS}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="extra_credit" className="filled-in" onChange={handleCheckChange} />
                                <span>Extra Credit</span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-10" aria-expanded="false" aria-controls="course_policies-10">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>

                            <div id="course_policies-10" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="extra_credit">
                                        <p className="emph">Your Extra Credit Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="extra_credit"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: EXTRA_CREDIT}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="lab_safety" className="filled-in" onChange={handleCheckChange} />
                                <span>Laboratory Safety</span>
                                </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-11" aria-expanded="false" aria-controls="course_policies-11">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-11" name="lab_safety" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="lab_safety">
                                        <p className="emph">Your Lab Safety Policy:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="lab_safety"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: LAB_SAFETY}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="emergency_statement" className="filled-in" onChange={handleCheckChange} />
                                <span>Emergency Statement</span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-12" aria-expanded="false" aria-controls="course_policies-12">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="course_policies-12" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <label htmlFor="emergency_statement">
                                        <p className="emph">Your Emergency Statement:</p></label>
                                    <ControlledEditor updateContent={handleBasicChange}
                                                      id="emergency_statement"
                                                      changeFocus={focusChange}/>
                                    <p className="emph">Suggested Policy Wording:</p>
                                    <div dangerouslySetInnerHTML={{__html: EMERGENCY_STATEMENT}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="code_of_conduct" className="filled-in" onChange={handleCheckChange} />
                                <span>Penn State’s Code of Conduct</span>
                            </label>
                            <button type="button" className="col-sm-1 form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#course_policies-13" aria-expanded="false" aria-controls="course_policies-13">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>

                            <div id="course_policies-13" className="col-sm-12 row collapse" data-parent="#course_policy_accordion">
                                <div className="policy-box">
                                    <p className="emph">Policy Contents:</p>
                                    <div dangerouslySetInnerHTML={{__html: CODE_OF_CONDUCT}}/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </fieldset>
    )
}

export function CourseSchedule(props){
    const [courseScheduleInfo, setCourseScheduleInfo] = useState({
        syllabus_changes:       {content: "", req: false, included: false},
        test_dates:             {content: "", req: false, included: false},
        major_assignment_dates: {content: "", req: false, included: false},
        special_events:         {content: "", req: false, included: false},
        start_date:             {content: "", req: false, included: false},
        end_date:               {content: "", req: false, included: false},
        schedule:				{content: [], req: false, included: false},
        add_schedule: 			{content: false, req: false, included: false},
    });
    useEffect(() => {
        props.updateState(courseScheduleInfo);
    })

    const focusChange = () => {
        props.updateState(courseScheduleInfo);
    }

    const handleBasicChange = (info) => {
        const fieldName = (info.id) ? info.id : info.target.name;
        const fieldValue = (info.value) ? info.value : info.target.value;
        const required = courseScheduleInfo[fieldName].req;
        const included = (fieldValue !== "" && fieldValue);
        setCourseScheduleInfo({
            ...courseScheduleInfo, [fieldName]: {content: fieldValue, req: required, included: included}
        });

    }

    function handleScheduleFile() {
        if(courseScheduleInfo.start_date.included &&
            courseScheduleInfo.end_date.included){

            let start_date = courseScheduleInfo.start_date.content;
            let end_date = courseScheduleInfo.end_date.content;

            let course_schedule;

            // may need conditional for start_date & end_date
            course_schedule = new SyllabusSchedule(start_date, end_date);
            course_schedule.generateSchedule();

            let schedule = course_schedule.schedule;
            htmlExportSchedule(schedule);
        } else {
            const startDate = document.getElementById("cs_start_date");
            const endDate = document.getElementById("cs_end_date");
            if(!courseScheduleInfo.start_date.included) startDate.classList.add("invalid")
            else startDate.classList.remove("invalid")
            if(!courseScheduleInfo.end_date.included) endDate.classList.add("invalid")
            else endDate.classList.remove("invalid")
        }
    }

    // add schedule to syllabus
    function handleScheduleInclude(info) {
        let includeSchedule;
        if(info.target) {includeSchedule = info.target.checked;}
        else {includeSchedule = courseScheduleInfo.add_schedule.content}
        let schedule = courseScheduleInfo.schedule;
        // if checked
        if(includeSchedule){
            // check if dates filled in, if not, prompt
            if(courseScheduleInfo.start_date.included &&
                courseScheduleInfo.end_date.included){
                // hard-coded, need to grab data from overall state
                // const start_date = "08/24/2020";
                // const end_date = "01/11/2020";
                let start_date = courseScheduleInfo.start_date.content;
                let end_date = courseScheduleInfo.end_date.content;

                let course_schedule;

                // may need conditional for start_date & end_date
                course_schedule = new SyllabusSchedule(start_date, end_date);
                course_schedule.generateSchedule();

                schedule = course_schedule.schedule;
            } else {
                const startDate = document.getElementById("cs_start_date");
                const endDate = document.getElementById("cs_end_date");
                if(!courseScheduleInfo.start_date.included) startDate.classList.add("invalid")
                else startDate.classList.remove("invalid")
                if(!courseScheduleInfo.end_date.included) endDate.classList.add("invalid")
                else endDate.classList.remove("invalid")
            }
        }
        setCourseScheduleInfo({
            ...courseScheduleInfo,
            schedule : {content: schedule, req: false, included: includeSchedule},
            add_schedule: {content: includeSchedule, req: false, included: includeSchedule}
        });
    }

    return(
        <fieldset className="row">
            <legend id="course-schedule">Course Schedule</legend>
            <div className="form-section">
                <div className="form-divider col s12"></div>
                <div className="input-field col s12 m6">
                    <input id="cs_start_date" type="date" class="validate"
                           name="start_date"
                           value={courseScheduleInfo.start_date.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                    <label id="f1-6" className="active" htmlFor="start_date" >Course Start Date:</label>
                    <span className="helper-text" data-error="Required"></span>
                </div>
                <div className="input-field col s12 m6">
                    <input id="cs_end_date" type="date" class="validate"
                           name="end_date"
                           value={courseScheduleInfo.end_date.content}
                           onChange={handleBasicChange}
                           onBlur={focusChange}
                    />
                    <label id="f1-7" htmlFor="end_date" className="active">Course End Date:</label>
                    <span className="helper-text" data-error="Required"></span>
                </div>
                <div className="form-divider col s12"></div>
                <div className="col s12 m8">
                    <p className="schedule-p">
                    The syllabus generator can generate a optional course schedule template, broken up
                    into weeks with appropriate date ranges. School holidays will also be listed on
                    the schedule.
                    <br/><br/>
                    You can choose to include the template at the end of your syllabus or download it
                    separately.
                    </p>
                    <div className="simple-radio-group">
                        <label>
                            <input type="checkbox" className="filled-in" id="include-schedule"
                                   onChange={handleScheduleInclude}
                            />
                            <span>Include a schedule in the syllabus.</span>
                        </label>
                    </div>
                </div>
                <div className="col s12 m4 info-box">
                    <div className="info-box-title">
                        <i className="material-icons left">lightbulb_outline</i>
                        Tip
                    </div>
                    <div className="info-box-content">
                        <h6>Just want a course schedule?</h6>
                        Download the schedule template separate from the syllabus.
                        <br />
                        <button className="btn-small waves-effect waves-light" type="button" onClick={handleScheduleFile}>
                            <i className="material-icons left">download</i>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    )
}

export function AvailableStudentServices(props){
    const [supportServices, setSupportServices] = useState({
        learning_center:        {content: "", req: false, included: false, checked: false},
        disability:             {content: "", req: true, included: false, checked: true},
        library:                {content: "", req: false, included: false, checked: false},
        academic_advising:      {content: "", req: false, included: false, checked: false},
        career:                 {content: "", req: false, included: false, checked: false},
        counselling:            {content: "", req: true, included: false, checked: true},
        tech_help:              {content: "", req: false, included: false, checked: false}
    });
    useEffect( () => {
        props.updateState(supportServices);
    })

    const handleCheckChange = (info) => {
        const fieldName = info.target.name;
        const checked = info.target.checked;
        const required = supportServices[fieldName].req;
        const included = supportServices[fieldName].included;
        setSupportServices({
            ...supportServices, [fieldName]: {content: "", req: required, included: included, checked: checked}
        });
    }

    return(
        <fieldset className="row" id="services">
            <legend id="student-services">Available Student Services</legend>
            <div className="form-section">
                <p className="intro-info">
                    Below is a list of the required and suggested information about services available to your students.
                    The default will be automatically added to your syllabus when checked.
                    <br/><br/>
                    To see a preview of the service description, click on the arrow to the right.
                </p>
                <div className="col s12">
                    <ul id="student_service_accordion">
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="learning_center" className="filled-in" onChange={handleCheckChange}/>
                                <span>Russell E. Horn Sr. Learning Center, SEC 201</span>
                            </label>
                            <button type="button" className="form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#service_policies-1" aria-expanded="false" aria-controls="service_policies-1">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-1" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: LEARNING_CENTER}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="disability" className="filled-in" checked="checked" disabled="disabled"/>
                                <span>Disability Services, SEC 205</span>
                                <span className="required-symbol"></span>
                            </label>
                            <button type="button" className="form-dropdown-button collapsed right" data-toggle="collapse"
                                    data-target="#service_policies-2" aria-expanded="false" aria-controls="service_policies-2">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-2" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: DISABILITY_RESOURCES}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="library" className="filled-in" onChange={handleCheckChange}/>
                                <span>Library Services</span>
                            </label>
                            <button type="button" className="collapsed right form-dropdown-button" data-toggle="collapse"
                                    data-target="#service_policies-3" aria-expanded="false" aria-controls="service_policies-3">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-3" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: LIBRARY}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="academic_advising" className="filled-in" onChange={handleCheckChange}/>
                                <span>Academic Advising, SEC 204</span>
                            </label>
                            <button type="button" className="collapsed right form-dropdown-button" data-toggle="collapse"
                                    data-target="#service_policies-4" aria-expanded="false" aria-controls="service_policies-4">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-4" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: ACADEMIC_ADVISING}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="career" className="filled-in" onChange={handleCheckChange} />
                                <span>Career Services & Student Conduct, SEC 212</span>
                            </label>
                            <button type="button" className="collapsed right form-dropdown-button" data-toggle="collapse"
                                    data-target="#service_policies-5" aria-expanded="false" aria-controls="service_policies-5">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-5" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: CAREER_SERVICES}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="counselling" className="filled-in" checked="checked" disabled="disabled"/>
                                <span>Counseling & Psychological Services, SEC 205</span>
                                <span className="required-symbol"></span>
                            </label>
                            <button type="button" className="collapsed right form-dropdown-button" data-toggle="collapse"
                                    data-target="#service_policies-6" aria-expanded="false" aria-controls="service_policies-6">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-6" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: COUNSELING}}/>
                                </div>
                            </div>
                        </li>
                        <li className="policy-list-item col-sm-12">
                            <label>
                                <input type="checkbox" name="tech_help" className="filled-in" onChange={handleCheckChange}/>
                                <span>Technology Help Desk, Basement of Olmsted Building</span>
                            </label>
                            <button type="button" className="collapsed right form-dropdown-button" data-toggle="collapse"
                                    data-target="#service_policies-7" aria-expanded="false" aria-controls="service_policies-7">
                                <i className="material-icons right">keyboard_arrow_down</i>
                            </button>
                            <div id="service_policies-7" className="col-sm-12 row collapse" data-parent="#student_service_accordion">
                                <div className="policy-box">
                                    <p className="emph">Service Description:</p>
                                    <div dangerouslySetInnerHTML={{__html: TECH_HELP}}/>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </fieldset>
    )
}
