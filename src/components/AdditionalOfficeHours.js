import React, { useState } from 'react';

export default function AdditionalOfficeHours(props) {

    let add_office_hours_days = props.add_office_hours_days;
    let add_office_hours_start_time = props.add_office_hours_start_time;
    let add_office_hours_end_time = props.add_office_hours_end_time;
    let add_office_hours_key = props.add_office_hours_key;
    let handleAddOfficeHoursInfo = props.handleAddOfficeHoursInfo;
    //let deleteAddOfficeHours = props.deleteAddOfficeHours;



    return (
        <div className="col s12">
            <div className="checkbox-row col s12 m12 l7">
                <p className="simple-radio-group">
                    <span className="radio-title"> Day(s):</span>
                    <label for={add_office_hours_key + "_add_oh-mon"}>
                        <input className="filled-in"
                               name="monday"
                               id={add_office_hours_key + "_add_oh-mon"}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               checked={add_office_hours_days.office_mon}
                               type="checkbox"/>
                        <span>Mon</span>
                    </label>
                    <label for={add_office_hours_key + "_add_oh-tues"}>
                        <input className="filled-in"
                               name="tuesday"
                               id={add_office_hours_key + "_add_oh-tues"}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               checked={add_office_hours_days.office_tues}
                               type="checkbox"/>
                        <span>Tue</span>
                    </label>
                    <label for={add_office_hours_key + "_add_oh-wed"}>
                        <input className="filled-in"
                               name="wednesday"
                               id={add_office_hours_key + "_add_oh-wed"}
                               checked={add_office_hours_days.office_wed}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               type="checkbox"/>
                        <span>Wed</span>
                    </label>
                    <label for={add_office_hours_key + "_add_oh-thurs"}>
                        <input className="filled-in"
                               name="thursday"
                               id={add_office_hours_key + "_add_oh-thurs"}
                               checked={add_office_hours_days.office_thurs}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               type="checkbox"/>
                        <span>Thu</span>
                    </label>
                    <label for={add_office_hours_key + "_add_oh-fri"}>
                        <input className="filled-in"
                               name="friday"
                               id={add_office_hours_key + "_add_oh-fri"}
                               checked={add_office_hours_days.office_fri}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               type="checkbox"/>
                        <span>Fri</span>
                    </label>
                    <label for={add_office_hours_key + "_add_oh-sat"}>
                        <input className="filled-in"
                               name="saturday"
                               id={add_office_hours_key + "_add_oh-sat"}
                               checked={add_office_hours_days.office_sat}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               type="checkbox"/>
                        <span>Sat</span>
                    </label>
                    <label for={add_office_hours_key + "_add_oh-sun"}>
                        <input className="filled-in"
                               name="sunday"
                               id={add_office_hours_key + "_add_oh-sun"}
                               onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                               checked={add_office_hours_days.office_sun}
                               type="checkbox"/>
                        <span>Sun</span>
                    </label>
                </p>
            </div>
            <div className="input-field col s12 m6 l2">
                <input id="office_start_time" type="time" step="300"
                       name="office_start_time"
                       onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}/>
                <label className="active" htmlFor="office_start_time">Start Time:</label>
            </div>
            <div className="input-field col s12 m6 l2">
                <input id="office_end_time" type="time" step="300"
                       name="office_end_time"
                       onChange={(e) => handleAddOfficeHoursInfo(e, add_office_hours_key)}
                />
                <label htmlFor="office_end_time" className="active">End Time:</label>
            </div>
            {/*{(add_office_hours_key > 0) &&*/}
            {/*<button className="btn-flat right">*/}
            {/*    <i className="material-icons">clear</i>*/}
            {/*</button>*/}
            {/*}*/}
        </div>
    );
}
