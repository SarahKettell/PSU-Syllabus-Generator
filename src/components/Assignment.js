import React, { useState } from 'react';
import {ControlledEditor} from "./FormComponents";

/*  TODO:
*   - make it look nicer, buttons need to be rearrange and input could be smaller size for numbers
*
*/

export default function Assignment(props) {

    const [assignmentID, setAssignmentID] = useState(props.curr_id);

    let title = props.assignment_title;
    let points_each = props.assignment_points_each;
    let num_of = props.assignment_num_of;
    let points_total = props.assignment_points_total;
    let percent_total = props.assignment_percent_total;
    let description = props.assignment_description;
    let descriptionState = props.assignment_savedState;

    console.log(props)

    let handleAssessmentInfo = props.handleAssessmentInfo;
    let deleteAssignment = props.deleteAssignment;
    let focusChange = props.handleFocusChange;
    return (
        <div className="assignment-box col s12">
            {assignmentID > 1 &&
            <div className="right">
                <button onClick={deleteAssignment} class="btn-flat delete-button">
                    <i className="material-icons right">clear</i>
                    remove assignment
                </button>
            </div>
            }
            <div className="input-field col s12 m12 ">
                <label className="active" id="f1-1" htmlFor={"title_" + assignmentID} >Title:</label>
                <input
                    type="text"
                    id={"title_" + assignmentID}
                    placeholder="Discussion Forums"
                    name="title"
                    value={title}
                    onChange={handleAssessmentInfo}
                    onBlur={focusChange}
                />
            </div>

            <div className="input-field col s12 m3">
                <label className="active" htmlFor={"points_each_" + assignmentID}>Points Each:</label>
                <input
                    type="number"
                    id={"points_each_" + assignmentID}
                    placeholder="5"
                    name="points_each"
                    value={points_each}
                    onChange={handleAssessmentInfo}
                    onBlur={focusChange}
                />
            </div>
            <div className="input-field col s12 m3">
                <label className="active" htmlFor={"num_of_" + assignmentID}>Number of:</label>
                <input
                    type="number"
                    id={"num_of_" + assignmentID}
                    placeholder="4"
                    name="num_of"
                    value={num_of}
                    onChange={handleAssessmentInfo}
                    onBlur={focusChange}
                />
            </div>
            <div className="input-field col s12 m3">
                <label className="active" htmlFor={"points_total_" + assignmentID}>Points Total:</label>
                <input
                    type="number"
                    id={"points_total_" + assignmentID}
                    placeholder="50"
                    name="points_total"
                    value={points_total}
                    onChange={handleAssessmentInfo}
                    onBlur={focusChange}
                />
            </div>
            <div className="input-field col s12 m3">
                <label className="active" htmlFor={"percent_total_" + assignmentID}>Percent of Total Grade:</label>
                <input
                    type="number"
                    id={"percent_total_" + assignmentID}
                    placeholder="50"
                    name="percent_total"
                    value={percent_total}
                    onChange={handleAssessmentInfo}
                    onBlur={focusChange}
                />
            </div>
            <div className="col s12 m12">
                <label className="active" htmlFor="prerequisites">Description:</label>
                <ControlledEditor
                    updateContent={handleAssessmentInfo}
                    changeFocus={focusChange}
                    storedContent={descriptionState}
                    id="description"/>
            </div>
        </div>
    );
}
