import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsUUID, MinLength } from "class-validator";

@InputType()
export class LessonInput {
    @MinLength(1)
    @Field()
    name: string;

    @IsDateString()
    @Field()
    startDate: string;

    @IsDateString()
    @Field()
    endDate: string;

    @IsUUID("4", { each: true })  
    @Field(type => [String], { defaultValue: [] })
    students: string[];
}