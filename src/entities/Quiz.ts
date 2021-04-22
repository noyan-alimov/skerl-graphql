import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';
import { Teacher } from './Teacher';

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@ManyToOne(() => Teacher, teacher => teacher.quizzes)
	teacher: Teacher;

	@Field(() => [Question])
	@OneToMany(() => Question, question => question.quiz)
	questions: Question[];
}
