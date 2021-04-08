import React from 'react';

export default function DownloadingModal(props){

    const isOpen = props.isOpen;
    console.log(isOpen)

    return (
        <div>
            <div id="download-modal" class={"modal" + (isOpen ? " open" : "")}>
                <div class="modal-content">
                    <h4>Modal Header</h4>
                    <p>A bunch of text</p>
                </div>
            </div>
        </div>
    )
}

