import React, {Component} from "react";
import {EditorState} from "draft-js";
import {stateToHTML} from "draft-js-export-html";
import sanitizeHtml from "sanitize-html";
import {Editor} from "react-draft-wysiwyg";


export default class ControlledEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange: function = (editorState) => {
        this.setState({
            editorState,
        });
        let dirtyHTML = stateToHTML(editorState.getCurrentContent());
        if (dirtyHTML !== "") {
            if (dirtyHTML === "<p><br></p>") {
                dirtyHTML = ""
            }
            let cleanHTML = sanitizeHtml(dirtyHTML);
            let tempInfo = {
                id: this.props.id,
                value: cleanHTML
            }
            console.log(tempInfo);
            this.props.updateContent(tempInfo);
        }
    };

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="rte-editor-full"
                editorClassName="rte-editor"
                toolbarClassName="rte-editor-toolbar"
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}