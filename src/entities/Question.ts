import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './Answer';
import { Quiz } from './Quiz';

@ObjectType()
@Entity()
export class Question extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	question!: string;

	@ManyToOne(() => Quiz, quiz => quiz.questions)
	quiz: Quiz;

	@Field(() => [Answer])
	@OneToMany(() => Answer, answer => answer.question)
	answers: Answer[];
}
