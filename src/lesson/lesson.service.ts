import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>
    ) {}

    async getLessonById(id:string) : Promise<Lesson | null> {
        return this.lessonRepository.findOneBy({id});
    }

    async createLesson(createLessonInput: LessonInput): Promise<Lesson> {
        const {name, startDate, endDate, students} = createLessonInput;

        const newLesson = this.lessonRepository.create({
            id : uuid(),
            name, 
            startDate, 
            endDate,
            students
        });
        return this.lessonRepository.save(newLesson);
    }

    async getAllLessons(): Promise<Lesson[]> {
        return this.lessonRepository.find();
    }

    async assignStudentsToLesson(assignStudentsToLesson: AssignStudentsToLessonInput): Promise<Lesson> {
        const { lessonId, studentIds } = assignStudentsToLesson;

        const lesson = await this.lessonRepository.findOneBy({id: lessonId});
        if (!lesson) {
            throw new Error('Lesson not found');
        }
        lesson.students = [...lesson.students, ...studentIds];
        return this.lessonRepository.save(lesson);
    }
    
}
