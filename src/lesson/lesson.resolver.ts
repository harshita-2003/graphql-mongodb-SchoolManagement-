import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { LessonInput } from "./lesson.input";
import { AssignStudentsToLessonInput } from "./assign-students.input";

@Resolver(of => LessonType)

export class LessonResolver {
    constructor(
        private lessonService: LessonService
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
}