import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { StudentCreateInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ) {}

    async getAllStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async createStudent(studentInput : StudentCreateInput): Promise<Student> {
        const {firstName,lastName} = studentInput;
        const newStudent = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName
        });
        return this.studentRepository.save(newStudent);
    }

    async getStudentById(id:string) : Promise<Student | null> {
        return this.studentRepository.findOneBy({id});
    }
}
