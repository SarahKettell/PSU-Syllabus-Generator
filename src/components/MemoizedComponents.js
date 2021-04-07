import React, {useMemo} from "react";
import {
    AvailableStudentServices,
    BasicCourseInfo,
    CourseDescriptions,
    CourseMaterials,
    CoursePolicies,
    CourseSchedule,
    InstructorInfo
} from "./FormComponents";
import SyllabusPreview from "./SyllabusPreview";

export function MemoBasicCourseInfo(props){
    return useMemo(() => {
        return <BasicCourseInfo content={props.content}
                                updateState={props.updateState}/>
    }, [props.content]);
}

export function MemoInstructorInfo(props){
    return useMemo(() => {
        return <InstructorInfo content={props.content}
                               updateState={props.updateState}/>
    }, [props.content]);
}
export function MemoCourseMaterials(props){
    return useMemo(() => {
        return <CourseMaterials content={props.content}
                                updateState={props.updateState}/>
    }, [props.content]);
}
export function MemoCourseDescriptions(props){
    return useMemo(() => {
        return <CourseDescriptions content={props.content}
                                   updateState={props.updateState}/>
    }, [props.content]);
}
export function MemoCoursePolicies(props){
    return useMemo(() => {
        return <CoursePolicies content={props.content}
                               updateState={props.updateState}/>
    }, [props.content]);
}
export function MemoCourseSchedule(props){
    return useMemo(() => {
        return <CourseSchedule content={props.content}
                               updateState={props.updateState}/>
    }, [props.content]);
}
export function MemoAvailableStudentServices(props){
    return useMemo(() => {
        return <AvailableStudentServices content={props.content}
                                         updateState={props.updateState}/>
    }, [props.content]);
}

export function MemoSyllabusPreview(props) {
    return useMemo(() => {
        return <SyllabusPreview content={props.content}
                                refresh={props.refresh}
                                updatePreview={props.update}
        />;
    }, [props.refresh]);
}
