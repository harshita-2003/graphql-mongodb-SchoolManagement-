import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";

@InputType()
export class AssignStudentsToLessonInput{
    @IsUUID()
    @Field(type => ID)
    lessonId: string;

    @IsUUID("4", { each: true })    // each: true ensures each element in array is validated as a UUID
    @Field(type => [ID])
    studentIds: string[];
}