import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';

@ObjectType()
@Entity()
export class Quiz extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	creatorId!: string;

	@Field()
	@Column()
	name!: string;

	@Field(() => [Question])
	@OneToMany(() => Question, question => question.quiz)
	questions: Question[];
}
