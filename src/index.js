import React, {useEffect, useState, Component} from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/bootstrap.css';
import './css/html-syllabus-styles.css';
import './css/preview-styles.css';
import './css/main-content.css';
import SyllabusPreview from "./SyllabusPreview";
import sanitizeHtml from 'sanitize-html';
import RequirementsChecklist from "./RequirementsChecklist";
import TopBar from "./TopBar";
import SideNav from "./SideNav";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateToHTML} from 'draft-js-export-html';

class ControlledEditor extends Component {
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
			if(dirtyHTML === "<p><br></p>"){dirtyHTML = ""}
			let cleanHTML = sanitizeHtml(dirtyHTML);
			let tempInfo = {
				id: this.props.id,
				value: cleanHTML
			}
			this.props.updateContent(tempInfo);
		}
	};

	render() {
		const { editorState } = this.state;
		return (
			<Editor
				editorState={editorState}
				wrapperClassName="demo-wrapper"
				editorClassName="demo-editor"
				onEditorStateChange={this.onEditorStateChange}
			/>
		)
	}
}


//Main function that contains all the contents
function App() {

	const[webView, setWebViewState] = React.useState( {
		sideNavOpen: true
	})

  const [state, setState] = React.useState({
	//course info
	course_num: "",
	course_name: "",
	course_section: "",
	meeting_location: "",
	//course schedule and meeting times
	course_start_date: "",
	course_end_date: "",
	course_meeting_type: "",
	course_meeting_days: "",
	course_start_times: "",
	course_end_times: "",
	//contact info
	instructor_name: "",
	email: "",
	phone: "",
	office_location : "",
	//Rich Text Editor Text
	RichTextCourseGoal : "",
	RichTextPrereq : "",
	RichTextRequiredTextbooks: "",
	RichTextAdditionalRequiredMaterials: "",
	RichTextLabInfo: "",
	RichTextAdditionalMaterials: "",
	RichTextExamPolicies: "",
	RichTextAdditionalContent: "",
   //meeting days
	meeting_mon: false,
	meeting_tues: false,
	meeting_wed: false,
	meeting_thurs: false,
	meeting_fri: false,
	meeting_sat: false,
	meeting_sun: false,
	//office hour days
	office_mon: false,
	office_tues: false,
	office_wed: false,
	office_thurs: false,
	office_fri: false,
	office_sat: false,
	office_sun: false,

		office_start_time : "",
		office_end_time : "",

      //Grading Scale
      //JP_Changes
      grade_percentage : false,
      grade_points: false,
      grade_A: [94, 100, 940, 1000],
      grade_A_minus: [90, 93, 900, 930],
      grade_B_plus: [87, 89, 970, 890],
      grade_B: [83, 86, 830, 860],
      grade_B_minus: [80, 82, 800, 820],
      grade_C_plus: [77, 79, 770, 790],
      grade_C: [70, 76, 700, 760],
      grade_D: [60, 69, 600, 690],
      grade_F: [59, 590],

	disability_statement : false
  })

    // courseInfo holds data related to the course information section
    const [courseInfo, setCourseInfo] = useState( {
            course_num: "",
            course_name: "",
            course_section: "",
            meeting_location: ""
        });

    // meetingInfo holds data related to meetings for the course
    // when new meeting added, add additional object to meeting_times array
	const [meetingInfo, setMeetingInfo] = useState({
        meeting_location: "",
        meeting_times: [
            {
                meeting_id: 0,
                meeting_type: "",
                days: [
                    {monday: false},
                    {tuesday: false},
                    {wednesday: false},
                    {thursday: false},
                    {friday: false},
                    {saturday: false},
                    {sunday: false}
                ],
                start_time: null,
                end_time: null
            }
            ]
    });

	// contactInfo holds data related to contacting the instructor, including
    // office hours.
    // when a new set of hours is added, add additional object to officeHours
    const [contactInfo, setContactInfo] = useState({
        instructor_name: "",
        email: "",
        phone: "",
        office_location : "",
        office_hours: [
            {
                timeslot_id: 0,
                days: [
                    {monday: false},
                    {tuesday: false},
                    {wednesday: false},
                    {thursday: false},
                    {friday: false},
                    {saturday: false},
                    {sunday: false}
                ],
                start_time: null,
                end_time: null
            }
        ]
    });

    // holds RTE formatted text for course goals and objectives
    const [courseObjectives, setCourseObjectives] = useState("");

    // holds RTE formatted text for course prerequisites
    const [coursePrereqs, setCoursePrereqs] = useState("");

    // holds RTE formatted text for required materials
    const [requiredMaterials, setRequiredMaterials] = useState({
        req_textbooks: "",
		req_add_materials: "",
        req_lab_info: "",
        has_no_required: false
    });

    // holds RTE formatted text for additional (optional) materials
    const [additionalMaterials, setAdditionalMaterials] = useState("");

    // holds info about exams, assignments, and grading scale/breakdown
    // TODO: Need to create assignment form fields
    const [assessmentInfo, setAssessmentInfo] = useState({
        assignments: [{
            title:"",
            description:"",
            points_each: 0,
            num_of: 0,
            points_total: 0
        }],
        exam_info: "",
        grading_scale_type: {
            percent: true,
            points: false,
        },
        values: [
            {letter: "A",   low: 94,    high: 100},
            {letter: "A-",  low: 90,    high: 94},
            {letter: "B+",  low: 87,    high: 90},
            {letter: "B",   low: 83,    high: 87},
            {letter: "B-",  low: 80,    high: 83},
            {letter: "C+",  low: 77,    high: 80},
            {letter: "C",   low: 70,    high: 77},
            {letter: "D",   low: 60,    high: 70},
            {letter: "F",   low: 0,     high: 60},
        ]

    });

    // holds RTE of any optional additional content
    const [additionalContent, setAdditionalContent] = useState("");

    // holds information about required policies
    // TODO: initialize from external source, TBD
    const [requiredPolicies, setRequiredPolicies] = useState({
		academic_integrity: {
			title: "Academic Integrity Statement",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu hendrerit erat. Donec eu porttitor arcu. " +
				"Suspendisse elit lorem, vestibulum a metus et, auctor tincidunt justo. Duis hendrerit mi in condimentum mollis. " +
				"Vestibulum sed accumsan nulla. Donec ut risus iaculis, egestas purus pellentesque, convallis nisl. Sed tincidunt " +
				"posuere sapien, non faucibus purus. Phasellus id molestie ligula. Integer eu luctus velit.",
			preview: false
		},
		disability_access: {
			title: "Disability Statement",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu hendrerit erat. Donec eu porttitor arcu. " +
				"Suspendisse elit lorem, vestibulum a metus et, auctor tincidunt justo. Duis hendrerit mi in condimentum mollis. " +
				"Vestibulum sed accumsan nulla. Donec ut risus iaculis, egestas purus pellentesque, convallis nisl. Sed tincidunt " +
				"posuere sapien, non faucibus purus. Phasellus id molestie ligula. Integer eu luctus velit.",
			preview: false
		},
		counseling_statement: {
			title: "Counselling and Psychological Services Statement",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu hendrerit erat. Donec eu porttitor arcu. " +
				"Suspendisse elit lorem, vestibulum a metus et, auctor tincidunt justo. Duis hendrerit mi in condimentum mollis. " +
				"Vestibulum sed accumsan nulla. Donec ut risus iaculis, egestas purus pellentesque, convallis nisl. Sed tincidunt " +
				"posuere sapien, non faucibus purus. Phasellus id molestie ligula. Integer eu luctus velit.",
			preview: false
		},
		educational_equity: {
			title: "Educational Equity Statement",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu hendrerit erat. Donec eu porttitor arcu. " +
				"Suspendisse elit lorem, vestibulum a metus et, auctor tincidunt justo. Duis hendrerit mi in condimentum mollis. " +
				"Vestibulum sed accumsan nulla. Donec ut risus iaculis, egestas purus pellentesque, convallis nisl. Sed tincidunt " +
				"posuere sapien, non faucibus purus. Phasellus id molestie ligula. Integer eu luctus velit.",
			preview: false
		},
		mandated_reporting: {
			title: "Mandated Reporting Statement",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu hendrerit erat. Donec eu porttitor arcu. " +
				"Suspendisse elit lorem, vestibulum a metus et, auctor tincidunt justo. Duis hendrerit mi in condimentum mollis. " +
				"Vestibulum sed accumsan nulla. Donec ut risus iaculis, egestas purus pellentesque, convallis nisl. Sed tincidunt " +
				"posuere sapien, non faucibus purus. Phasellus id molestie ligula. Integer eu luctus velit.",
			preview: false
		},
		covid_statements: {
			title: "Covid-19 Statements",
			content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu hendrerit erat. Donec eu porttitor arcu. " +
				"Suspendisse elit lorem, vestibulum a metus et, auctor tincidunt justo. Duis hendrerit mi in condimentum mollis. " +
				"Vestibulum sed accumsan nulla. Donec ut risus iaculis, egestas purus pellentesque, convallis nisl. Sed tincidunt " +
				"posuere sapien, non faucibus purus. Phasellus id molestie ligula. Integer eu luctus velit.",
			preview: false
		}
	});

	// currently handles changes for ALL non RTE input
	// attempt to break it up by different types
  function handleChange(evt) {
	const value = evt.target.value;
	setState({
	  ...state,
	  [evt.target.name]: value
	});
  }

  function handleRichEditorChange(key, value) {
	setState({
	  ...state,
	  [key]: value
	});
  }

  function handleChangeCheckbox(evt) {
		const value =
		  evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
		setState({
		  ...state,
		  [evt.target.name]: value
		});
	}

	const [includedContentCheck, setIncludedContentCheck] = useState({
		course_num: 		{content: "Course Number", added: false, required: false},
		course_name: 		{content: "Course Name", added: false, required: false},
		course_section:		{content: "Course Section", added: false, required: false},
		meeting_location: 	{content: "Scheduled Meeting Location", added: false, required: false},
		meeting_times: 		{content: "Scheduled Meeting Times", added: false, required: false},
		instructor_name: 	{content: "Instructor Name", added: false, required: true},
		instructor_contact: {content: "Instructor Phone/Email", added: false, required: true},
		office_hours: 		{content: "Office Hours", added: false, required: true},
		course_objectives: 	{content: "Course goals and objectives", added: false, required: true},
		course_prereqs: 	{content: "Prerequisites", added: false, required: false},
		req_textbooks: 		{content: "Required Textbooks", added: false, required: true},
		req_add_materials: 	{content: "Additional Required Materials", added: false, required: true},
		req_lab_info: 		{content: "Required Lab Info", added: false, required: true},
		add_materials: 		{content: "Additional Materials", added: false, required: false},
		assessment_info: 	{content: "Assessment and Grading Scale", added: false, required: true},
		exam_info: 			{content: "Examination Policy/Schedule", added: false, required: true},
		detailed_sched: 	{content: "Detailed Course Schedule", added: false, required: false},
		additional_content: {content: "Custom Content", added: false, required: false},
		required_policies: 	{content: [
				"Academic Integrity Statement",
				"Disability Statement",
				"Counselling and Psychological Services Statement",
				"Educational Equity",
				"Mandated Reporting",
				"Covid-19 Statements"
			], added: true, required: true}
	});

	// updates course info and related checklist items
	function handleCourseInfo(info){
		const value = info.target.value;
		const name = info.target.name;
		setCourseInfo({
			...courseInfo,
			[name]: value
		});
		if(value != "" && !includedContentCheck[name].added){updateChecklist(name, true);}
		if(value === "" && includedContentCheck[name].added){updateChecklist(name, false);}
	}

	// updates contact info and related checklist items
	function handleContactInfo(info){
		const value = info.target.value;
		const name = info.target.name;
		setContactInfo({
			...contactInfo,
			[name]: value
		});
		if(value != "" && !includedContentCheck[name].added){updateChecklist(name, true);}
		if(value === "" && includedContentCheck[name].added){updateChecklist(name, false);}
	}

	function handleCourseObjectives(info){
		setCourseObjectives(info.value);
		if(info.value != "" && !includedContentCheck[info.id].added){updateChecklist(info.id, true);}
		if(info.value === "" && includedContentCheck[info.id].added){updateChecklist(info.id, false);}
	}

	function handleCoursePrereqs(info){
		setCoursePrereqs(info.value);
		if(info.value != "" && !includedContentCheck[info.id].added){updateChecklist(info.id, true);}
		if(info.value === "" && includedContentCheck[info.id].added){updateChecklist(info.id, false);}
	}

	function handleRequiredMaterials(info){
		const value = info.value;
		const id = info.id;
		setRequiredMaterials({
			...requiredMaterials,
			[id]: value
		})
		if(value != "" && !includedContentCheck[id].added){
			updateChecklist(id, true);
		}
		if(value === "" && includedContentCheck[id].added){
			updateChecklist(id, false);
		}
	}

	function handleNoReqMaterials(info){
		setRequiredMaterials({
			...requiredMaterials,
			[info.target.id]: [info.target.checked]
		})
	}

	function handleAdditionalMaterials(info){
		setAdditionalMaterials(info.value);
		if(info.value != "" && !includedContentCheck[info.id].added){updateChecklist(info.id, true);}
		if(info.value === "" && includedContentCheck[info.id].added){updateChecklist(info.id, false);}
	}

    //JP_Changes
    //added a function to save the states of the different grades:
    //A, A_minus, B_plus, B, B_minus, C_plus, C, D, F
    function handleGradeOnChange(evt, grade_state, indx)
    {
        const value = evt.target.value
        const new_grade_state = grade_state.slice()
        new_grade_state[indx] = value

        setState({
            ...state,
            [evt.target.name]: new_grade_state
        });

        console.log(evt.target.name, value);
        console.log(state);
    }

	function handleExamInfo(info){
		setAssessmentInfo({
			...assessmentInfo,
			exam_info: info.value
		});
		if(info.value != "" && !includedContentCheck[info.id].added){updateChecklist(info.id, true);}
		if(info.value === "" && includedContentCheck[info.id].added){updateChecklist(info.id, false);}
	}

	function handleAdditionalContent(info){
		setAdditionalContent(info.value);
		if(info.value != "" && !includedContentCheck[info.id].added){updateChecklist(info.id, true);}
		if(info.value === "" && includedContentCheck[info.id].added){updateChecklist(info.id, false);}
	}

	function updateChecklist(fieldName, isIncluded){
		let tempContent = includedContentCheck[fieldName].content;
		let tempReq = includedContentCheck[fieldName].required;
		setIncludedContentCheck({
			...includedContentCheck,
			[fieldName]: {content: tempContent, added: isIncluded, required: tempReq}
		});
	}

	function toggleRequiredPolicies(info){
		let newVal = requiredPolicies[info.target.name];
		// setRequiredPolicies({
		// 	...requiredPolicies,
		// 	[info.target.name]:
		// })
	}

	function toggleSideNav(){
		let tmpOpenStatus = !webView.sideNavOpen;
		setWebViewState({
			sideNavOpen: tmpOpenStatus
		});
	}


  return (
	  <><div id="app-container">
		  <TopBar toggleNav={toggleSideNav} isOpen={webView.sideNavOpen} />
		  <div className="main-container">
		  	<SideNav isOpen={webView.sideNavOpen}/>
		  	<main class="container content-container">
				<section className="row section">
					<div className="col s12 intro">
						<h2 id="title">What is the Syllabus Generator?</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas faucibus fringilla. Mauris
							magna lectus, egestas ut dolor a, malesuada gravida lectus. Proin lobortis nunc id consectetur
							tempor. Donec quis mauris dapibus ex iaculis sollicitudin. Donec id ligula arcu. Integer luctus
							magna metus, vel tempor dui iaculis eu. Aenean porta maximus dapibus. Vivamus euismod felis
							quam, in rhoncus dolor efficitur eu. Morbi quis diam vel eros consectetur tristique finibus quis
							lorem. Vivamus tristique venenatis tortor sit amet ultricies. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lectus eros, fringilla et
							sem quis, consectetur lacinia sem. Curabitur at quam eu orci consequat accumsan sed vitae
							dui.</p>
					</div>
				</section>
				<section className="row section">
					<div class="col s12 requirements">
							<h2 id="title">Syllabus Requirements</h2>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas faucibus fringilla. Mauris magna lectus, egestas ut dolor a, malesuada gravida lectus. Proin lobortis nunc id consectetur tempor. Donec quis mauris dapibus ex iaculis sollicitudin. Donec id ligula arcu. Integer luctus magna metus, vel tempor dui iaculis eu. Aenean porta maximus dapibus. Vivamus euismod felis quam, in rhoncus dolor efficitur eu. Morbi quis diam vel eros consectetur tristique finibus quis lorem. Vivamus tristique venenatis tortor sit amet ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lectus eros, fringilla et sem quis, consectetur lacinia sem. Curabitur at quam eu orci consequat accumsan sed vitae dui.</p>
					</div>
				</section>
				<section className="row section">
					<div className="col s12">
						<div className="row">
							<h2>Build a Syllabus</h2>
							<p id="description">Fill in the sections below to create a syllabus.</p>
						</div>

						<form id="syllabus-generator" className="col s12">

						<fieldset className="row">
							<legend>Course Information</legend>
							<div class="form-section">
							<p>Description for information in this section goes here.</p>
							<div class="input-field col s12 m6">
							  <label for="course_name">Course Number:</label>
							  <input type="text" id="course_name" placeholder="EDUC 305"
								 name="course_num"
								 value={courseInfo.course_num}
								 onChange={handleCourseInfo} />
							</div>
							  <div class="input-field col s12 m6">
							  <label for="course_name">Course Name:</label>
							  <input type="text" id="course_name" placeholder="Creative Arts"
								  name="course_name"
								  value={courseInfo.course_name}
								  onChange={handleCourseInfo}/>
							</div>
							<div class="input-field col s12 m6">
							  <label id="course_section">Section:</label>
							  <input type="email" id="course_section" placeholder="001"
								  name="course_section"
								  value={courseInfo.course_section}
								  onChange={handleCourseInfo}/>
							</div>
							<div class="input-field col s12 m6">
							  <label for="meeting_location">Meeting Location:</label>
							  <input type="text" id="meeting_location" placeholder="Olmsted 205"
								  name="meeting_location"
								  value={courseInfo.meeting_location}
								  onChange={handleCourseInfo}/>
							</div>
							</div>
						</fieldset>

						<fieldset className="row">
							<legend>Course Meeting Times & Location</legend>
							<div class="form-section">
								<p>Description for information in this section goes here.</p>
								<div class="input-field col s12 m6">

									<input id="end-date" type="date"
									  name="course_start_date"
									  value={state.course_start_date}
									  onChange={handleChange}/>
									<label className="active" htmlFor="start-date">Course Start Date:</label>
								</div>
								<div class="input-field col s12 m6">

									<input id="end-date" type="date"
									name="course_end_date"
									value={state.course_end_date}
									onChange={handleChange}
									/>
									<label htmlFor="end-date" className="active">Course End Date:</label>
								</div>
							</div>
						</fieldset>

						<fieldset className="row">
							<legend>Contact Information</legend>
							<div className="form-section">
								<p>Description for information in this section goes here.</p>
								<div class="input-field col s12 m6">
									<label for="name">Instructor Name:</label>
									<input type="text" id="name" name="name" placeholder="Dr. John Smith" required="Required"
									name="instructor_name"
									value={contactInfo.instructor_name}
									onChange={handleContactInfo}
									/>
								</div>
								<div class="input-field col s12 m6">
								  <label for="email">Email:</label>
								  <input type="email" id="email" name="user_email" placeholder="abc@psu.edu" required=""
								  name="email"
								  value={contactInfo.email}
								  onChange={handleContactInfo}
								  />
								</div>
								<div class="input-field col s12 m6">
								  <label for="phone">Phone:</label>
								  <input type="tel" id="phone" name="phone" placeholder="000-000-0000" required=""
								  name="phone"
								  value={contactInfo.phone}
								  onChange={handleContactInfo}
								  />
								</div>
								<div class="input-field col s12 m6">
								  <label for="office">Office Location:</label>
								  <input type="text" id="office" name="office" placeholder="Olmsted 203" required=""
								  name="office_location"
								  value={contactInfo.office_location}
								  onChange={handleContactInfo}
								  />
								</div>
							</div>
							<div className="form-section">
								<h4>Office Hours</h4>
							</div>
						</fieldset>

						<fieldset className="row">
							<legend>Course Goals & Objectives</legend>
							<div class="form-section">
								<p>Description for information in this section goes here.</p>
								<label for="objectives">Course Goals and Objectives:</label>
								<ControlledEditor updateContent={handleCourseObjectives} id="course_objectives" />
							</div>
						</fieldset>

						<fieldset>
							<legend>Prerequisites</legend>
							<div class="form-section">
								<p class="description">
								Description for information in this section goes here.
								</p>
								<label for="prerequisites">Prerequisites:</label>
								<ControlledEditor updateContent={handleCoursePrereqs} id="course_prereqs"/>
							</div>
						</fieldset>

						<fieldset>
							<legend>Required Materials</legend>

							<div class="form-section">
								<p class="description">
								Description for information in this section goes here.
								</p>
								<label for="req_textbooks">
								Required Textbooks:</label>
								<ControlledEditor updateContent={handleRequiredMaterials} id="req_textbooks"/>
								<label for="req_add_materials">
								Additional Required Materials:</label>
								<ControlledEditor updateContent={handleRequiredMaterials} id="req_add_materials"/>
								<label for="req_lab_info">
								Lab Information:
								</label>
								<ControlledEditor updateContent={handleRequiredMaterials} id="req_lab_info"/>

								<div class="radio-set">
									<div class="custom-control custom-checkbox custom-control-inline">
										<input type="checkbox" id="has_no_required" class="custom-control-input"
											   checked={requiredMaterials.has_no_required}
											   onChange={handleNoReqMaterials}
										/>
										<label for="has_no_required" class="custom-control-label">
											There are no required materials for this course.
										</label>
									</div>
								</div>
							</div>
						</fieldset>

						 <fieldset>
							<legend>Additional Materials</legend>
							<div class="form-section">
								<p class="description">
								Description for information in this section goes here.
								</p>
								<label for="additional-materials">
								Additional Materials:</label>
								<ControlledEditor updateContent={handleAdditionalMaterials} id="add_materials"/>
							</div>
						</fieldset>

						<fieldset>
							<legend>Assessment and Grading Scale</legend>
							<div class="form-section">
								<p class="description">
								Description for information in this section goes here.
								</p>
							<div>
								<label for="exam_info">Exam Policies:</label>
								<ControlledEditor updateContent={handleExamInfo} id="exam_info"/>
							</div>
							<div>
                                <h4>Grading Scale</h4>
                                <div class="radio-set">
                                    <span class="title">Type of Grade: </span>
                                    {/*JP_Changes*/}
                                    {/*saved the state of percent-grade checkbox*/}
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="percent-grade" name="grade_percentage" value="percent"
                                                   defaultChecked={state.grade_percentage}
                                                   onChange={handleChangeCheckbox}
                                            />
                                            <label for="percent-grade" class="custom-control-label">Percent</label>
                                        </div>
                                        {/*JP_Changes*/}
                                        {/*saved the state of point-grade checkbox*/}
                                        <div class="custom-control custom-checkbox custom-control-inline">
                                            <input type="checkbox" class="custom-control-input" id="point-grade" name="grade_points" value="point"
                                                   defaultChecked={state.grade_points}
                                                   onChange={handleChangeCheckbox}
                                            />
                                            <label for="point-grade" class="custom-control-label">Points</label>
                                        </div>
                                    </div>
                                </div>
                                <>
                                    <div class="grade-scale">
                                        {/*JP_Changes*/}
                                        {/*Added state values to each letter grade state*/}
                                        <ul>
                                            <li>
                                                <label class="letter">A</label>
                                                {/*JP_Changes*/}
                                                {/*percentage*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_A" min="0" max ="100"
                                           defaultValue={state.grade_A[0]}
                                           onChange={e => handleGradeOnChange(e,state.grade_A, 0)}
                                    />  to
                                    <input type="number" name="grade_A" min="0" max ="100"
                                           defaultValue={state.grade_A[1]}
                                           onChange={e => handleGradeOnChange(e,state.grade_A, 1)}
                                    />
                                    </span> :
                                                    <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_A" min="0"
                                           defaultValue={state.grade_A[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_A, 2)}
                                    />  to
                                    <input type="number" name="grade_A" min="0"
                                           defaultValue={state.grade_A[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_A, 3)}
                                    />
                                </span> :
                                                    <></>
                                                }

                                            </li>
                                            <li>
                                                <label class="letter">A-</label>
                                                {/*JP_Changes*/}
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_A_minus" min="0" max="100"
                                           defaultValue={state.grade_A_minus[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_A_minus, 0)}
                                    />  to
                                    <input type="number" name="grade_A_minus" min="0" max="100"
                                           defaultValue={state.grade_A_minus[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_A_minus, 1)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_A_minus" min="0"
                                           defaultValue={state.grade_A_minus[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_A_minus, 2)}
                                    />  to
                                    <input type="number" name="grade_A_minus" min="0"
                                           defaultValue={state.grade_A_minus[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_A_minus, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">B+</label>
                                                {/*JP_Changes*/}
                                                {/*Percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_B_plus" min="0" max="100"
                                           defaultValue={state.grade_B_plus[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_plus, 0)}
                                    />  to
                                    <input type="number" name="grade_B_plus" min="0" max="100"
                                           defaultValue={state.grade_B_plus[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_plus, 1)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_B_plus" min="0"
                                           defaultValue={state.grade_B_plus[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_plus, 2)}
                                    />  to
                                    <input type="number" name="grade_B_plus" min="0"
                                           defaultValue={state.grade_B_plus[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_plus, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">B</label>
                                                {/*JP_Changes*/}
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_B" min="0" max="100"
                                           defaultValue={state.grade_B[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B, 0)}
                                    />  to
                                    <input type="number" name="grade_B" min="0" max="100"
                                           defaultValue={state.grade_B[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B, 1)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_B" min="0"
                                           defaultValue={state.grade_B[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B, 2)}
                                    />  to
                                    <input type="number" name="grade_B" min="0"
                                           defaultValue={state.grade_B[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">B-</label>
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_B_minus" min="0" max="100"
                                           defaultValue={state.grade_B_minus[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_minus, 0)}
                                    />  to
                                    <input type="number" name="grade_B_minus" min="0" max="100"
                                           defaultValue={state.grade_B_minus[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_minus, 1)}
                                    />
                                    </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_B_minus" min="0"
                                           defaultValue={state.grade_B_minus[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_minus, 2)}
                                    />  to
                                    <input type="number" name="grade_B_minus" min="0"
                                           defaultValue={state.grade_B_minus[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_B_minus, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">C+</label>
                                                {/*JP_Changes*/}
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_C_plus" min="0" max="100"
                                           defaultValue={state.grade_C_plus[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C_plus, 0)}
                                    /> to
                                    <input type="number" name="grade_C_plus" min="0" max="100"
                                           defaultValue={state.grade_C_plus[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C_plus, 1)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_C_plus" min="0"
                                           defaultValue={state.grade_C_plus[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C_plus, 2)}
                                    />  to
                                    <input type="number" name="grade_C_plus" min="0"
                                           defaultValue={state.grade_C_plus[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C_plus, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">C</label>
                                                {/*JP_Changes*/}
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_C" min="0" max="100"
                                           defaultValue={state.grade_C[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C, 0)}
                                    />  to
                                    <input type="number" name="grade_C" min="0" max="100"
                                           defaultValue={state.grade_C[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C, 1)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_C" min="0"
                                           defaultValue={state.grade_C[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C, 2)}
                                    />  to
                                    <input type="number" name="grade_C" min="0"
                                           defaultValue={state.grade_C[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_C, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">D</label>
                                                {/*JP_Changes*/}
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <input type="number" name="grade_D" min="0" max="100"
                                           defaultValue={state.grade_D[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_D, 0)}
                                    />  to
                                    <input type="number" name="grade_D" min="0" max="100"
                                           defaultValue={state.grade_D[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_D, 1)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <input type="number" name="grade_D" min="0"
                                           defaultValue={state.grade_D[2]}
                                           onChange={e => handleGradeOnChange(e, state.grade_D, 2)}
                                    />  to
                                    <input type="number" name="grade_D" min="0"
                                           defaultValue={state.grade_D[3]}
                                           onChange={e => handleGradeOnChange(e, state.grade_D, 3)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                            <li>
                                                <label class="letter">F</label>
                                                {/*JP_Changes*/}
                                                {/*percentages*/}
                                                {state.grade_percentage ?
                                                    <span class="range">
                                    <span> below </span>
                                    <input type="number" name="grade_F" min="0" max="100"
                                           defaultValue={state.grade_F[0]}
                                           onChange={e => handleGradeOnChange(e, state.grade_F, 0)}
                                    />
                                </span> : <></>
                                                }

                                                {/*JP_Changes*/}
                                                {/*points*/}
                                                {state.grade_points ?
                                                    <span className="range">
                                    <span> below </span>
                                    <input type="number" name="grade_F" min="0"
                                           defaultValue={state.grade_F[1]}
                                           onChange={e => handleGradeOnChange(e, state.grade_F, 1)}
                                    />
                                </span> : <></>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            </div>

                        </fieldset>

				<fieldset>
					<legend>Detailed Course Schedule</legend>
					<div class="form-section">
						<p class="description">
						A course schedule can be automatically generated based on meeting times and days. You can choose to fill it in later or use this app to do so.</p>
						<div class="form-group">
							<div class="custom-control custom-radio not-inline">
								<input type="radio" id="include-schedule" value="include-schedule" name="schedule-type" class="custom-control-input" checked/>
								<label for="include-schedule" class="custom-control-label">
									Include empty weekly schedule in syllabus
								</label>
							</div>
							<div class="custom-control custom-radio not-inline">
								<input type="radio" id="separate-schedule" value="separate-schedule" name="schedule-type" class="custom-control-input"/>
								<label for="separate-schedule" class="custom-control-label">
									Generate empty weekly schedule in a separate file
								</label>
							</div>
							<div class="custom-control custom-radio not-inline">
								<input type="radio" id="build-schedule" value="build-schedule" name="schedule-type" class="custom-control-input"/>
								<label for="build-schedule" class="custom-control-label">
									Build schedule with app
								</label>
							</div>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Additional Syllabus Content</legend>
					<div class="form-section">
						<p class="description">
						Include any additional content you would like in the syllabus here.
						</p>
						<label for="additional-content">Additional Content:</label>
						<ControlledEditor updateContent={handleAdditionalContent} id="additional_content"/>
					</div>
				</fieldset>

				<fieldset disabled="">
					<legend>Required Policies</legend>
					<div class="form-section">
						<p class="description">
						These policies will be included in the generated syllabus. Click on a policy to see a preview of it.
						</p>
						<div class="form-group">
							<div class="custom-control custom-checkbox not-inline">
								<input type="checkbox" id="policy-ai" value="academic-integrity" class="custom-control-input" checked/>
								<label for="policy-ai" class="custom-control-label">
									<div >
										<a className="read-more-link" name="academic_integrity"><span>{requiredPolicies.academic_integrity.title}</span></a>
											{requiredPolicies.academic_integrity.preview && requiredPolicies.academic_integrity.content}
									</div>
								</label>
							</div>
							<div class="custom-control custom-checkbox not-inline">
								<input type="checkbox" id="policy-da" value="disability-access" class="custom-control-input" checked/>
								<label for="policy-da" class="custom-control-label">
									<div >
										<a className="read-more-link"><span>{requiredPolicies.disability_access.title}</span></a>
											{requiredPolicies.disability_access.preview && requiredPolicies.disability_access.content}
									</div>
								</label>
							</div>
							<div class="custom-control custom-checkbox not-inline">
								<input type="checkbox" id="policy-cs" value="counseling-services" class="custom-control-input" checked/>
								<label for="policy-cs" class="custom-control-label">
								  <div >
										<a className="read-more-link"><span>{requiredPolicies.counseling_statement.title}</span></a>
											{requiredPolicies.counseling_statement.preview && requiredPolicies.counseling_statement.content }
									</div>
								</label>
							</div>
							<div class="custom-control custom-checkbox not-inline">
								<input type="checkbox" id="policy-ee" value="educational-equity" class="custom-control-input" checked/>
								<label for="policy-ee" class="custom-control-label">
									<div >
										<a className="read-more-link"><span>{requiredPolicies.educational_equity.title}</span></a>
											{requiredPolicies.educational_equity.preview && requiredPolicies.educational_equity.content}
									</div>
								</label>
							</div>
							<div class="custom-control custom-checkbox not-inline">
								<input type="checkbox" id="policy-mr" value="mandated-reporting" class="custom-control-input" checked/>
								<label for="policy-mr" class="custom-control-label">
									<div >
										<a className="read-more-link"><span>{requiredPolicies.mandated_reporting.title}</span></a>
											{requiredPolicies.mandated_reporting.preview && requiredPolicies.mandated_reporting.content}
									</div>
								</label>
							</div>
							<div class="custom-control custom-checkbox not-inline">
								<input type="checkbox" id="policy-c19" value="covid-19-statements" class="custom-control-input" checked/>
								<label for="policy-c19" class="custom-control-label">
									<div >
										<a className="read-more-link"><span>{requiredPolicies.covid_statements.title}</span></a>
											{requiredPolicies.covid_statements.preview && requiredPolicies.covid_statements.content}
									</div>
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				<div class="line-break"></div>

					<div id="submitbutton">
						<button type="submit" id="submit" class="btn btn-primary btn-lg">
							Generate a full syllabus
						</button>  
					</div>
					</form>
					</div>
				</section>

				<RequirementsChecklist requirementsInfo={includedContentCheck} />
				<SyllabusPreview userInput={{courseInfo, contactInfo, meetingInfo,
										courseObjectives, assessmentInfo, requiredMaterials,
										additionalMaterials ,coursePrereqs, additionalContent,
										includedContentCheck, requiredPolicies}} />

				<div className="footer">
					<p>The policies and syllabus requirements were last updated on 12/03/2020.</p>
				</div>
			</main>

		  </div>
	  </div>
	  </>
  );
}


ReactDOM.render(
  <React.StrictMode>
	<App />
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
