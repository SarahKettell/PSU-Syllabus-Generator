import React, { useState } from 'react';

export default function AdditionalOfficeHours(props) {

    return (
        <div>
            <div class="radio-set">
                <span class="title">Day(s):</span>
                <div class="form-group">
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="oh-mon" name="office_mon" value="monday"
                        checked={state.office_mon}
                        onChange={handleChangeCheckbox}
                        />
                        <label for="oh-mon" class="custom-control-label">Mon</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="oh-tues" name="office_tues" value="tuesday"
                        checked={state.office_tues}
                        onChange={handleChangeCheckbox}
                        />
                        <label for="oh-tues" class="custom-control-label">Tues</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="oh-wed" name="office_wed" value="wednesday"
                        checked={state.office_wed}
                        onChange={handleChangeCheckbox}
                        />
                        <label for="oh-wed" class="custom-control-label">Wed</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="oh-thurs" name="office_thurs" value="thursday"
                        checked={state.office_thurs}
                        onChange={handleChangeCheckbox}
                        />
                        <label for="oh-thurs" class="custom-control-label">Thurs</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="oh-fri" name="office_fri" value="friday"
                        checked={state.office_fri}
                        onChange={handleChangeCheckbox}
                        />
                        <label for="oh-fri" class="custom-control-label">Fri</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                        <input type="checkbox" class="custom-control-input" id="oh-sat" name="office_sat" value="saturday"
                        checked={state.office_sat}
                        onChange={handleChangeCheckbox}
                        />
                        <label for="oh-sat" class="custom-control-label">Sat</label>
                    </div>
                    <div class="custom-control custom-checkbox custom-control-inline">
                    <input type="checkbox" class="custom-control-input" id="oh-sun" name="office_sun" value="sunday"
                    checked={state.office_sun}
                    onChange={handleChangeCheckbox}
                    />
                    <label for="oh-sun" class="custom-control-label">Sun</label>
                </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <label id="oh-start-time">Start Time:</label>
                    <input type="time" id="oh-start-time"
                    name="office_start_time"
                    value={state.office_start_time}
                    onChange={handleChange}
                    />
                </div>
                <div class="col">
                    <label id="oh-end-time">End Time:</label>
                    <input type="time" id="oh-end-time"
                    name="office_end_time"
                    value={state.office_end_time}
                    onChange={handleChange}
                    />
                </div>  
            </div>
        </div>
    );
}