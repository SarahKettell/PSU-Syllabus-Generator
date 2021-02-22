import React, { useState } from 'react';

export default function AdditionalOfficeHours(props) {

    let add_office_hours_days = props.add_office_hours_days;
    let add_office_hours_start_time = props.add_office_hours_start_time;
    let add_office_hours_end_time = props.add_office_hours_end_time;

    let add_office_hours_key = props.add_office_hours_key;

    let handleAddOfficeHoursInfo = props.handleAddOfficeHoursInfo;
    //let deleteAddOfficeHours = props.deleteAddOfficeHours;

    return (
        <div>
            <div class="radio-set">
                <span class="title">Day(s):</span>
                <div class="form-group">
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-mon"} name={add_office_hours_key + "add_office_mon"} value="monday"
                        checked={add_office_hours_days.office_mon}
                        onChange={handleAddOfficeHoursInfo}
                        />
                        <label for={add_office_hours_key + "_add_oh-mon"} class="custom-control-label">Mon</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-tues"} name={add_office_hours_key + "add_office_tues"} value="tuesday"
                        checked={add_office_hours_days.office_tues}
                        onChange={handleAddOfficeHoursInfo}
                        />
                        <label for={add_office_hours_key + "_add_oh-tues"} class="custom-control-label">Tues</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-wed"} name={add_office_hours_key + "add_office_wed"} value="wednesday"
                        checked={add_office_hours_days.office_wed}
                        onChange={handleAddOfficeHoursInfo}
                        />
                        <label for={add_office_hours_key + "_add_oh-wed"} class="custom-control-label">Wed</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-thurs"} name={add_office_hours_key + "add_office_thurs"} value="thursday"
                        checked={add_office_hours_days.office_thurs}
                        onChange={handleAddOfficeHoursInfo}
                        />
                        <label for={add_office_hours_key + "_add_oh-thurs"} class="custom-control-label">Thurs</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-fri"} name={add_office_hours_key + "add_office_fri"} value="friday"
                        checked={add_office_hours_days.office_fri}
                        onChange={handleAddOfficeHoursInfo}
                        />
                        <label for={add_office_hours_key + "_add_oh-fri"} class="custom-control-label">Fri</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-sat"} name={add_office_hours_key + "add_office_sat"} value="saturday"
                        checked={add_office_hours_days.office_sat}
                        onChange={handleAddOfficeHoursInfo}
                        />
                        <label for={add_office_hours_key + "_add_oh-sat"} class="custom-control-label">Sat</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" class="custom-control-input" id={add_office_hours_key + "_add_oh-sun"} name={add_office_hours_key + "add_office_sun"} value="sunday"
                    checked={add_office_hours_days.office_sun}
                    onChange={handleAddOfficeHoursInfo}
                    />
                    <label for={add_office_hours_key + "_add_oh-sun"} class="custom-control-label">Sun</label>
                </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label id="add_oh-start-time">Start Time:</label>
                    <input type="time" id="add_oh-start-time"
                    name="add_office_start_time"
                    value={add_office_hours_start_time}
                    onChange={handleAddOfficeHoursInfo}
                    />
                </div>
                <div class="col">
                    <label id="add_oh-end-time">End Time:</label>
                    <input type="time" id="add_oh-end-time"
                    name="add_office_end_time"
                    value={add_office_hours_end_time}
                    onChange={handleAddOfficeHoursInfo}
                    />
                </div>
            </div>
        </div>
    );
}