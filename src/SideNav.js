import React, {useEffect, useState, Component} from 'react';
import './css/sidenav-styles.css';
import {docxExport} from "./ExportBuilder";
import {htmlExport} from "./ExportBuilder";

function SideNavContent(){
    return (
        <div className="side-nav">
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
                    <div className="card-header" id="buildSyllabus">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action" data-toggle="collapse"
                               data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">post_add</i>
                                Build a Syllabus
                                <i className="material-icons mdc-list-item__graphic expand-icon"
                                   aria-hidden="true"></i>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="buildSyllabus"
                         data-parent="#buildSyllabus">
                        <div className="card-body">
                            <div className="list-group">
                                <a href="#basic-course-info" className="list-group-item">Basic Course Information</a>
                                <a href="#" className="list-group-item">Contact Information</a>
                                <a href="#" className="list-group-item">Goals & Objectives</a>
                                <a href="#" className="list-group-item">Required Materials</a>
                                <a href="#" className="list-group-item">Assessment and Grading</a>
                                <a href="#" className="list-group-item">Course Schedule</a>
                                <a href="#" className="list-group-item">Additional Content</a>
                                <a href="#" className="list-group-item">Required Policies</a>
                            </div>
                        </div>
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
                    <div className="card-header" id="previewSyllabus">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed"
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
                            <a className="list-group-item list-group-item-action collapsed" onClick={htmlExport}>
                                <i className="material-icons mdc-list-item__graphic"
                                   aria-hidden="true">download_for_offline</i>
                                Download a Template
                            </a>
                        </h5>
                    </div>
                </div>
                <div className="card-header" id="faq">
                    <h5 className="mb-0">
                        <a className="list-group-item list-group-item-action" data-toggle="collapse"
                           data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                            <i className="material-icons mdc-list-item__graphic" aria-hidden="true">help_outline</i>
                            FAQ
                            <i className="material-icons mdc-list-item__graphic expand-icon" aria-hidden="true"></i>
                        </a>
                    </h5>
                </div>
                <div id="collapseThree" className="collapse show" aria-labelledby="faq"
                     data-parent="#buildSyllabus">
                    <div className="card-body">
                        <div className="list-group">
                            <a href="#" className="list-group-item">What is the Syllabus Generator?</a>
                            <a href="#" className="list-group-item">Can I edit the syllabus after?</a>
                            <a href="#" className="list-group-item">Can I create just a course schedule?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SideNav(props){
    return(
        <>
            {props.isOpen
                ? <SideNavContent />
                : <div></div>
            }
        </>
    );
}