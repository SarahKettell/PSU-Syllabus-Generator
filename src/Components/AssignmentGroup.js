import React, { useState } from 'react';

function AssignmentGroup (props) {

    return (
        <tr>
            <td>
                <input
                    type="text"
                    name="assignment_group"
                    onChange={props.updateAssignmentGroup}
                    value={props.assignment_group_text}
                />
            </td>
            <td>
                <input
                    type="number"
                    min="1"
                    max="100"
                    onChange={props.updateAssignmentGroupPercent}
                    value={props.assignment_group_percent}
                />
                <label>%</label>
            </td>
        </tr>
    );
}

export default AssignmentGroup;