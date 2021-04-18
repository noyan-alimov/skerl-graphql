import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';

@ObjectType()
@Entity()
export class Answer extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	answer!: string;

	@Field()
	@Column()
	isCorrect!: boolean;

	@ManyToOne(() => Question, question => question.answers)
	question: Question;
}
