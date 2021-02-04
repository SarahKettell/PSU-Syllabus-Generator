import React, {useEffect, useState, Component} from 'react';
import './css/sidenav-styles.css';

function ExpandNav(){

}

export default function SideNav(){

    return(
        <aside className="side-nav">
            <div className="accordion" id="side-nav-menu">
                <div className="card">
                    <div className="card-header" id="syllabusRequirements">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">rule</i>
                                Syllabus Requirements
                                <i className="material-icons mdc-list-item__graphic expand-icon" aria-hidden="true"></i>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="syllabusRequirements"
                         data-parent="#syllabusRequirements">
                        <div className="card-body">
                            <div className="list-group">
                                <a href="#" className="list-group-item">Link item</a>
                                <a href="#" className="list-group-item active">Active link item</a>
                                <a href="#" className="list-group-item">Link item</a>
                                <a href="#" className="list-group-item">Link item</a>
                                <a href="#" className="list-group-item">Link item</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="buildSyllabus">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">post_add</i>
                                Build a Syllabus
                                <i className="material-icons mdc-list-item__graphic expand-icon" aria-hidden="true"></i>
                            </a>
                        </h5>
                    </div>
                    <div id="collapseTwo" className="collapse show" aria-labelledby="buildSyllabus"
                         data-parent="#buildSyllabus">
                        <div className="card-body">
                            <div className="list-group">
                                <a href="#" className="list-group-item">Link item</a>
                                <a href="#" className="list-group-item active">Active link item</a>
                                <a href="#" className="list-group-item">Link item</a>
                                <a href="#" className="list-group-item">Link item</a>
                                <a href="#" className="list-group-item">Link item</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="previewSyllabus">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">preview</i>
                                Preview Syllabus
                            </a>
                        </h5>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="downloadTemplate">
                        <h5 className="mb-0">
                            <a className="list-group-item list-group-item-action collapsed">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">download_for_offline</i>
                                Download a Template
                            </a>
                        </h5>
                    </div>
                </div>
            </div>
        </aside>
    );
}