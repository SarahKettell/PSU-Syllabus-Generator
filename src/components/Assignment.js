import React, { useState } from 'react';

/*  TODO:
*   - make it look nicer, buttons need to be rearrange and input could be smaller size for numbers
*
*/

export default function Assignment(props) {

    let title = props.assignment_title;
    let points_each = props.assignment_points_each;
    let num_of = props.assignment_num_of;
    let points_total = props.assignment_points_total;
    let description = props.assignment_description;

    let handleAssessmentInfo = props.handleAssessmentInfo;
    let deleteAssignment = props.deleteAssignment;

    return (

        <div>
            <div class="form-field-inline">
                <label for="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Discussion Forms"
                    name="title"
                    value={title}
                    onChange={handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="points_each">Points Each:</label>
                <input 
                    type="number" 
                    id="points_each" 
                    placeholder="5"
                    name="points_each"
                    value={points_each}
                    onChange={handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="num_of">Number of:</label>
                <input 
                    type="number" 
                    id="num_of" 
                    placeholder="4"
                    name="num_of"
                    value={num_of}
                    onChange={handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="points_total">Points Total:</label>
                <input 
                    type="number" 
                    id="points_total" 
                    placeholder="50"
                    name="points_total"
                    value={points_total}
                    onChange={handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="description">Description:</label>
                <textarea
                    rows="4"
                    cols="50"
                    type="text" 
                    id="description" 
                    placeholder="Aliquam a mauris ultricies, pellentesque leo sed, ornare orci. Fusce vitae tempus enim. Quisque nec neque quis arcu imperdiet rhoncus. Duis ornare feugiat molestie. Donec a ex vel lorem mollis vestibulum id at orci. Curabitur vestibulum ipsum vel orci fringilla, eget convallis lacus luctus."
                    name="description"
                    value={description}
                    onChange={handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <button onClick={deleteAssignment} class="btn btn-danger">X</button>
            </div>
        </div>

        // <tr>
        //     <td>
        //         <input
        //             type="text"
        //             name="title"
        //             onChange={props.updateAssignmentGroup}
        //             value={props.assignment_group_text}
        //         />
        //     </td>
        //     <td>
        //         <input
        //             type="number"
        //             min="1"
        //             max="100"
        //             onChange={props.updateAssignmentGroupPercent}
        //             value={props.assignment_group_percent}
        //         />
        //         <label>%</label>
        //     </td>
        // </tr>
    );
}
