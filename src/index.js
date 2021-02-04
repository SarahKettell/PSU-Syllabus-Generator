import React, {useEffect, useState, Component} from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/bootstrap.css';
import './css/html-syllabus-styles.css';
import './css/preview-styles.css';
import RichTextEditor from 'react-rte';
import SyllabusPreview from "./SyllabusPreview";
import sanitizeHtml from 'sanitize-html';
import RequirementsChecklist from "./RequirementsChecklist";


//--------------------------------
import Assignment from './components/Assignment';
import AdditionalMeetingTimes from './components/AdditionalMeetingTimes';

//--------------------------------

// Uses Draft.js for functionality and renders content into HTML format
class MyStatefulEditor extends Component {
	state = {
		value: RichTextEditor.createEmptyValue()
	}

	onChange = (value) => {
		this.setState({value});
		if (this.props.onChange) {
			// Send the changes up to the parent component as an HTML string.
			// This is here to demonstrate using `.toString()` but in a real app it
			// would be better to avoid generating a string on each change.
			this.props.onChange(
				value
			);
		}
		let dirtyHTML = value.toString('html');
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

	render () {
		return (
			<RichTextEditor
				value={this.state.value}
				onChange={this.onChange}
			/>
		);
	}
}


//Main function that contains all the contents
function App() {

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
	//course_meeting_days: "",
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
	// meeting_mon: false,
	// meeting_tues: false,
	// meeting_wed: false,
	// meeting_thurs: false,
	// meeting_fri: false,
	// meeting_sat: false,
	// meeting_sun: false,
	//office hour days
	// office_mon: false,
	// office_tues: false,
	// office_wed: false,
	// office_thurs: false,
	// office_fri: false,
	// office_sat: false,
	// office_sun: false,

	office_start_time : "",
	office_end_time : "",

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
		meeting_type: "",
		meeting_days: {
			monday: false,
			tuesday: false,
			wednesday: false,
			thursday: false,
			friday: false,
			saturday: false,
			sunday: false
		},
		meeting_start_time: "",
		meeting_end_time: "",
		
	});
	
	// additional meetings state variables
	const [addMeetingInfo, setAddMeetingInfo] = useState({
		add_meetings: []
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

	//-----------------------------------------------

	// handles input from the Meeting times section


	// TODO: pretty sure once the input is fixed (where the new meetings aren't inputting for the original meeting), should fix the problem
	function handleMeetingInfo(info) {
		const name = info.target.name;
		
		if(info.target.type === "checkbox") {
			const value = info.target.type === "checkbox" ? info.target.checked : info.target.value;
			let temp = {
				meeting_mon: "monday",
				meeting_tues: "tuesday",
				meeting_wed: "wednesday",
				meeting_thurs: "thursday",
				meeting_fri: "friday",
				meeting_sat: "saturday",
				meeting_sun: "sunday"
			};

			let meeting_days = meetingInfo.meeting_days;
			meeting_days[temp[name]] = value;
			let temp_name = meeting_days;

			setMeetingInfo({
				...meetingInfo,
				[temp_name]: meeting_days
			});

		} else {
			
			const value = info.target.value;
			setMeetingInfo({
				...meetingInfo,
				[name]: value
			});

		}
	}


	function showState(evt) {
		evt.preventDefault();
		console.log(addMeetingInfo.add_meetings);
		
	}

	function deleteAddMeeting(info, index) {
		let add_meetings = addMeetingInfo.add_meetings;
		add_meetings.splice(index, 1);


		console.log("index to be deleted: " + index);
		console.log(add_meetings)
		
		setAddMeetingInfo({
			add_meetings
		});
	}

	function handleAddMeetingInfo(info, i) {
		let name = info.target.name;
		if(info.target.type === "checkbox") {
			
			const value = info.target.checked;

			let temp = {
				add_meeting_mon: "monday",
				add_meeting_tues: "tuesday",
				add_meeting_wed: "wednesday",
				add_meeting_thurs: "thursday",
				add_meeting_fri: "friday",
				add_meeting_sat: "saturday",
				add_meeting_sun: "sunday"
			};

			let meeting_days = addMeetingInfo.add_meetings[i].add_meeting_days;
			meeting_days[temp[name]] = value;
			let temp_name = meeting_days;

			setAddMeetingInfo({
				...addMeetingInfo,
				[temp_name]: meeting_days
			});

		} else {
			
			const value = info.target.value;

			name = name.replace(/[0-9]/g, '');

			let add_meeting = addMeetingInfo.add_meetings[i];
			add_meeting[name] = value;

			let add_meetings = addMeetingInfo.add_meetings;
			add_meetings[i] = add_meeting;
			
			setAddMeetingInfo({
				add_meetings
			});

		}

	}

	function addMeetingTime(evt) {
		evt.preventDefault();
		let new_meeting = {
			add_meeting_type: "",
			add_meeting_days: {
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
				saturday: false,
				sunday: false
			},
			add_meeting_start_time: "",
			add_meeting_end_time: "",
		};
		
		const add_meetings = addMeetingInfo.add_meetings.concat(new_meeting);
		
		setAddMeetingInfo({
			add_meetings
		});
	}
	



    //-----------------------------------------------

    // onClick function for add assessment button
    // Adds blank assessment object into assessmentInfo.assignment array
    function addAssignment(evt) {
		evt.preventDefault();
        let blank_assessment = {
            title:"",
            description:"",
            points_each: 0,
            num_of: 0,
            points_total: 0
        };
        const assignments = assessmentInfo.assignments.concat(blank_assessment);
        setAssessmentInfo({
            assignments
        });
	}
	

    // onChange function for assignments in assessmentInfo
    // TODO: check out the other variables in assessmentInfo
    function handleAssessmentInfo(info, index) {

        const value = info.target.value;
        const name = info.target.name;
        
        let assignment = assessmentInfo.assignments[index];
        assignment[name] = value;
        
        let assignments = assessmentInfo.assignments;
        assignments[index] = assignment;
        
        setAssessmentInfo({
          assignments 
        });
    }

    function deleteAssignment(index) {
        let assignments = assessmentInfo.assignments;
        assignments.splice(index, 1);

        setAssessmentInfo({
            assignments
        });
    }


    //-----------------------
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


  return (
	  <>
		<div id="main-container">
		<div class="container">
		<div class="row intro">
			<div class="col12">
				<h1 id="title">Syllabus Generator</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas faucibus fringilla. Mauris magna lectus, egestas ut dolor a, malesuada gravida lectus. Proin lobortis nunc id consectetur tempor. Donec quis mauris dapibus ex iaculis sollicitudin. Donec id ligula arcu. Integer luctus magna metus, vel tempor dui iaculis eu. Aenean porta maximus dapibus. Vivamus euismod felis quam, in rhoncus dolor efficitur eu. Morbi quis diam vel eros consectetur tristique finibus quis lorem. Vivamus tristique venenatis tortor sit amet ultricies. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lectus eros, fringilla et sem quis, consectetur lacinia sem. Curabitur at quam eu orci consequat accumsan sed vitae dui.</p>
				<div class="intro-buttons">
					<button type="button" class="btn btn-primary btn-lg">
						Create a Syllabus
					</button>
					<button type="button" class="btn btn-primary btn-lg">
						Generate a Template
					</button>
				</div>
			</div>
		</div>

		<div class="row contents">
			<div class="col">
			<div class="box">

				<h2>Syllabus Contents</h2>
				<div class="information">
				<p id="description">
					Fill in the sections below to create a syllabus.
				</p>

				<form id="syllabus-generator">

				<fieldset>
					<legend>Course Information</legend>
					<div class="form-section">
					<p class="description">Description for information in this section goes here.</p>
					<div class="form-field-inline">
					  <label for="course_name">Course Number:</label>
					  <input type="text" id="course_name" placeholder="EDUC 305"
		  name="course_num"
		  value={courseInfo.course_num}
		  onChange={handleCourseInfo} />
					</div>
					  <div class="form-field-inline">
					  <label for="course_name">Course Name:</label>
					  <input type="text" id="course_name" placeholder="Creative Arts"
		  name="course_name"
		  value={courseInfo.course_name}
		  onChange={handleCourseInfo}/>
					</div>
					<div class="form-field-inline">
					  <label id="course_section">Section:</label>
					  <input type="email" id="course_section" placeholder="001"
		  name="course_section"
		  value={courseInfo.course_section}
		  onChange={handleCourseInfo}/>
					</div>
					<div class="form-field-inline">
					  <label for="meeting_location">Meeting Location:</label>
					  <input type="text" id="meeting_location" placeholder="Olmsted 205"
		  name="meeting_location"
		  value={courseInfo.meeting_location}
		  onChange={handleCourseInfo}/>
					</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Course Meeting Times & Location</legend>
					<div class="form-section">
						<p class="description">Description for information in this section goes here.</p>
						<div class="form-field-inline">
							<label for="start-date">Course Start Date:</label>
							<input id="end-date" type="date"
							  name="course_start_date"
							  value={state.course_start_date}
							  onChange={handleChange}/>
						</div>
						<div class="form-field-inline">
							<label for="end-date">Course End Date:</label>
							<input id="end-date" type="date"
							name="course_end_date"
							value={state.course_end_date}
							onChange={handleChange}
							/>
						</div>
						<h4>Meeting Times</h4>
						{/*--------------------------------- */}
							<div class="radio-set">
								<span class="title">Meeting Type:</span>
								<div class="form-group" >
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="meeting-class" name="meeting_type" value="class" class="custom-control-input"
									checked={meetingInfo.meeting_type === "class"}
									onChange={handleMeetingInfo}
									/>
									<label for="meeting-class" class="custom-control-label">Class</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="meeting-lab" name="meeting_type" value="lab" class="custom-control-input"
									checked={meetingInfo.meeting_type === "lab"}
									onChange={handleMeetingInfo}
									/>
									<label for="meeting-lab" class="custom-control-label">Lab</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="meeting-other" name="meeting_type" value="other" class="custom-control-input"
									checked={meetingInfo.meeting_type === "other"}
									onChange={handleMeetingInfo}
									/>
									<label for="meeting-other" class="custom-control-label">Other</label>
								</div>
								</div>
							</div>

						<div class="radio-set">
							<span class="title">Day(s):</span>
							<div class="form-group">
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-mon" name="meeting_mon" value="monday"
								checked={meetingInfo.meeting_days.monday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-mon" class="custom-control-label">Mon</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-tues" name="meeting_tues" value="tuesday"
								checked={meetingInfo.meeting_days.tuesday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-tues" class="custom-control-label">Tues</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-wed" name="meeting_wed" value="wednesday"
								checked={meetingInfo.meeting_days.wednesday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-wed" class="custom-control-label">Wed</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-thurs" name="meeting_thurs" value="thursday"
								checked={meetingInfo.meeting_days.thursday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-thurs" class="custom-control-label">Thurs</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-fri" name="meeting_fri" value="friday"
								checked={meetingInfo.meeting_days.friday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-fri" class="custom-control-label">Fri</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-sat" name="meeting_sat" value="saturday"
								checked={meetingInfo.meeting_days.saturday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-sat" class="custom-control-label">Sat</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-sun" name="meeting_sun" value="sunday"
								checked={meetingInfo.meeting_days.sunday}
								onChange={handleMeetingInfo}
								/>
								<label for="meet-sun" class="custom-control-label">Sun</label>
							</div>
						</div>
					</div>
					<div class="form-row">
							<div class="col">
							<label id="start-time">Start Time:</label>
							<input type="time" id="start-time"
							name="meeting_start_time"
							value={meetingInfo.meeting_start_time}
							onChange={handleMeetingInfo}
							/>

							</div>
							<div class="col">
							<label id="end-time">End Time:</label>
							<input type="time" id="end-time"
							name="meeting_end_time"
							value={meetingInfo.meeting_end_time}
							onChange={handleMeetingInfo}
							/>
							</div>  
						</div>
						<h4>Additional Meetings</h4>
						<div>
							{addMeetingInfo.add_meetings.map((add_meetings, i) => {
								return (
									<AdditionalMeetingTimes
										add_meeting_type={addMeetingInfo.add_meetings[i].add_meeting_type}
										add_meeting_days={addMeetingInfo.add_meetings[i].add_meeting_days}
										add_meeting_start_time={addMeetingInfo.add_meetings[i].add_meeting_start_time}
										add_meeting_end_time={addMeetingInfo.add_meetings[i].add_meeting_end_time}
										add_meeting_key={i}	
										handleAddMeetingInfo={info => {
											handleAddMeetingInfo(info, i);
										}}
										deleteAddMeeting={(info) => {
											deleteAddMeeting(info, i);
										}}
										
									/>
								);
							})}
						</div>
						<div class="add-another">
							<button onClick={addMeetingTime} class="btn btn-outline-secondary btn-sm">
							+ Add Another Meeting
							</button>
						</div>
						<button onClick={showState}>
							Show State
						</button>
						{/*--------------------------------------*/}
					</div>
				</fieldset>

				<fieldset>
					<legend>Contact Information</legend>
					<div class="form-section">
						<p class="description">Description for information in this section goes here.</p>
						<div class="form-field-inline">
							<label for="name">Instructor Name:</label>
							<input type="text" id="name" name="name" placeholder="Dr. John Smith" required="Required"
							name="instructor_name"
							value={contactInfo.instructor_name}
							onChange={handleContactInfo}
							/> 
						</div>
						<div class="form-field-inline">
						  <label for="email">Email:</label>
						  <input type="email" id="email" name="user_email" placeholder="abc@psu.edu" required=""
						  name="email"
						  value={contactInfo.email}
						  onChange={handleContactInfo}
						  />
						</div>
						<div class="form-field-inline">
						  <label for="phone">Phone:</label>
						  <input type="tel" id="phone" name="phone" placeholder="000-000-0000" required=""
						  name="phone"
						  value={contactInfo.phone}
						  onChange={handleContactInfo}
						  />  
						</div>
						<div class="form-field-inline">
						  <label for="office">Office Location:</label>
						  <input type="text" id="office" name="office" placeholder="Olmsted 203" required=""
						  name="office_location"
						  value={contactInfo.office_location}
						  onChange={handleContactInfo}
						  />
						</div>
						<h4>Office Hours</h4>
						<div class="radio-set">
							<span class="title">Day(s):</span>
							<div class="form-group">
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-mon" name="office_mon" value="monday"
								checked={state.office_mon}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-mon" class="custom-control-label">Mon</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-tues" name="office_tues" value="tuesday"
								checked={state.office_tues}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-tues" class="custom-control-label">Tues</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-wed" name="office_wed" value="wednesday"
								checked={state.office_wed}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-wed" class="custom-control-label">Wed</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-thurs" name="office_thurs" value="thursday"
								checked={state.office_thurs}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-thurs" class="custom-control-label">Thurs</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-fri" name="office_fri" value="friday"
								checked={state.office_fri}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-fri" class="custom-control-label">Fri</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-sat" name="office_sat" value="saturday"
								checked={state.office_sat}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-sat" class="custom-control-label">Sat</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="oh-sun" name="office_sun" value="sunday"
								checked={state.office_sun}
								onChange={handleChangeCheckbox}
								/>
								<label for="oh-sun" class="custom-control-label">Sun</label>
							</div>
						</div>
					</div>
					<div class="form-row">
							<div class="col">
							<label id="oh-start-time">Start Time:</label>
							<input type="time" id="oh-start-time"
							name="office_start_time"
							value={state.office_start_time}
							onChange={handleChange}
							/>
							</div>
							<div class="col">
							<label id="oh-end-time">End Time:</label>
							<input type="time" id="oh-end-time"
							name="office_end_time"
							value={state.office_end_time}
							onChange={handleChange}
							/>
							</div>  
					</div>
                    {/*------------------*/}
                    <div>
                        <h1>Hello</h1>
                    </div>
                    {/*--------------------*/}
						<div class="add-another">
							<button class="btn btn-outline-secondary btn-sm">
							+ Add Another Office Hours Timeslot
							</button>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>Course Goals & Objectives</legend>
					<div class="form-section">
						<p class="description">
						Description for information in this section goes here.
						</p>
						<label for="objectives">Course Goals and Objectives:</label>
						<MyStatefulEditor updateContent={handleCourseObjectives} id="course_objectives"/>
					</div>
				</fieldset>

				<fieldset>
					<legend>Prerequisites</legend>
					<div class="form-section">
						<p class="description">
						Description for information in this section goes here.
						</p>
						<label for="prerequisites">Prerequisites:</label>
						<MyStatefulEditor updateContent={handleCoursePrereqs} id="course_prereqs"/>
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
						<MyStatefulEditor updateContent={handleRequiredMaterials} id="req_textbooks"/>
						<label for="req_add_materials">
						Additional Required Materials:</label>
						<MyStatefulEditor updateContent={handleRequiredMaterials} id="req_add_materials"/>
						<label for="req_lab_info">
						Lab Information:
						</label>
						<MyStatefulEditor updateContent={handleRequiredMaterials} id="req_lab_info"/>

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
						<MyStatefulEditor updateContent={handleAdditionalMaterials} id="add_materials"/>
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
						<MyStatefulEditor updateContent={handleExamInfo} id="exam_info"/>
					</div>
                    {/* ---------- */}
                    <div>
                        <h4>Assignment Information</h4>
                        <div>
                            {assessmentInfo.assignments.map((assignments, i) => {
                                return (
                                    <Assignment
                                        assignment_title={assessmentInfo.assignments[i].title}
                                        assignment_points_each={assessmentInfo.assignments[i].points_each}
                                        assignment_num_of={assessmentInfo.assignments[i].num_of}
                                        assignment_points_total={assessmentInfo.assignments[i].points_total}
                                        assignment_description={assessmentInfo.assignments[i].description}
                                        handleAssessmentInfo={info => {
                                            handleAssessmentInfo(info, i);
                                        }}
                                        deleteAssignment={() => {deleteAssignment(i);}}
                                    />
                                )
                            })}
                        </div>
                        <div class="add-another">
							<button onClick={addAssignment} class="btn btn-outline-secondary btn-sm">
							+ Add Another Assignment
							</button>
						</div>
                    </div>
                    {/* ---------- */}
					<div>
						<h4>Grading Scale</h4>
						<div class="radio-set">
							<span class="title">Type of Grade: </span>
							<div class="form-group">
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="percent-grade" name="grade-type" value="percent" class="custom-control-input" checked/>
									<label for="percent-grade" class="custom-control-label">Percent</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="point-grade" name="grade-type" value="point" class="custom-control-input"/>
									<label for="point-grade" class="custom-control-label">Points</label>
								</div>
							</div>
						</div>
						<>
						<div class="grade-scale">
						<ul>
							<li>
								<label class="letter">A</label>
								<span class="range"> <input type="number" min="0" value="94"/>  to <input type="number" min="0" value="100"/>
								</span>
							</li>
							<li>
								<label class="letter">A-</label>
								<span class="range">
									<input type="number" min="0"/>  to <input type="number" min="0" value="94"/>
								</span>
							</li>
							<li>
								<label class="letter">B+</label>
								<span class="range">
									<input type="number" min="0" value="87"/>  to <input type="number" min="0" value="90"/>
								</span>
							</li>
							<li>
								<label class="letter">B</label>
								<span class="range">
									<input type="number" min="0" value="83"/>  to <input type="number" min="0" value="87"/>
								</span>
							 </li>
							<li>
								<label class="letter">B-</label>
								<span class="range">
									<input type="number" min="0" value="80"/>  to <input type="number" min="0" value="83"/>
								</span>
							</li>
							<li>
								<label class="letter">C+</label>
								<span class="range">
									<input type="number" min="0" value="77"/> to <input type="number" min="0" value="80"/>
								</span>
							</li>
							<li>
								<label class="letter">C</label>
								<span class="range">
									<input type="number" min="0" value="70"/>  to <input type="number" min="0" value="77"/>
								</span>
							</li>
							<li>
								<label class="letter">D</label>
								<span class="range">
									<input type="number" min="0" value="60"/>  to <input type="number" min="0" value="70"/>
								</span>
							</li>
							<li>
								<label class="letter">F</label>
								<span class="range">
									<span> below </span>
									<input type="number" min="0" value="60"/>
								</span>
							</li>
						</ul>
						</div>
					  </>
					</div>
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
						<MyStatefulEditor updateContent={handleAdditionalContent} id="additional_content"/>
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
			</div>
			</div>

			<div id="results" class="col results">
				<RequirementsChecklist requirementsInfo={includedContentCheck} />
				<SyllabusPreview userInput={{courseInfo, contactInfo, meetingInfo,
											courseObjectives, assessmentInfo, requiredMaterials,
											additionalMaterials ,coursePrereqs, additionalContent,
											includedContentCheck, requiredPolicies}} />
			</div>
		</div>
		</div>
		<div class="footer">
			<p>The policies and syllabus requirements were last updated on 12/03/2020.</p>
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
