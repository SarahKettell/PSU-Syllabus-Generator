import React, {useState} from 'react';
import '../css/topbar-styles.css';
import {htmlExport} from "./ExportBuilder";
import DownloadingModal from "./DownloadingModal";

export default function TopBar(props){

    let menuButton = props.isOpen ? "menu_open" : "menu";
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

    return(
            <header className="top-bar">
                <nav>
                <div className="nav-wrapper">
                    <button className="material-icons" onClick={props.toggleNav}
                            aria-label="Open navigation menu">{menuButton}
                    </button>
                    <h1 className="brand-logo">Syllabus Generator</h1>
                    <ul id="nav-mobile" className="right hide-on-small-only">
                        <div className="top-sticky">
                            <button className="sticky-button" onClick={updatePreview}>
                                <i className="material-icons left">wysiwyg</i>
                                <span className="hide-on-med-and-down">
                                    Preview Syllabus
                                </span>
                            </button>
                            <button className="sticky-button" onClick={downloadSyllabus}>
                                <i className="material-icons left">download</i>
                                <span className="hide-on-med-and-down"> Download</span>
                            </button>
                        </div>
                    </ul>

                </div>
                </nav>
            </header>
    );
}
