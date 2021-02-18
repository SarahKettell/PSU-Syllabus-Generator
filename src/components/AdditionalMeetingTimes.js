import React, { useState } from 'react';

export default function AdditionalMeetingTimes (props) {

    let add_meeting_type = props.add_meeting_type;
    let add_meeting_days = props.add_meeting_days;
    let add_meeting_start_time = props.add_meeting_start_time;
    let add_meeting_end_time = props.add_meeting_end_time;
    
    let add_meeting_key = props.add_meeting_key;
    
    let handleAddMeetingInfo = props.handleAddMeetingInfo;
    let deleteAddMeeting = props.deleteAddMeeting;

    return (
        <div key={add_meeting_key}>
            <div class="radio-set">
				<span class="title">Meeting Type:</span>
				<div class="form-group" >
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id={add_meeting_key + "_add_meeting-class"} name={add_meeting_key + "add_meeting_type"} value="class" class="custom-control-input"
                        checked={add_meeting_type === "class"}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "_add_meeting-class"} class="custom-control-label">Class</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id={add_meeting_key + "_add_meeting-lab"} name={add_meeting_key + "add_meeting_type"} value="lab" class="custom-control-input"
                        checked={add_meeting_type === "lab"}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "_add_meeting-lab"} class="custom-control-label">Lab</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id={add_meeting_key + "_add_meeting-other"} name={add_meeting_key + "add_meeting_type"} value="other" class="custom-control-input"
                        checked={add_meeting_type === "other"}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "_add_meeting-other"} class="custom-control-label">Other</label>
                    </div>
				</div>
			</div>
			<div class="radio-set">
				<span class="title">Day(s):</span>
				<div class="form-group">
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-mon"} name={add_meeting_key + "add_meeting_mon"} value="monday"
                        checked={add_meeting_days.add_monday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-mon"} class="custom-control-label">Mon</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-tues"} name={add_meeting_key + "add_meeting_tues"} value="tuesday"
                        checked={add_meeting_days.add_tuesday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-tues"} class="custom-control-label">Tues</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-wed"} name={add_meeting_key + "add_meeting_wed"} value="wednesday"
                        checked={add_meeting_days.add_wednesday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-wed"} class="custom-control-label">Wed</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-thurs"} name={add_meeting_key + "add_meeting_thurs"} value="thursday"
                        checked={add_meeting_days.add_thursday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-thurs"} class="custom-control-label">Thurs</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-fri"} name={add_meeting_key + "add_meeting_fri"} value="friday"
                        checked={add_meeting_days.add_friday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-fri"} class="custom-control-label">Fri</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-sat"} name={add_meeting_key + "add_meeting_sat"} value="saturday"
                        checked={add_meeting_days.add_saturday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-sat"} class="custom-control-label">Sat</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_meeting_key + "add_meet-sun"} name={add_meeting_key + "add_meeting_sun"} value="sunday"
                        checked={add_meeting_days.add_sunday}
                        onChange={handleAddMeetingInfo}
                        />
                        <label for={add_meeting_key + "add_meet-sun"} class="custom-control-label">Sun</label>
                    </div>
				</div>
			</div>
			<div class="form-row">
				<div class="col">
					<label id="add_start-time">Start Time:</label>
                    <input type="time" id="add_start-time"
                    name="add_meeting_start_time"
                    value={add_meeting_start_time}
                    onChange={handleAddMeetingInfo}
                    />
				</div>
				<div class="col">
                    <label id="add_end-time">End Time:</label>
                    <input type="time" id="add_end-time"
                    name="add_meeting_end_time"
                    value={add_meeting_end_time}
                    onChange={handleAddMeetingInfo}
                    />
				</div>  
			</div>
            <br />
            <button class="btn btn-danger" onClick={deleteAddMeeting}>
                X
            </button>
            <br />
        </div>
    );
}