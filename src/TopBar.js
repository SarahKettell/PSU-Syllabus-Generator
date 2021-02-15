import React, {useEffect, useState, Component} from 'react';
import './css/topbar-styles.css';

export default function TopBar(props){

    let menuButton = props.isOpen ? "menu_open" : "menu";

    return(
            <header className="top-bar">
                <nav>
                <div className="nav-wrapper">
                    <button className="material-icons" onClick={props.toggleNav}
                            aria-label="Open navigation menu">{menuButton}
                    </button>
                    <h1 className="brand-logo">Syllabus Generator</h1>
                    <ul id="nav-mobile" className="right hide-on-small-only">
                        <li>
                            <button className="material-icons"
                                aria-label="Download">download</button>
                        </li>
                        <li>
                        <button className="material-icons"
                                aria-label="Print">print</button>
                        </li>
                    </ul>
                </div>
                </nav>
            </header>
    );
}