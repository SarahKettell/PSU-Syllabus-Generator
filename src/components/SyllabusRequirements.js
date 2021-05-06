import React from "react";


export default function SyllabusRequirements(){
    return (
        <div className="requirements">
            <div className="row devNotes">
                <div className="col-sm-12 col-md-9">
                    <p className="alert"><span className="emph">Development Note: </span>
                        This app is still in its early testing phase and is actively undergoing further development. Due to this,
                        some features are disabled or may give unexpected errors.
                        Please use this form to send feedback, suggestions, and details of any errors experienced to the developers.
                    </p>
                </div>
                <div className="col-sm-12 col-md-3">
                    <a className="btn-large" href="https://forms.office.com/r/s9aXHAv32U" target="_blank">Send Feedback</a>
                </div>
                <div>
                    <p className="alert"><span className="emph">Updates:</span><br/>
                        - Content entered into the syllabus generator is now saved locally in your
                        browser and can be returned to if you refresh or leave the page. (05/06/2021)<br />
                        - "Start Over" button to clear content entered. (05/06/2021)<br/>
                        - Toggle of Grading Scale to clearly show whether percent, points, or both are used (05/06/2021)
                    </p>
                </div>
            </div>
            <div className="row">
                <h2 className="col-sm-12" id="syllabus-requirements">Syllabus Requirements</h2>
            </div>
            <div className="row">
                <p className="col-sm-12">
                    <a href="http://senate.psu.edu/policies-and-rules-for-undergraduate-students/43-00-syllabus/">Faculty
                    Senate Policy 43-00</a> requires that a written (paper or electronic form) syllabus must be distributed
                    to students in each course on or before the first class meeting. Changes to the syllabus shall also be
                    given to the student in written (paper or electronic) form. In addition to course content, expectations,
                    and location of the program, the syllabus must include the following information:
                </p>
            </div>
            <div className="row">
                <ul className="col-sm-12 col-md-8">
                    <li>Contact information for all course instructors</li>
                    <li>Required course materials</li>
                    <li>Course content and expectations</li>
                    <li>Basis for grades, as detailed as possible</li>
                    <li>Examination Policy (include evening exam schedule, if applicable)</li>
                    <li>Academic Integrity Statement</li>
                    <li>Disability Statement</li>
                    <li>Counseling Services Statement</li>
                    <li>Reporting Educational Equity Concerns through the Report Bias site</li>
                    <li>Mandated Reporting Statement</li>
                </ul>
                <div className="col-sm-12 col-md-4 info-box">
                    <div className="info-box-title">
                        <i className="material-icons left">lightbulb_outline</i>
                        Tip
                    </div>
                    <div className="info-box-content">
                        <h6>Prefer to have an offline version for reference?</h6>
                        Download a copy of the 2020-2021 syllabus requirements, policies, and checklist.
                        <br />
                        <button className="btn-small waves-effect waves-light" type="button" disabled="disabled">
                            <i className="material-icons left">download</i>
                            Download
                        </button>
                        <br />
                        (Download feature coming soon)
                    </div>
                </div>
            </div>
        </div>
    )
}
