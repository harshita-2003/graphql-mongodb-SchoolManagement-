import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { LessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students.input";
import { StudentService } from "src/student/student.service";
import { Lesson } from "./lesson.entity";

@Resolver(of => LessonType)

export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {}

    @Query(returns => LessonType)
    lesson(@Args('id') id:string) {
        return this.lessonService.getLessonById(id);
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('creteLessonInput') createLessonInput: LessonInput
    ) {
       return this.lessonService.createLesson(createLessonInput); 
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getAllLessons();
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudents') assignStudents: AssignStudentsToLessonInput
    ) {
        return this.lessonService.assignStudentsToLesson(assignStudents)
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        console.log('Lesson passed to resolver:', lesson.students);
        return this.studentService.getManyStudents(lesson.students);
    }
}