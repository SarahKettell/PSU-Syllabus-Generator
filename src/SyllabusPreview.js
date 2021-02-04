import React, {useEffect, useState, Component} from 'react';



// Displays and manages the syllabus preview module, which includes the HTML formatted
// content of the syllabus. This content is updated live as the user adds to the form.

export default function SyllabusPreview(props) {
    // Assign local variables to all of the user input info for cleaner use
    let courseInfo = props.userInput.courseInfo;
    let contactInfo = props.userInput.contactInfo;
    let meetingInfo = props.userInput.meetingInfo;
    let courseObjectives = props.userInput.courseObjectives;
    let assessmentInfo = props.userInput.assessmentInfo;
    let requiredMaterials = props.userInput.requiredMaterials;
    let additionalMaterials = props.userInput.additionalMaterials;
    let coursePrereqs = props.userInput.coursePrereqs;
    let additionalContent = props.userInput.additionalContent;
    let requiredPolicies = props.userInput.requiredPolicies;
    let includedContentCheck = props.userInput.includedContentCheck;

    // Assign defaults for each of the fields
    const course_num = "[Course Number]";
    const course_name = "[Course Name]";
    const course_section = "[Section]";
    const meeting_location = "[Class Meeting Location]";
    const meeting_times = "[Day] [Start Time] - [End Time]";
    const instructor_name = "[Instructor Name]";
    const email = "[email@psu.edu]";
    const phone = "###-###-####";
    const office_location = "[Office Location]";
    const course_objectives = "<p>[Course Description]</p>" +
        "<ul><li>Example Objective 1</li>" +
        "<li>Example Objective 1</li>" +
        "<li>Example Objective 1</li></ul>";
    const details_needed = "[Add details here]"
    const textbooks = "[APA format - Author, A. A. (Year of publication). Title of work: Capital letter also for subtitle. Location (City, State): Publisher.]"

    return (
        <div className="row main-content-row">
            <h2 id="syllabus-preview">Syllabus Preview</h2>
            <div className="preview">
                <div className="syllabus-container">
            <div className="header">
                    <div className="header-text">
                        <h1>{(includedContentCheck.course_num.added) ? courseInfo.course_num : course_num}: &nbsp;
                            {(includedContentCheck.course_name.added) ? courseInfo.course_name : course_name}
                        </h1>
                        <h2>Spring 2021</h2>
                        <div className="table-of-contents">
                            <ul className="anchor-links">
                                <li><a href="#information">Course Information</a></li>
                                <li><a href="#objectives">Description and Objectives</a></li>
                                <li><a href="#prereqs">Prerequisites</a></li>
                                <li><a href="#required">Required Materials</a></li>
                                <li><a href="#supplemental">Supplemental Materials</a></li>
                                <li><a href="#assignment-info">Assignments and Exams</a></li>
                                <li><a href="#grading-info">Grading Scale</a></li>
                                <li><a href="#policies">University Policies</a></li>
                                <li><a href="#schedule">Course Schedule</a></li>
                            </ul>
                        </div>
                    </div>
            </div>
            <div className="course-information" id="information">
                <p><span className="title">Instructor:</span>
                    {includedContentCheck.instructor_name.added ? contactInfo.instructor_name : instructor_name}
                </p>
                <p><span className="title">Class Location:</span>
                    {(includedContentCheck.meeting_location.added) ? courseInfo.meeting_location : meeting_location}
                </p>
                <p><span className="title">Meeting Times:</span>{meeting_times}</p>
                <p><span className="title">Format:</span>[Class Format]</p>
                <p><span className="title">Email:</span>
                    {(includedContentCheck.instructor_contact.added) ? contactInfo.email : "[Email]"}
                </p>
                <p><span className="title">Phone:</span>
                    {(includedContentCheck.instructor_contact.added) ? contactInfo.phone : "[###-###-####]"}
                </p>
                <p><span className="title">Office Hours Location:</span>{office_location}</p>
                <p><span className="title">Office Hours:</span>
                    <ul>
                        <li>{meeting_times}</li>
                        <li>{meeting_times}</li>
                    </ul>
                </p>
            </div>
            <div className="course-description-objectives">
                <h2 id="objectives">Course Description and Objectives</h2>
                {(includedContentCheck.course_objectives.added) ? <div dangerouslySetInnerHTML={{__html: courseObjectives}}/> : <div dangerouslySetInnerHTML={{__html: course_objectives}}/>}
            </div>
            <div className="prerequisites" id="prereqs">
                <h2>Prerequisites</h2>
                {(includedContentCheck.course_prereqs.added) ? <div dangerouslySetInnerHTML={{__html: coursePrereqs}}/> : details_needed}
            </div>
            <div className="required-materials">
                <h2 id="required">Required Materials</h2>
                <h3>Textbooks</h3>
                {(includedContentCheck.req_textbooks.added) ? <div dangerouslySetInnerHTML={{__html: requiredMaterials.req_textbooks}}/> : textbooks}
                <h3>Additional Materials</h3>
                {(includedContentCheck.req_add_materials.added) ? <div dangerouslySetInnerHTML={{__html: requiredMaterials.req_add_materials}}/> : details_needed}
                <h3>Lab Information</h3>
                {(includedContentCheck.req_lab_info.added) ? <div dangerouslySetInnerHTML={{__html: requiredMaterials.req_lab_info}}/> : details_needed}
            </div>
            <div className="supplemental-materials">
                <h2 id="supplemental">Supplemental Materials</h2>
                {(includedContentCheck.add_materials.added) ? <div dangerouslySetInnerHTML={{__html: additionalMaterials}}/> : details_needed}
            </div>
            <div className="grading-information">
                <h2>Grading Information</h2>
                <h3 id="assignment-info">Assignment Information</h3>
                <ul className="assignment-grades">
                    <li><span className="title">4 Discussion Forums:</span> 10%, 5 points each</li>
                    <ul>
                        <li>Aliquam a mauris ultricies, pellentesque leo sed, ornare orci. Fusce vitae tempus enim.
                            Quisque nec neque quis arcu imperdiet rhoncus. Duis ornare feugiat molestie. Donec a
                            ex vel lorem mollis vestibulum id at orci. Curabitur vestibulum ipsum vel orci fringilla,
                            eget convallis lacus luctus.
                        </li>
                    </ul>
                    <li><span className="title">6 Homework Assignments:</span> 50%, 100 points each</li>
                    <ul>
                        <li>Aliquam a mauris ultricies, pellentesque leo sed, ornare orci. Fusce vitae tempus enim.
                            Quisque nec neque quis arcu imperdiet rhoncus. Duis ornare feugiat molestie. Donec a
                            ex vel lorem mollis vestibulum id at orci. Curabitur vestibulum ipsum vel orci fringilla,
                            eget convallis lacus luctus.
                        </li>
                    </ul>
                    <li><span className="title">4 Quizzes:</span> 20%, 100 points each, lowest score dropped</li>
                    <ul>
                        <li>Aliquam a mauris ultricies, pellentesque leo sed, ornare orci. Fusce vitae tempus enim.
                            Quisque nec neque quis arcu imperdiet rhoncus. Duis ornare feugiat molestie. Donec a
                            ex vel lorem mollis vestibulum id at orci. Curabitur vestibulum ipsum vel orci fringilla,
                            eget convallis lacus luctus.
                        </li>
                    </ul>
                    <li><span className="title">Final Exam:</span> 20%, 100 points</li>
                    <ul>
                        <li>Aliquam a mauris ultricies, pellentesque leo sed, ornare orci. Fusce vitae tempus enim.
                            Quisque nec neque quis arcu imperdiet rhoncus. Duis ornare feugiat molestie. Donec a
                            ex vel lorem mollis vestibulum id at orci. Curabitur vestibulum ipsum vel orci fringilla,
                            eget convallis lacus luctus.
                        </li>
                    </ul>
                    <li><span className="title">Total:</span> 100%, 1020 points</li>
                </ul>
                <h3 id="grading-info">Grading Scale</h3>
                <ul className="grading-scale">
                    <li className="grade-scale-titles">
                        <span className="grade">Grade</span>
                        <span className="percentage">Percentage</span>
                        <span className="points">Points</span>
                    </li>
                    <li>
                        <span className="grade">A</span>
                        <span className="percentage">94-100%</span>
                        <span className="points">940-1000</span>
                    </li>
                    <li>
                        <span className="grade">A-</span>
                        <span className="percentage">94-100%</span>
                        <span className="points">940-1000</span>
                    </li>
                    <li>
                        <span className="grade">B+</span>
                        <span className="percentage">94-100%</span>
                        <span className="points">940-1000</span>
                    </li>
                    <li>
                        <span className="grade">B</span>
                        <span className="percentage">94-100%</span>
                        <span className="points">940-1000</span>
                    </li>
                </ul>
                <h3>Exam and Assignment Policies</h3>
                {(includedContentCheck.exam_info.added) ? <div dangerouslySetInnerHTML={{__html: assessmentInfo.exam_info}}/> : details_needed}
            </div>
            <div id="policies">
                <h2>University Policies</h2>
                <div className="policy_section" id="covid_statements">
                    <h3>COVID-19 Statements:</h3>
                    <p>Suggested syllabus language for Spring related to:</p>
                    <ul>
                        <li>Mask-wearing and attendance</li>
                        <li>Webcam use</li>
                        <li>Wellness Days (coming soon)</li>
                    </ul>
                    <p><a
                        href="https://senate.psu.edu/syllabus-language-for-required-and-covid-19-related-topics/">https://senate.psu.edu/syllabus-language-for-required-and-covid-19-related-topics/</a>
                    </p>
                    <p>
                        Syllabus Statement if you are Recording:
                        A faculty member must inform students that they are being recorded by sharing the following
                        language with them: “Video and audio recordings of class
                        lectures will be part of the classroom activity. The video and audio recording is used for
                        educational use/purposes and only may be made available to
                        all students presently enrolled in the class. For purposes where the recordings will be used in
                        future class session/lectures, any type of identifying
                        information will be adequately removed.”
                    </p>
                </div>

                <div className="policy_section" id="academic_integrity">
                    <h3>ACADEMIC INTEGRITY</h3>
                    <p>Academic dishonesty is not limited to simply cheating on an exam or assignment. The following is
                        quoted directly from the
                        "PSU Faculty Senate Policies for Students" regarding academic integrity and academic dishonesty:
                        "Academic integrity is
                        the pursuit of scholarly activity free from fraud and deception and is an educational objective
                        of this institution. Academic dishonesty includes,
                        but is not limited to, cheating, plagiarizing, fabricating of information or citations,
                        facilitating acts of academic dishonesty by others, having
                        unauthorized possession of examinations, submitting work of another person or work previously
                        used without informing the instructor, or tampering
                        with the academic work of other students."
                    </p>
                    <p>All University and Penn State Harrisburg policies regarding academic integrity/academic
                        dishonesty apply to this course and the students enrolled in this
                        course. Refer to the following URL for further details on the academic integrity policy of Penn
                        State Harrisburg:
                        <a href="http://harrisburg.psu.edu/academics/academic-guidelines-and-policies">http://harrisburg.psu.edu/academics/academic-guidelines-and-policies</a>.
                        Each student in this course is expected to work entirely on her/his own while taking any exam,
                        to complete assignments on her/his own effort without
                        the assistance of others unless directed otherwise by the instructor, and to abide by University
                        and Penn State Harrisburg policies about academic
                        integrity and academic dishonesty. Academic dishonesty can result in an assignment of "F" or
                        "XF" as the final grade for the student. (Note:
                        Indicate if you plan to use Turnitin (<a
                            href="http://turnitin.psu.edu/">http://turnitin.psu.edu/</a>) as a plagiarism detection
                        tool.)
                    </p>
                </div>

                <div className="policy_section" id="disability_access">
                    <h3>DISABILITY ACCESS</h3>
                    <p>Penn State welcomes students with disabilities into the University’s educational programs. Every
                        Penn State campus has a Student DisAbility Resources office.
                        Student DisAbility Resources at Penn State Harrisburg is located in SEC 205. The Disability
                        Services Coordinator, Alan Babcock, can be reached via email at
                        aub15@psu.edu or phone 717-948-6025.
                    </p>
                    <p>To receive consideration for accommodations, you must contact Student DisAbility Resources (SDR),
                        participate in an intake interview, provide documentation of
                        your disability, and complete a Self-Assessment. Additional information is available on the
                        Disability Services website
                        (<a href="http://harrisburg.psu.edu/disability-services">http://harrisburg.psu.edu/disability-services</a>).
                        If the documentation supports requests for reasonable accommodations,
                        SDR will provide you with an accommodations letter, which you will give to your professors. You
                        will receive accommodations after you give your accommodations
                        letters to your professors. You should share your accommodations letters with your professors as
                        early in the semester as possible. Professors do not provide
                        accommodations retroactively.
                    </p>
                </div>

                <div className="policy_section" id="counseling_statement">
                    <h3>COUNSELING & PSYCHOLOGICAL SERVICES</h3>
                    <p>Students may face a variety of concerns over the course of their time at PSH- depressed mood,
                        anxiety, stress, family concerns, body image, substance use, sexuality
                        and many others- that may interfere with their ability to focus on their studies. Counseling and
                        Psychological Services provides FREE mental health and social support
                        for all currently enrolled students. Staff follow strict legal and ethical guidelines concerning
                        the confidentiality of counseling. Counseling and Psychological services
                        is located in SEC 205 and can be reached by phone at (717) 948-6025. You can find more
                        information at the Counseling and Psychological Services webpage,
                        <a href="http://harrisburg.psu.edu/counseling-services">http://harrisburg.psu.edu/counseling-services</a>.
                    </p>
                </div>

                <div className="policy_section" id="educational_equity">
                    <h3>EDUCATIONAL EQUITY</h3>
                    <p>Penn State takes great pride to foster a diverse and inclusive environment for students, faculty,
                        and staff. Acts of intolerance, discrimination, harassment, and/or
                        incivility due to age, ancestry, color, disability, gender, national origin, race, religious
                        belief, sexual orientation, or veteran status are not tolerated and can be
                        reported through Educational Equity at the Report Bias site: <a
                            href="http://equity.psu.edu/reportbias/statement">http://equity.psu.edu/reportbias/statement</a>.
                        Penn State’s Code of Conduct can be found at the following link <a
                            href="https://studentaffairs.psu.edu/support-safety-conduct/student-conduct/code-conduct">
                            https://studentaffairs.psu.edu/support-safety-conduct/student-conduct/code-conduct</a>.
                    </p>
                    <p>Direct all inquiries regarding the nondiscrimination policy to our Penn State Harrisburg Office
                        of Equity and Compliance, Perdeta Bush, Equity and Compliance Specialist,
                        717-948-6180 and in Olmsted E131.
                    </p>
                </div>

                <div className="policy_section" id="mandated_reporting">
                    <h3>MANDATED REPORTING</h3>
                    <p>As an instructor, one of my responsibilities is to help create a safe learning environment on our
                        campus. I also have a mandatory reporting responsibility
                        related to my role as an educator. It is my goal that you feel able to share information related
                        to your life experiences in classroom discussions, in your
                        written work, and in our one-on-one meetings. I will seek to keep information you share private
                        to the greatest extent possible. However, per University
                        policy AD85 (<a
                            href="https://policy.psu.edu/policies/ad85">https://policy.psu.edu/policies/ad85</a>), I am
                        required to share information regarding sexual
                        misconduct or information about a crime with the University including incidents of sex-based
                        discrimination and harassment (discrimination, harassment,
                        sexual harassment, sexual misconduct, dating violence, domestic violence, stalking, and
                        retaliation). While faculty are ethically bound to report any
                        information as it relates to University policy, we are also a resource and want to be sure you
                        are aware of the services available to you.
                    </p>
                    <p>The first resource that should you should contact is Perdeta Bush, Penn State Harrisburg Title IX
                        Office E131 Olmsted Building, 717-948-6180</p>
                    <p>The statement above for mandated reporting is required on the syllabus, the information below is
                        optional.</p>
                    <p>Other resources that are available include:</p>
                    <ul>
                        <li>Penn State Harrisburg Counseling and Psychological Services
                            SEC 205 - 717-948-6025
                        </li>
                        <li>Department of Safety & Police
                            Campus Police – 717-979-7976
                            Local Police – 717-543-2200 or 911
                        </li>
                        <li>YWCA Confidential Domestic Violence & Sexual Assault Services
                            1101 Market Street – 1-800-654-1221 (available 24/7)
                        </li>
                        <li>Contact Helpline
                            800-932-4616 (24-hour community crisis hotline)
                        </li>
                        <li>Pinnacle Health Harrisburg
                            111 South Front Street – 717-782-3131
                        </li>
                        <li>Penn State Harrisburg Student Health Services
                            220 Capital Union Building – 717-948-6015
                        </li>
                        <li>Penn State Hotline
                            800-560-1637 (Anonymous reporting)
                        </li>
                    </ul>
                </div>

                <div className="policy_section" id="learning_center_info">
                    <h3>The Russell E. Horn Learning Center:</h3>
                    <p>For the spring 2021 semester, all Russell E. Horn Sr. Learning Center tutoring will be conducted
                        remotely via Zoom. The Learning Center
                        may have a tutor who can assist with the content of this course. An appointment is recommended.
                        You can make an appointment in one of the
                        three ways listed below.
                    </p>
                    <p>Online: starfish.psu.edu
                        Via phone: 717-948-6475
                        Via email: LCoffice@psu.edu
                    </p>
                    <p>The Learning Center can help you in a variety of ways:

                        Academic Success Coaches
                        Our professional coaches use individualized tools and learning strategies to help students with:
                        Time management, organization, test-taking, study skills,
                        as well as speech and presentation preparation and delivery.

                        Subject Area Tutoring
                        Courses including accounting, biological and behavioral science, computer science, economics,
                        finance, mathematics, physical sciences, statistics,
                        and some world languages are supported by peer and professional tutoring.

                        Writing
                        Our professional writing tutors can help students with the development of essays, argument
                        papers, resumes, cover letters, scholarship applications
                        and much more. We can help at any stage from brainstorming ideas, to citing sources, to
                        polishing your final product.
                    </p>
                    <p>If you have a request for tutoring help with a subject that is not in Starfish, send an email to
                        PSHLearningCtr@psu.edu and we will try to find
                        you an option. If you absolutely cannot find a time that works for you, please let us know at
                        LCoffice@psu.edu and we will try to arrange a time that suits you.
                    </p>
                    <p>Like us at facebook.com/RussellEHornSrLearningCenter, follow us on Twitter @PSUHLC, and on
                        Instagram @russellehornsrlearningcenter</p>
                </div>
            </div>
            <div className="course-schedule">
                <h2 id="schedule">Course Schedule</h2>
                <h3>Week 1: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 2: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 3: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 4: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 5: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 6: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 7: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 8: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 9: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 10: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 11: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 12: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 13: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 14: Thanksgiving Break - No Class [Date]</h3>
                <h3>Week 15: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Week 16: [Optional Topic] [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
                <h3>Finals Week [Date]</h3>
                <ul>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                    <li>List item of things to do this week</li>
                </ul>
            </div>
        </div>
            </div>
        </div>
    );
}