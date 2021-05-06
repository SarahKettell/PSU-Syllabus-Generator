import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/bootstrap.css';
import './css/html-syllabus-styles.css';
import './css/preview-styles.css';
import './css/main-content.css';
import './css/checklist-styles.css';
import RequirementsChecklist from "./components/RequirementsChecklist";
import TopBar from "./components/TopBar";
import SideNav from "./components/SideNav";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SyllabusRequirements from "./components/SyllabusRequirements";
import { useLocalStorage } from "./components/useLocalStorage";
import ClipboardJS from "clipboard";
import M from "materialize-css";
import {
	BASIC_INFO,
	INSTRUCTOR_INFO,
	COURSE_DESCRIPTIONS,
	AVAILABLE_SERVICES,
	COURSE_POLICIES,
	COURSE_SCHEDULE,
	COURSE_MATERIALS,
	CHECKLIST_STATE
} from "./information/DefaultSyllabusValues";
import {
	MemoAvailableStudentServices,
	MemoBasicCourseInfo,
	MemoCourseDescriptions,
	MemoCourseMaterials,
	MemoCoursePolicies,
	MemoCourseSchedule,
	MemoInstructorInfo,
	MemoSyllabusPreview
} from "./components/MemoizedComponents";
import DownloadingModal from "./components/DownloadingModal";

//Main function that contains all the contents
function App() {
	useEffect(() => {
		M.AutoInit();
	})

	const[webView, setWebViewState] = React.useState( {
		sideNavOpen: true
	})
	const [showDownloading, setShowDownloading] = useState(true);

	// Each form section is stored separately and persisted in local storage.
	// Memoization and onBlur updates minimize re-renders and resource usage
	const [basicCourseInfo, setBasicCourseInfo, clearBasicInfo] = useLocalStorage('basicInfoSection', BASIC_INFO);
	const [instructorInfo, setInstructorInfo, clearInstructorInfo] = useLocalStorage('instructorInfoSection', INSTRUCTOR_INFO);
	const [courseMaterials, setCourseMaterials, clearCourseMaterials] = useLocalStorage('courseMaterialsSection', COURSE_MATERIALS);
	const [courseDescriptions, setCourseDescriptions, clearCourseDescriptions] = useLocalStorage('courseDescriptionsSection', COURSE_DESCRIPTIONS);
	const [coursePolicies, setCoursePolicies, clearCoursePolicies] = useLocalStorage('coursePoliciesSection', COURSE_POLICIES);
	const [courseSchedule, setCourseSchedule, clearCourseSchedule] = useLocalStorage('courseScheduleSection', COURSE_SCHEDULE);
	const [studentServices, setStudentServices, clearStudentServices] = useLocalStorage('studentServicesSection', AVAILABLE_SERVICES);
	// used to determine which fields to include/show in syllabus
	const [checklistState, setChecklistState] = useLocalStorage('checklistState', CHECKLIST_STATE);

	// used to clear form after all of the states have updated
	const [appCleared, setAppCleared] = useState(false);
	useEffect(() => {
		if(appCleared){
			setAppCleared(false);
		}
	}, [
		basicCourseInfo, instructorInfo, courseMaterials,
		courseDescriptions, coursePolicies, courseSchedule,
		studentServices
	])


	// updates preview data when changed
	const [previewRefresh, setPreviewRefresh] = useState(0);

	// used to reset the form fields and reset local storage
	function clearSyllabusInput(){
		setBasicCourseInfo(prev => BASIC_INFO);
		setInstructorInfo(prev => INSTRUCTOR_INFO);
		setCourseMaterials(prev => COURSE_MATERIALS);
		setCourseDescriptions(prev => COURSE_DESCRIPTIONS);
		setCoursePolicies(prev => COURSE_POLICIES);
		setCourseSchedule(prev => COURSE_SCHEDULE);
		setStudentServices(prev => AVAILABLE_SERVICES);
		setAppCleared(true);
	}


	function toggleSideNav() {
		let tmpOpenStatus = !webView.sideNavOpen;
		setWebViewState({
			sideNavOpen: tmpOpenStatus
		});
	}

	return (
		<div id="app-container">
			<SideNav isOpen={webView.sideNavOpen}
					 updatePreview={setPreviewRefresh}
					 previewTracker={previewRefresh}
					 exportInfo={basicCourseInfo}
					 isDownloading={showDownloading}
					 setDownloading={setShowDownloading}
			/>
			<div className="main-content">
				<TopBar toggleNav={toggleSideNav}
						isOpen={webView.sideNavOpen}
						updatePreview={setPreviewRefresh}
						previewTracker={previewRefresh}
						exportInfo={basicCourseInfo}
						isDownloading={showDownloading}
						setDownloading={setShowDownloading}
				/>
				<main className="content-container container-fluid">
					<section className="section">
					<SyllabusRequirements />
					</section>
					<section className="section">
						<RequirementsChecklist
							content={{basicCourseInfo,
								instructorInfo,
								courseMaterials,
								courseDescriptions,
								coursePolicies,
								courseSchedule,
								studentServices}}
							updateState={setChecklistState}
						/>
					</section>
					<section className="section">
						<div className="row">
							<div className="col-sm-12">
								<h2 className="buildHeader">Build a Syllabus</h2>
								<button type="button" data-target="clear_content_modal" className="btn-flat modal-trigger right startOver">
									<i className="material-icons right">delete_forever</i>
									Start Over
								</button>
								<div id="clear_content_modal" class="modal">
									<div class="modal-content">
										<h4>Start a New Syllabus</h4>
										<p>This will delete all content entered into the syllabus generator.
											Are you sure you want to start over?
										</p>
									</div>
									<div class="modal-footer">
										<a href="#!" class="modal-close btn-flat confirm-clear" onClick={clearSyllabusInput}>Confirm</a>
										<a href="#!" className="modal-close btn-flat cancel-clear">Cancel</a>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<p id="description">Fill in the sections below to create a syllabus.</p>
						</div>
						<form id="syllabus-generator" className="row">
							<MemoBasicCourseInfo content={basicCourseInfo} updateState={setBasicCourseInfo} clearState={appCleared} />
							<MemoInstructorInfo content={instructorInfo} updateState={setInstructorInfo} clearState={appCleared} />
							<MemoCourseMaterials content={courseMaterials} updateState={setCourseMaterials} clearState={appCleared} />
							<MemoCourseDescriptions content={courseDescriptions} updateState={setCourseDescriptions} clearState={appCleared} />
							<MemoCourseSchedule content={courseSchedule} dateInfo={basicCourseInfo} updateState={setCourseSchedule} clearState={appCleared} />
							<MemoCoursePolicies content={coursePolicies} updateState={setCoursePolicies} clearState={appCleared} />
							<MemoAvailableStudentServices content={studentServices} updateState={setStudentServices} clearState={appCleared} />
						</form>
					</section>

					<section id="preview">
						<MemoSyllabusPreview
							content={{basicCourseInfo,
									instructorInfo,
									courseMaterials,
									courseDescriptions,
									coursePolicies,
									courseSchedule,
									studentServices}}
							refresh={previewRefresh}
							update={setPreviewRefresh}
						/>
					</section>

					<div className="footer">
						<p>The policies and syllabus requirements were last updated on 02/03/2020.</p>
						<p>Application developed by <a href="https://cte.psu.edu/" target="_blank">The Center for Teaching Excellence, Penn State Harrisburg.</a></p>
					</div>
				</main>
			</div>
	  	</div>
  );
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			errorInfo:  null,
			storageLog: null,
			hasError: false,
			errorString: ""
		};
		new ClipboardJS('#copyButton');
	}

	copyError() {
		let copyText = document.getElementById("errorLog");
		copyText.select();
		document.execCommand("copy");
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// get local storage items
		const basicCourseInfo = localStorage.getItem('basicInfoSection');
		const instructorInfo = localStorage.getItem('instructorInfoSection');
		const courseMaterials = localStorage.getItem('courseMaterialsSection');
		const courseDescriptions = localStorage.getItem('courseDescriptionsSection');
		const coursePolicies = localStorage.getItem('coursePoliciesSection');
		const courseSchedule = localStorage.getItem('courseScheduleSection');
		const studentServices = localStorage.getItem('studentServicesSection');

		const storageLog = {
			basicCourseInfo: JSON.stringify(basicCourseInfo),
			instructorInfo: JSON.stringify(instructorInfo),
			courseMaterials: JSON.stringify(courseMaterials),
			courseDescriptions: JSON.stringify(courseDescriptions),
			coursePolicies: JSON.stringify(coursePolicies),
			courseSchedule: JSON.stringify(courseSchedule),
			studentServices: JSON.stringify(studentServices)
		}

		const errorString = error.toString()
			+ errorInfo.componentStack + "\n-------------\n"
			+ JSON.stringify(basicCourseInfo) + "\n-------------\n"
			+ JSON.stringify(instructorInfo) + "\n-------------\n"
			+ JSON.stringify(courseMaterials) + "\n-------------\n"
			+ JSON.stringify(courseDescriptions) + "\n-------------\n"
			+ JSON.stringify(coursePolicies) + "\n-------------\n"
			+ JSON.stringify(courseSchedule) + "\n-------------\n"
			+ JSON.stringify(studentServices);

		this.setState({
			error: error,
			errorInfo: errorInfo,
			storageLog: storageLog,
			hasError: true,
			errorString: errorString
		})

		window.scrollTo(0, 0);
		localStorage.clear();
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<div className="errorTopBar center">
						<h1>Syllabus Generator</h1>
					</div>
					<div id="errorContainer">
					<h2 className="center">Oh no! Something went wrong.</h2>
					<p>This application is currently in beta testing and may occasionally experience errors. By reporting the errors to the developers, you will be helping
					to fix these issues and make a better application for all.<br/><br/>
						<strong>Please copy the error log and paste it in the form below, then click Submit and refresh the page.</strong>
					</p>
					<h3>Error Log:</h3>
					<textarea id="errorLog" type="text" value={this.state.errorString} />
					<button id="copyButton" data-clipboard-target="#errorLog" type="button" className="col-sm-12 btn-large">Copy to Clipboard</button>
					<div>
						<iframe title="Error Reporting Form" width="100%" height="800px"
								src="https://forms.office.com/Pages/ResponsePage.aspx?id=RY30fNs9iUOpwcEVUm61LsUJwhjdt5lCloE7Xui4FhVUQ0hTTlZSVVc1U0lLQjI0RFU2WlRQMVVJQS4u&embed=true" />
					</div>
				</div>
				</div>
			);
		}
		return this.props.children;
	}
}


ReactDOM.render(
  <React.StrictMode>
	  <ErrorBoundary>
		  <App />
	  </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
