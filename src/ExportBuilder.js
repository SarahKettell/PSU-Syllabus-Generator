import React from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

export function docxExport(){
    // Create document
    const doc = new Document({
        creator: "Instructor Name",
        description: "Syllabus",
        title: "CMPSC 101 Syllabus",
    });

    // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
    // This simple example will only contain one section
    doc.addSection({
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun("Hello World"),
                    new TextRun({
                        text: "Foo Bar",
                        bold: true,
                    }),
                    new TextRun({
                        text: "\tGithub is the best",
                        bold: true,
                    }),
                ],
            }),
        ],
    });

    console.log(doc);

    // // Used to export the file into a .docx file
    Packer.toBlob(doc).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, "example.docx");
    });
}

export function htmlExport(){
    // grabbing the current content of the preview box
    // this may be a viable way, just need to append the css to the beginning
    const previewHTML = document.getElementById("html-preview");
    const currentHTML = previewHTML.innerHTML;

    let newHTML = "<!DOCTYPE html>" +
                    "<html lang=\"en\">" +
                    "<head>" +
                    "<meta charset=\"utf-8\" />" +
                    "<title>" + "Syllabus Title Here" + "</title>" +
                    "<link href=\"https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap\" rel=\"stylesheet\">" +
                    "<style>" + htmlStyles + "</style>" +
                    "</head>" +
                    currentHTML;
    const innerBlob = new Blob([newHTML], {type: 'text/html'});

    console.log(innerBlob);
    saveAs(innerBlob, "html-example.html");
}


// the css stylesheet to be exported with the html file
const htmlStyles = "/* This stylesheet is used to define the styles for the HTML syllabus format in the preview and all associated files*/\n" +
    ".syllabus-container{\n" +
    "    padding:2rem;\n" +
    "    margin: 1rem 3rem;\n" +
    "    font-family: 'Open Sans', sans-serif;\n" +
    "}\n" +
    ".syllabus-container h1, h2, h3, h4, h5, h6{\n" +
    "    font-family: Avenir, 'Roboto', sans-serif;\n" +
    "    background: none;\n" +
    "    color:black;\n" +
    "}\n" +
    ".box .syllabus-container h2{\n" +
    "    padding: 0;\n" +
    "    background: none;\n" +
    "    color: black;\n" +
    "}\n" +
    ".syllabus-container h2{\n" +
    "    margin-top: 1.5em;\n" +
    "    border-top: 1px solid #314d64;\n" +
    "    padding-top: 1em;\n" +
    "}\n" +
    ".syllabus-container h3{\n" +
    "    margin-top: 2em;\n" +
    "}\n" +
    ".syllabus-container h3, h4, h5, h6{\n" +
    "    text-transform: uppercase;\n" +
    "}\n" +
    ".syllabus-container .header{\n" +
    "    text-align: center;\n" +
    "    margin-bottom: 3rem;\n" +
    "}\n" +
    ".syllabus-container .header h1{\n" +
    "    margin-bottom: 0;\n" +
    "    border:none;\n" +
    "}\n" +
    ".syllabus-container .header h2{\n" +
    "    margin-top: 0;\n" +
    "    border:none;\n" +
    "}\n" +
    ".syllabus-container .table-of-contents ul{\n" +
    "    list-style: none;\n" +
    "    border-bottom: 1px solid #314d64;\n" +
    "    text-transform: uppercase;\n" +
    "    padding: 20px;\n" +
    "}\n" +
    ".syllabus-container .table-of-contents li{\n" +
    "    display: inline-block;\n" +
    "    padding: 0 10px 0 10px;\n" +
    "    margin: 5px 0 5px 0;\n" +
    "    border-right: 1px solid lightgrey;\n" +
    "}\n" +
    ".syllabus-container .table-of-contents li:first-child{\n" +
    "    border-left: 1px solid lightgrey;\n" +
    "}\n" +
    ".syllabus-container .table-of-contents a{\n" +
    "    text-decoration: none;\n" +
    "    color: #009CDE;\n" +
    "    font-size: 11pt;\n" +
    "}\n" +
    ".syllabus-container .table-of-contents a:hover{\n" +
    "    text-decoration: none;\n" +
    "    color:#1E407C;\n" +
    "}\n" +
    ".syllabus-container .course-information p{\n" +
    "    margin: 0.5em 0 0.5em 0;\n" +
    "}\n" +
    ".syllabus-container .course-information .title{\n" +
    "    font-weight: bold;\n" +
    "    margin-right:.5em;\n" +
    "}\n" +
    ".syllabus-container .grading-information ul  {\n" +
    "    list-style: none;\n" +
    "    padding-left: 0;\n" +
    "}\n" +
    ".syllabus-container .grading-information ul.assignment-grades .title{\n" +
    "    font-weight:bold;\n" +
    "    margin-left:0;\n" +
    "}\n" +
    ".syllabus-container .grading-information ul.assignment-grades li{\n" +
    "    margin-bottom:20px;\n" +
    "}\n" +
    ".syllabus-container .grading-information  ul.grading-scale li.grade-scale-titles span{\n" +
    "    font-weight: bold;\n" +
    "    text-align: center;\n" +
    "}\n" +
    ".syllabus-container .grading-information ul.grading-scale li span{\n" +
    "    width:100px;\n" +
    "    display:inline-block;\n" +
    "    text-align: center;\n" +
    "}\n" +
    ".syllabus-container .grading-information ul.grading-scale li span.grade{\n" +
    "    text-align: left;\n" +
    "}\n" +
    "@media print {\n" +
    "    .syllabus-container{\n" +
    "        margin: 0;\n" +
    "        padding: 0;\n" +
    "        background-position: top left;\n" +
    "        background-repeat: no-repeat;\n" +
    "        background-size: 100px;\n" +
    "    }\n" +
    "    .header img {\n" +
    "        display:none;\n" +
    "    }\n" +
    "    .header h1{\n" +
    "        font-size: 16pt;\n" +
    "    }\n" +
    "    .header h2{\n" +
    "        font-size: 14pt;\n" +
    "    }\n" +
    "    .table-of-contents {\n" +
    "        display: none;\n" +
    "    }\n" +
    "}"