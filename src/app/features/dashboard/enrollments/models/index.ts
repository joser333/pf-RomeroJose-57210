import { Course } from "../../courses/models";
import { Student } from "../../students/models";

export interface Enrollment{
    id: string;
    studentId: string;
    courseId: string;
}

export interface LoadStudentsAndCoursesResult{
    students: Student[];
    courses: Course[];
}

export interface CreateEnrollmentPayload{
    studentId: string;
    courseId: string;
}