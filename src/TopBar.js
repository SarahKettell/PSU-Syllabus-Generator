import React, {useEffect, useState, Component} from 'react';
import './css/topbar-styles.css';

export default function TopBar(){

    return(
            <header className="row top-bar">
                <section className="col bar-left">
                    <button className="material-icons mdc-icon-button"
                            aria-label="Open navigation menu">menu_open
                    </button>
                    <h1 className="mdc-top-app-bar__title">Syllabus Generator</h1>
                </section>
                <section className="col bar-right">
                    <button className="material-icons mdc-icon-button"
                            aria-label="Download">download
                    </button>
                    <button className="material-icons mdc-icon-button"
                            aria-label="Print">print
                    </button>
                </section>
            </header>
    );
}