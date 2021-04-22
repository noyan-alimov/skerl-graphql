import { Field, ObjectType } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './Quiz';

@ObjectType()
@Entity()
export class Teacher extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column({ unique: true })
	name!: string;

	@Field(() => [Quiz])
	@OneToMany(() => Quiz, quiz => quiz.teacher)
	quizzes: Quiz[];
}
