// default values for the app when no local storage is present
// or when the user clears the syllabus

export const BASIC_INFO = {
    course_num: {content: "", req: false, included: false},
    course_name: {content: "", req: false, included: false},
    course_section: {content: "", req: false, included: false},
    num_credits: {content: "", req: false, included: false},
    prerequisites: {content: "", req: false, included: false},
    permission_req: {content: false, req: false, included: false},
    class_location: {content: "", req: false, included: false},
    class_time: {content: "", req: false, included: false},
    class_start_time: {content: "", req: false, included: false},
    class_end_time: {content: "", req: false, included: false, savedState: ""},
    class_days: {
        content: {
            monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
        }, req: false, included: false
    },
    lab_location: {content: "", req: false, included: false},
    lab_time: {content: "", req: false, included: false},
    lab_start_time: {content: "", req: false, included: false},
    lab_end_time: {content: "", req: false, included: false},
    lab_days: {
        content: {
            monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
        }, req: false, included: false
    },
    canvas_info: {content: "", req: false, included: false},
    semester: {content: "", req: false, included: false}
}

export const INSTRUCTOR_INFO = {
    instructor_name:    {content: "", req: true, included: false},
    office_location:    {content: "", req: false, included: false},
    office_phone:       {content: "", req: false, included: false},
    contact_info:       {content: "", req: true, included: false},
    ta_info:            {content: "", req: false, included: false},
    department_info:    {content: "", req: false, included: false},
    educational_phil:   {content: "", req: false, included: false},
    office_hours:       {content: [{
            office_start_time: "",
            office_end_time: "",
            office_days: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            }
        }], req: false, included: false},
}

export const COURSE_MATERIALS = {
    textbook_info:      {content: "", req: true, included: false},
    add_material_info:  {content: "", req: true, included: false},
    supp_material_info: {content: "", req: false, included: false},
    has_no_required:    {content: false, req: true, included: false}
}

export const COURSE_DESCRIPTIONS = {
    course_description:         {content: "", req: true, included: false},
    course_goals:               {content: "", req: false, included: false},
    learning_objs:              {content: "", req: false, included: false},
    instruction_methods:        {content: "", req: false, included: false},
    tech_used:                  {content: "", req: false, included: false},
    student_responsibilities:   {content: "", req: false, included: false},
    grading_scale_type:         {percent: true, points: false},
    grading_scale: 				{content: [
            {letter: "A",   percent: {low: 94, high: 100}, points: {low: 940, high: 1000}},
            {letter: "A-",  percent: {low: 90, high:  94}, points: {low: 900, high:  940}},
            {letter: "B+",  percent: {low: 87, high:  90}, points: {low: 870, high:  900}},
            {letter: "B",   percent: {low: 83, high:  87}, points: {low: 830, high:  870}},
            {letter: "B-",  percent: {low: 80, high:  83}, points: {low: 800, high:  830}},
            {letter: "C+",  percent: {low: 77, high:  80}, points: {low: 770, high:  800}},
            {letter: "C",   percent: {low: 70, high:  77}, points: {low: 700, high:  770}},
            {letter: "D",   percent: {low: 60, high:  70}, points: {low: 600, high:  700}},
            {letter: "F",   percent: {low:  0, high:  60}, points: {low:   0, high:  600}},
        ], req: false, included: true},
    number_assignment_types:    0,
    assignment_info:            {content: [
            {id: 0, title:"", description:"", points_each: 0, num_of: 0, points_total: 0}
        ], req: false, included: false},
}

export const COURSE_POLICIES = {
    academic_integrity:     {content: "", req: true, included: false, checked: true},
    grading:                {content: "", req: true, included: false, checked: true},
    exam_policy:            {content: "", req: true, included: false, checked: true},
    disability_statement:   {content: "", req: true, included: false, checked: true},
    edu_equity:             {content: "", req: true, included: false, checked: true},
    mandated_reporting:     {content: "", req: true, included: false, checked: true},
    attendance:             {content: "", req: false, included: false, checked: false},
    class_participation:    {content: "", req: false, included: false, checked: false},
    missed_assignments:     {content: "", req: false, included: false, checked: false,},
    extra_credit:           {content: "", req: false, included: false, checked: false},
    lab_safety:             {content: "", req: false, included: false, checked: false},
    emergency_statement:    {content: "", req: false, included: false, checked: false},
    code_of_conduct:        {content: "", req: false, included: false, checked: false}
}

export const COURSE_SCHEDULE = {
    syllabus_changes:       {content: "", req: false, included: false},
    test_dates:             {content: "", req: false, included: false},
    major_assignment_dates: {content: "", req: false, included: false},
    special_events:         {content: "", req: false, included: false},
    start_date:             {content: "", req: false, included: false, savedState: ""},
    end_date:               {content: "", req: false, included: false, savedState: ""},
    schedule:				{content: [], req: false, included: false},
    add_schedule: 			{content: false, req: false, included: false},
}

export const AVAILABLE_SERVICES = {
    learning_center:        {content: "", req: false, included: false, checked: false},
    disability:             {content: "", req: true, included: false, checked: true},
    library:                {content: "", req: false, included: false, checked: false},
    academic_advising:      {content: "", req: false, included: false, checked: false},
    career:                 {content: "", req: false, included: false, checked: false},
    counselling:            {content: "", req: true, included: false, checked: true},
    tech_help:              {content: "", req: false, included: false, checked: false}
}

export const CHECKLIST_STATE = {
    basicCourseInfo: {
        course_num:     {removed: false, icon_style: 'remove', name: "Course Number"},
        course_name:    {removed: false, icon_style: 'remove', name: "Course Name"},
        course_section: {removed: false, icon_style: 'remove', name: "Course Section"},
        num_credits:    {removed: false, icon_style: 'remove', name: "Credit Hours"},
        prerequisites:  {removed: false, icon_style: 'remove', name: "Prerequisites (courses, skills, experience)"},
        permission_req: {removed: false, icon_style: 'remove', name: "Permission from instructor required to register"},
        class_location: {removed: false, icon_style: 'remove', name: "Classroom Location"},
        class_time:     {removed: false, icon_style: 'remove', name: "Class meeting times"},
        class_days:     {removed: false, icon_style: 'remove', name: "Class meeting days"},
        lab_location:   {removed: false, icon_style: 'remove', name: "Lab/Recitation location "},
        lab_time:       {removed: false, icon_style: 'remove', name: "Lab/Recitation time"},
        canvas_info:    {removed: false, icon_style: 'remove', name: "CANVAS Information"},
        semester:       {removed: false, icon_style: 'remove', name: "Course Start and End Dates"},
    },
    instructorInfo: {
        instructor_name:    {removed: false, icon_style: 'remove', name: "Full name and title"},
        office_location:    {removed: false, icon_style: 'remove', name: "Office location"},
        office_phone:       {removed: false, icon_style: 'remove', name: "Office phone"},
        contact_info:       {removed: false, icon_style: 'remove', name: "Office hours and how to arrange a meeting"},
        ta_info:            {removed: false, icon_style: 'remove', name: "Contact information"},
        department_info:    {removed: false, icon_style: 'remove', name: "Teaching Assistants’ contact information"},
        educational_phil:   {removed: false, icon_style: 'remove', name: "Department location and phone number"},
        office_hours:       {removed: false, icon_style: 'remove', name: "Educational Philosophy"}
    },
    courseMaterials: {
        textbook_info:      {removed: false, icon_style: 'remove', name: "Textbook(s): title, author, date and edition, publisher, cost, ISBN#"},
        add_material_info:  {removed: false, icon_style: 'remove', name: "Other required materials"},
        supp_material_info: {removed: false, icon_style: 'remove', name: "Supplementary readings"}
    },
    courseDescriptions: {
        course_description:         {removed: false, icon_style: 'remove', name: "Course description"},
        course_goals:               {removed: false, icon_style: 'remove', name: "Course goals"},
        learning_objs:              {removed: false, icon_style: 'remove', name: "Learning objectives for students"},
        instruction_methods:        {removed: false, icon_style: 'remove', name: "Instructional methods"},
        tech_used:                  {removed: false, icon_style: 'remove', name: "Technologies to be used"},
        student_responsibilities:   {removed: false, icon_style: 'remove', name: "Student responsibilities"},
        grading_scale: 				{removed: false, icon_style: 'remove', name: "Grading scales"},
        assignment_info:            {removed: false, icon_style: 'remove', name: "Descriptions of major assignments"},
    },
    coursePolicies: {
        academic_integrity:     {removed: false, icon_style: 'remove', name: "Academic integrity policy"},
        grading:                {removed: false, icon_style: 'remove', name: "Your Grading policy"},
        exam_policy:            {removed: false, icon_style: 'remove', name: "Examination policy"},
        disability_statement:   {removed: false, icon_style: 'remove', name: "Disability Access Statement"},
        edu_equity:             {removed: false, icon_style: 'remove', name: "Reporting Educational Equity Concerns"},
        mandated_reporting:     {removed: false, icon_style: 'remove', name: "Mandated Reporting Statement"},
        attendance:             {removed: false, icon_style: 'remove', name: "Attendance, lateness, policy for missed classes"},
        class_participation:    {removed: false, icon_style: 'remove', name: "Class participation"},
        missed_assignments:     {removed: false, icon_style: 'remove', name: "Policy for missed assignments, make-up quizzes and exams"},
        extra_credit:           {removed: false, icon_style: 'remove', name: "Extra credit policies"},
        lab_safety:             {removed: false, icon_style: 'remove', name: "Laboratory safety"},
        emergency_statement:    {removed: false, icon_style: 'remove', name: "Emergency statement"},
        code_of_conduct:        {removed: false, icon_style: 'remove', name: "Penn State’s Code of Conduct"},
    },
    courseSchedule: {
        start_date:             {removed: false, icon_style: 'remove', name: "Course Start Date"},
        end_date:               {removed: false, icon_style: 'remove', name: "Course End Date"},
        add_schedule: 			{removed: false, icon_style: 'remove', name: "Tentative weekly schedule"},
    },
    studentServices: {
        learning_center:        {removed: false, icon_style: 'remove', name: "Russell E. Horn Sr. Learning Center, SEC 201"},
        disability:             {removed: false, icon_style: 'remove', name: "Disability Services, SEC 205"},
        library:                {removed: false, icon_style: 'remove', name: "Library Services"},
        academic_advising:      {removed: false, icon_style: 'remove', name: "Academic Advising, SEC 204"},
        career:                 {removed: false, icon_style: 'remove', name: "Career Services & Student Conduct, SEC 212"},
        counselling:            {removed: false, icon_style: 'remove', name: "Counseling &Psychological Services, SEC 205"},
        tech_help:              {removed: false, icon_style: 'remove', name: "Technology Help Desk, Basement of Olmsted Building"},
    }
}
