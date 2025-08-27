import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentCreateInput } from "./create-student.input";
import { StudentService } from "./student.service";

@Resolver(of => StudentType)
export class StudentResolver {

    constructor(
        private studentService: StudentService
    ) {}

    @Query(returns => [StudentType])
    students() {
        return this.studentService.getAllStudents();
    }

    @Mutation(returns => StudentType)
    createStudent(
        @Args('studentInput') studentInput: StudentCreateInput
    ) {
        return this.studentService.createStudent(studentInput);
    }

    @Query(returns => StudentType)
    student(@Args('id') id:string) {
        return this.studentService.getStudentById(id);
    }
}