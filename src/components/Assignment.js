import React, { useState } from 'react';

export default function Assignment(props) {

    return (

        <div>
            <div class="form-field-inline">
                <label for="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Discussion Forms"
                    name="title"
                    value={props.assignment_title}
                    onChange={props.handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="points_each">Points Each:</label>
                <input 
                    type="number" 
                    id="points_each" 
                    placeholder="5"
                    name="points_each"
                    value={props.assignment_points_each}
                    onChange={props.handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="num_of">Number of:</label>
                <input 
                    type="number" 
                    id="num_of" 
                    placeholder="4"
                    name="num_of"
                    value={props.assignment_num_of}
                    onChange={props.handleAssessmentInfo} />
            </div>
            <div class="form-field-inline">
                <label for="points_total">Points Total:</label>
                <input 
                    type="number" 
                    id="points_total" 
                    placeholder="50"
                    name="points_total"
                    value={props.assignment_points_total}
                    onChange={props.handleAssessmentInfo} />
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
                    value={props.assignment_description}
                    onChange={props.handleAssessmentInfo} />
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
