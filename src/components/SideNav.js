import React from 'react';
import '../css/sidenav-styles.css';
import {htmlExport} from "./ExportBuilder";

function SideNavContent(props){
    let previewTracker = props.previewTracker;
    const exportInfo = props.exportInfo;

    const updatePreview = () => {
        props.updatePreview(previewTracker + 1);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const downloadSyllabus = () => {
        updatePreview();
        sleep(2000).then(() => {  htmlExport(exportInfo); });
    }

    return (
        <div className="side-nav">
            <div className="side-nav-sticky">
                <div className="accordion" id="side-nav-menu">
                <div className="card">
                    <div className="card-header" id="syllabusRequirements">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed"
                               href="#syllabus-requirements">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">policy</i>
                                Syllabus Requirements
                            </a>
                        </h5>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="syllabusChecklist">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed"
                               href="#syllabus-checklist">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">rule</i>
                                Syllabus Checklist
                            </a>
                        </h5>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="buildSyllabus">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed" data-toggle="collapse"
                               data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">post_add</i>
                                Build a Syllabus
                                <i className="material-icons mdc-list-item__graphic expand-icon"
                                   aria-hidden="true"></i>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="buildSyllabus"
                         data-parent="#buildSyllabus">
                        <div className="card-body">
                            <div className="list-group">
                                <a href="#basic-course-info" className="list-group-item">Basic Course Information</a>
                                <a href="#instructor-information" className="list-group-item">Instructor Information</a>
                                <a href="#course-materials" className="list-group-item">Course Materials</a>
                                <a href="#course-description" className="list-group-item">Course Description & Expectations</a>
                                <a href="#course-policies" className="list-group-item">Course Policies</a>
                                <a href="#course-schedule" className="list-group-item">Course Schedule</a>
                                <a href="#student-services" className="list-group-item">Available Student Support Services</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="previewSyllabus">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed"
                               onClick={updatePreview}
                               href="#syllabus-preview">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">preview</i>
                                Preview Syllabus
                            </a>
                        </h5>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="downloadTemplate">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed" onClick={downloadSyllabus}>
                                <i className="material-icons mdc-list-item__graphic"
                                   aria-hidden="true">download_for_offline</i>
                                Download a Template
                            </a>
                        </h5>
                    </div>
                </div>
                {/*<div className="card-header" id="faq">*/}
                {/*    <h5 className="mb-0">*/}
                {/*        <a className="list-group-item list-group-item-action collapsed" data-toggle="collapse"*/}
                {/*           data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">*/}
                {/*            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">help_outline</i>*/}
                {/*            FAQ*/}
                {/*            <i className="material-icons mdc-list-item__graphic expand-icon" aria-hidden="true"></i>*/}
                {/*        </a>*/}
                {/*    </h5>*/}
                {/*</div>*/}
                {/*<div id="collapseThree" className="collapse" aria-labelledby="faq"*/}
                {/*     data-parent="#buildSyllabus">*/}
                {/*    <div className="card-body">*/}
                {/*        <div className="list-group">*/}
                {/*            <a href="#" className="list-group-item">What is the Syllabus Generator?</a>*/}
                {/*            <a href="#" className="list-group-item">Can I edit the syllabus after?</a>*/}
                {/*            <a href="#" className="list-group-item">Can I create just a course schedule?</a>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            </div>
        </div>
    );
}

export default function SideNav(props){
    return(
        <>
            {props.isOpen
                ? <SideNavContent
                    exportInfo={props.exportInfo}
                    updatePreview={props.updatePreview}
                    previewTracker={props.previewTracker} />
                : <div></div>
            }
        </>
    );
}
