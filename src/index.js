import React, {useEffect, useState, Component} from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/bootstrap.css';
import './css/html-syllabus-styles.css';
import './css/preview-styles.css';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import RichTextEditor from 'react-rte';
import SyllabusPreview from "./SyllabusPreview";

class RteContent extends Component {
	render() {
		let parser = new DOMParser();
		let doc = parser.parseFromString("<strong>Test</strong>", 'text/html');
		return(
			doc.body
		);
	}
}

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
		let tempInfo = {
			id: this.props.id,
			value: value.toString('html')
		}
		this.props.updateContent(tempInfo);
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

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
const stringToHTML = function (str) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

// Used Draft.js library
// Please read https://draftjs.org/docs/api-reference-content-state/#getplaintext for the API Information
class RichEditorExample extends React.Component {
  constructor(props) {
	super(props);
	this.state = {editorState: EditorState.createEmpty()};

	this.focus = () => this.refs.editor.focus();
	this.onChange = (editorState) => {
		this.props.setPlainText(editorState.getCurrentContent().getPlainText())
		this.setState({editorState})
		console.log(editorState.getCurrentContent().convertToRaw);
	};

	this.handleKeyCommand = (command) => this._handleKeyCommand(command);
	this.onTab = (e) => this._onTab(e);
	this.toggleBlockType = (type) => this._toggleBlockType(type);
	this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
	const {editorState} = this.state;
	const newState = RichUtils.handleKeyCommand(editorState, command);
	if (newState) {
	  this.onChange(newState);
	  return true;
	}
	return false;
  }

  _onTab(e) {
	const maxDepth = 4;
	this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
	this.onChange(
	  RichUtils.toggleBlockType(
		this.state.editorState,
		blockType
	  )
	);
  }

  _toggleInlineStyle(inlineStyle) {
	this.onChange(
	  RichUtils.toggleInlineStyle(
		this.state.editorState,
		inlineStyle
	  )
	);
  }

  render() {
	const {editorState} = this.state;
	// console.log(editorState);

	// If the user changes block type before entering any text, we can
	// either style the placeholder or hide it. Let's just hide it now.
	let className = 'RichEditor-editor';
	// console.log(className);
	var contentState = editorState.getCurrentContent();
	// console.log(contentState);
	if (!contentState.hasText()) {
	  if (contentState.getBlockMap().first().getType() !== 'unstyled') {
		className += ' RichEditor-hidePlaceholder';
	  }
	}

	return (
	  <div className="RichEditor-root">
		<BlockStyleControls
		  editorState={editorState}
		  onToggle={this.toggleBlockType}
		/>
		<InlineStyleControls
		  editorState={editorState}
		  onToggle={this.toggleInlineStyle}
		/>
		<div className={className} onClick={this.focus}>
		  <Editor
			blockStyleFn={getBlockStyle}
			customStyleMap={styleMap}
			editorState={editorState}
			handleKeyCommand={this.handleKeyCommand}
			onChange={this.onChange}
			onTab={this.onTab}
			placeholder="Type here..."
			ref="editor"
			spellCheck={true}
		  />
		</div>
	  </div>
	);
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
	backgroundColor: 'rgba(0, 0, 0, 0.05)',
	fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
	fontSize: 16,
	padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
	case 'blockquote': return 'RichEditor-blockquote';
	default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
	super();
	this.onToggle = (e) => {
	  e.preventDefault();
	  this.props.onToggle(this.props.style);
	};
  }

  render() {
	let className = 'RichEditor-styleButton';
	if (this.props.active) {
	  className += ' RichEditor-activeButton';
	}

	return (
	  <span className={className} onMouseDown={this.onToggle}>
		{this.props.label}
	  </span>
	);
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
	.getCurrentContent()
	.getBlockForKey(selection.getStartKey())
	.getType();

  return (
	<div className="RichEditor-controls">
	  {BLOCK_TYPES.map((type) =>
		<StyleButton
		  key={type.label}
		  active={type.style === blockType}
		  label={type.label}
		  onToggle={props.onToggle}
		  style={type.style}
		/>
	  )}
	</div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
	<div className="RichEditor-controls">
	  {INLINE_STYLES.map(type =>
		<StyleButton
		  key={type.label}
		  active={currentStyle.has(type.style)}
		  label={type.label}
		  onToggle={props.onToggle}
		  style={type.style}
		/>
	  )}
	</div>
  );
};


// //I left it for your reference when you implement dynamically generating buttons
// function Button() {
//
//   const [inputs, setInputs] = React.useState([
// 	  { id: 1, name: 'Input 1', value: '' },
//   ])
//
//   const [testtt, setTesttt] = React.useState(0)
//
//   const handleChange = (evt) => {
//
// 	  let inputsState = inputs
// 	  inputsState.forEach(input => {
// 		  if (input.name === evt.target.name) {
// 			  input.value = evt.target.value
// 		  }
// 	  })
//
// 	  setInputs(inputsState)
//
// 	  console.log(inputs)
//   }
//
//   const handleAdd = () => {
// 	  setInputs([...inputs, { id: new Date().getTime(), name: new Date().getTime().toString(), value: '' }])
// 	  console.log(inputs)
//   }
//
//
//   const testt = () => {
// 	  setTesttt(new Date().getTime())
//   }
//
// return (
//   <div className="App">
// 	<header className="App-header">
// 		{inputs.map(input => <InputComponent key={input.id} input={input} onChange={handleChange} />)}
//
// 		<button onClick={handleAdd}>Add more</button>
// 		<button onClick={testt}>Test</button>
//
// 	</header>
//   </div>
// );
//}

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

	disability_statement : false
  })

    // courseInfo holds data related to the course information section
    const [courseInfo, setCourseInfo] = useState( {
            course_num: "",
            course_name: "",
            course_section: "",
            meeting_location: ""
        }
    );


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
        textbooks: "",
        additional: "",
        lab_info: "",
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
	console.log(key);
	console.log(value);
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
		console.log(evt.target.name, value);
		console.log(state);
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
		req_materials: 		{content: "Required Materials", added: false, required: true},
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
		if(value != "" && !includedContentCheck.req_materials.added){updateChecklist("req_materials", true);}
		if(value === "" && includedContentCheck.req_materials.added){
			// check if other required materials are added
			if(!(requiredMaterials.textbooks.length > 0 ||
				requiredMaterials.additional.length > 0 ||
				requiredMaterials.lab_info.length > 0 ||
				requiredMaterials.has_no_required)) {
				updateChecklist("req_materials", false);
			}
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
		if(isIncluded) {
			setIncludedContentCheck({
				...includedContentCheck,
				[fieldName]: {content: tempContent, added: true, required: tempReq}
			});
		}
		else {
			setIncludedContentCheck({
				...includedContentCheck,
				[fieldName]: {content: tempContent, added: false, required: tempReq}
			});
		}
	}

	function toggleRequiredPolicies(info){
		let newVal = requiredPolicies[info.target.name];
		// setRequiredPolicies({
		// 	...requiredPolicies,
		// 	[info.target.name]:
		// })
	}

	// Displays and manages the syllabus checklist module, which includes each type of content
	// that can be added to the syllabus along with which ones are optional, required, and currently
	// included
	function SyllabusChecklistModule() {

		return (
			<div className="box">
				<h2>Syllabus Checklist</h2>
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
							<li className="check-item required-symbol" name="req_materials">{includedContentCheck.req_materials.content} {includedContentCheck.req_materials.added && <span className="included-symbol"></span>}</li>
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

	// Displays and manages the syllabus preview module, which includes the HTML formatted
	// content of the syllabus. This content is updated live as the user adds to the form.
	function SyllabusPreviewModule() {
		return(
			<div className="box">
				<h2>Syllabus Preview</h2>
				<div className="preview">
					<div className="preview-box">

						<div>
							<h4>Course Information</h4>
							<p>
								Course Number: {courseInfo.course_num} <br/>
								Course Name: {courseInfo.course_name} <br/>
								Course Section: {courseInfo.course_section} <br/>
								Meeting Location : {courseInfo.meeting_location} <br/>
							</p>
						</div>

						{(state.course_start_date !== "" || state.course_end_date !== "" || state.course_meeting_type !== "" || state.meeting_mon || state.meeting_tues || state.meeting_wed || state.meeting_thurs || state.meeting_fri || state.meeting_sat || state.meeting_sun) && (
							<div>
								<h4>Course Schedule & Meeting Times</h4>
								<p>
									Course Start Date : {state.course_start_date} <br/>
									Course End Date : {state.course_end_date} <br/>
									Course Meeting Type : {state.course_meeting_type} <br/>
									Course Meeting Days: {state.meeting_mon ? ("Mon ") : ("")}
									{state.meeting_mon && (state.meeting_tues || state.meeting_wed || state.meeting_thurs || state.meeting_fri || state.meeting_sat || state.meeting_sun) ? (", ") : ("")}
									{state.meeting_tues ? ("Tues ") : ("")}
									{state.meeting_tues && (state.meeting_wed || state.meeting_thurs || state.meeting_fri || state.meeting_sat || state.meeting_sun) ? (", ") : ("")}
									{state.meeting_wed ? ("Wed ") : ("")}
									{state.meeting_wed && (state.meeting_thurs || state.meeting_fri || state.meeting_sat || state.meeting_sun) ? (", ") : ("")}
									{state.meeting_thurs ? ("Thurs ") : ("")}
									{state.meeting_thurs && (state.meeting_fri || state.meeting_sat || state.meeting_sun) ? (", ") : ("")}
									{state.meeting_fri ? ("Fri ") : ("")}
									{state.meeting_fri && (state.meeting_sat || state.meeting_sun) ? (", ") : ("")}
									{state.meeting_sat ? ("Sat ") : ("")}
									{state.meeting_sat && (state.meeting_sun) ? (", ") : ("")}
									{state.meeting_sun ? ("Sun ") : ("")} <br/>
									Course Meeting Start Time : {state.course_start_times} <br/>
									Course Meeting End Time: {state.course_end_times}
								</p>
							</div>
						)}


						<h4>Contact Information</h4>
						<p>
							Instructor Name : {contactInfo.instructor_name} <br/>
							Email : {contactInfo.email} <br/>
							Phone : {contactInfo.phone} <br/>
							Office Location: {contactInfo.office_location} <br/>
							Office Hour Days: {state.office_mon ? ("Mon ") : ("")}
							{state.office_mon && (state.office_tues || state.office_wed || state.office_thurs || state.office_fri || state.office_sat || state.office_sun) ? (", ") : ("")}
							{state.office_tues ? ("Tues ") : ("")}
							{state.office_tues && (state.office_wed || state.office_thurs || state.office_fri || state.office_sat || state.office_sun) ? (", ") : ("")}
							{state.office_wed ? ("Wed ") : ("")}
							{state.office_wed && (state.office_thurs || state.office_fri || state.office_sat || state.office_sun) ? (", ") : ("")}
							{state.office_thurs ? ("Thurs ") : ("")}
							{state.office_thurs && (state.office_fri || state.office_sat || state.office_sun) ? (", ") : ("")}
							{state.office_fri ? ("Fri ") : ("")}
							{state.office_fri && (state.office_sat || state.office_sun) ? (", ") : ("")}
							{state.office_sat ? ("Sat ") : ("")}
							{state.office_sat && (state.office_sun) ? (", ") : ("")}
							{state.office_sun ? ("Sun ") : ("")} <br/>
							Office Hour: {state.office_start_time}
							{state.office_start_time === "" ? ("") : (" ~ ")}
							{state.office_end_time}
						</p>

						<div>
							<h4>Course goals and objectives</h4>
							<div dangerouslySetInnerHTML={{__html: courseObjectives}} />
						</div>

						{coursePrereqs !== "" && (
							<div>
								<h4>Prerequisites</h4>
								<div dangerouslySetInnerHTML={{__html: coursePrereqs}} />
							</div>
						)}


						<div>
							<h4>Required Materials</h4>

							<p>
								Required Textbooks:
								<div dangerouslySetInnerHTML={{__html: requiredMaterials.textbooks}} />
								Additional Materials:
								<div dangerouslySetInnerHTML={{__html: requiredMaterials.additional}} />
								Lab Info:
								<div dangerouslySetInnerHTML={{__html: requiredMaterials.lab_info}} />
							</p>
						</div>


						{state.RichTextAdditionalMaterials !== "" && (
							<div>
								<h4>Additional Materials: </h4>
								<div dangerouslySetInnerHTML={{__html: additionalMaterials}} />
							</div>
						)}
						<div>
							<h4>Assessment and Grading Scale: </h4>
							<p>
								Exam Information:
								<div dangerouslySetInnerHTML={{__html: assessmentInfo.exam_info}} />
							</p>
						</div>


						{state.RichTextAdditionalContent !== "" && (
							<div>
								<h4>Additional Syllabus Content </h4>
								<div dangerouslySetInnerHTML={{__html: additionalContent}} />
							</div>
						)}
					</div>
				</div>
			</div>
		)
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
							<div class="radio-set">
								<span class="title">Meeting Type:</span>
								<div class="form-group" >
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="meeting-class" name="course_meeting_type" value="class" class="custom-control-input"
									checked={state.course_meeting_type === "class"}
									onChange={handleChange}
									/>
									<label for="meeting-class" class="custom-control-label">Class</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="meeting-lab" name="course_meeting_type" value="lab" class="custom-control-input"
									checked={state.course_meeting_type === "lab"}
									onChange={handleChange}
									/>
									<label for="meeting-lab" class="custom-control-label">Lab</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
									<input type="radio" id="meeting-other" name="course_meeting_type" value="other" class="custom-control-input"
									checked={state.course_meeting_type === "other"}
									onChange={handleChange}
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
								checked={state.meeting_mon}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-mon" class="custom-control-label">Mon</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-tues" name="meeting_tues" value="tuesday"
								checked={state.meeting_tues}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-tues" class="custom-control-label">Tues</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-wed" name="meeting_wed" value="wednesday"
								checked={state.meeting_wed}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-wed" class="custom-control-label">Wed</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-thurs" name="meeting_thurs" value="thursday"
								checked={state.meeting_thurs}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-thurs" class="custom-control-label">Thurs</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-fri" name="meeting_fri" value="friday"
								checked={state.meeting_fri}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-fri" class="custom-control-label">Fri</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-sat" name="meeting_sat" value="saturday"
								checked={state.meeting_sat}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-sat" class="custom-control-label">Sat</label>
							</div>
							<div class="custom-control custom-checkbox custom-control-inline">
								<input type="checkbox" class="custom-control-input" id="meet-sun" name="meeting_sun" value="sunday"
								checked={state.meeting_sun}
								onChange={handleChangeCheckbox}
								/>
								<label for="meet-sun" class="custom-control-label">Sun</label>
							</div>
						</div>
					</div>
					<div class="form-row">
							<div class="col">
							<label id="start-time">Start Time:</label>
							<input type="time" id="start-time"
							name="course_start_times"
							value={state.course_start_times}
							onChange={handleChange}
							/>

							</div>
							<div class="col">
							<label id="end-time">End Time:</label>
							<input type="time" id="end-time"
							name="course_end_times"
							value={state.course_end_times}
							onChange={handleChange}
							/>
							</div>  
						</div>
						<div class="add-another">
							<button class="btn btn-outline-secondary btn-sm" >
							+ Add Another Meeting
							</button>
						</div>
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
						<label for="textbooks">
						Required Textbooks:</label>
						<MyStatefulEditor updateContent={handleRequiredMaterials} id="textbooks"/>
						<label for="additional">
						Additional Required Materials:</label>
						<MyStatefulEditor updateContent={handleRequiredMaterials} id="additional"/>
						<label for="lab_info">
						Lab Information:
						</label>
						<MyStatefulEditor updateContent={handleRequiredMaterials} id="lab_info"/>

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
				<SyllabusChecklistModule />
				<SyllabusPreviewModule />
				<SyllabusPreview />
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
