import React, {useEffect, useState, Component} from 'react';
import './css/sidenav-styles.css';

export default function SideNav(){

    return(
        <aside className="side-nav">
                <div className="row">
                    <div className="col">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a className="list-group-item list-group-item-action active" id="list-home-list"
                               data-toggle="list" href="#list-home" role="tab" aria-controls="home">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">rule</i>
                                Syllabus Requirements
                            </a>
                            <a className="list-group-item list-group-item-action" id="list-profile-list"
                               data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">post_add</i>
                                Build a Syllabus
                            </a>
                            <a className="list-group-item list-group-item-action" id="list-messages-list"
                               data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">preview</i>
                                Preview Syllabus
                            </a>
                            <a className="list-group-item list-group-item-action" id="list-settings-list"
                               data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">
                                <i className="material-icons mdc-list-item__graphic" aria-hidden="true">download_for_offline</i>
                                Generate Empty Template
                            </a>
                        </div>
                    </div>
                </div>
        </aside>
    );
}