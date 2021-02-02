import React, { useState } from 'react';

export default function AdditionalMeetingTimes (props) {

    let add_meeting_type = props.add_meeting_type;
    let add_meeting_days = props.add_meeting_days;
    let add_meeting_start_time = props.add_meeting_start_time;
    let add_meeting_end_time = props.add_meeting_end_time;

    let add_meeting_key = props.add_meeting_key;
    let handleMeetingInfo = props.handleMeetingInfo;
    
    return (
        <div key={add_meeting_key}>
            <div class="radio-set">
				<span class="title">Meeting Type:</span>
				<div class="form-group" >
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="meeting-class" name="meeting_type" value="class" class="custom-control-input"
                        checked={add_meeting_type === "class"}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meeting-class" class="custom-control-label">Class</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="meeting-lab" name="meeting_type" value="lab" class="custom-control-input"
                        checked={add_meeting_type === "lab"}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meeting-lab" class="custom-control-label">Lab</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" id="meeting-other" name="meeting_type" value="other" class="custom-control-input"
                        checked={add_meeting_type === "other"}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meeting-other" class="custom-control-label">Other</label>
                    </div>
				</div>
			</div>
			<div class="radio-set">
				<span class="title">Day(s):</span>
				<div class="form-group">
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-mon" name="add_meeting_mon" value="monday"
                        checked={add_meeting_days.add_monday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-mon" class="custom-control-label">Mon</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-tues" name="add_meeting_tues" value="tuesday"
                        checked={add_meeting_days.add_tuesday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-tues" class="custom-control-label">Tues</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-wed" name="add_meeting_wed" value="wednesday"
                        checked={add_meeting_days.add_wednesday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-wed" class="custom-control-label">Wed</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-thurs" name="add_meeting_thurs" value="thursday"
                        checked={add_meeting_days.add_thursday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-thurs" class="custom-control-label">Thurs</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-fri" name="add_meeting_fri" value="friday"
                        checked={add_meeting_days.add_friday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-fri" class="custom-control-label">Fri</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-sat" name="add_meeting_sat" value="saturday"
                        checked={add_meeting_days.add_saturday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-sat" class="custom-control-label">Sat</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="meet-sun" name="add_meeting_sun" value="sunday"
                        checked={add_meeting_days.add_sunday}
                        onChange={handleMeetingInfo}
                        />
                        <label for="meet-sun" class="custom-control-label">Sun</label>
                    </div>
				</div>
			</div>
			<div class="form-row">
				<div class="col">
					<label id="start-time">Start Time:</label>
                    <input type="time" id="start-time"
                    name="meeting_start_time"
                    value={add_meeting_start_time}
                    onChange={handleMeetingInfo}
                    />
				</div>
				<div class="col">
                    <label id="end-time">End Time:</label>
                    <input type="time" id="end-time"
                    name="meeting_end_time"
                    value={add_meeting_end_time}
                    onChange={handleMeetingInfo}
                    />
				</div>  
			</div>
        </div>
    );
}