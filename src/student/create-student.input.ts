import { Field, InputType } from "@nestjs/graphql";
import { IsString, MinLength } from "class-validator";

@InputType()
export class StudentCreateInput {
    @IsString()
    @Field()
    @MinLength(1)
    firstName: string;


    @IsString()
    @Field()
    @MinLength(1)
    lastName: string;
}