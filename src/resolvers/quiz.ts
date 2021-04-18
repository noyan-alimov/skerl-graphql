import { Quiz } from '../entities/Quiz';
import { Question } from '../entities/Question';
import {
	Arg,
	Field,
	InputType,
	Int,
	Mutation,
	Query,
	Resolver,
} from 'type-graphql';

@InputType()
class QuizInput {
	@Field()
	creatorId: string;

	@Field()
	name: string;
}

@Resolver()
export class QuizResolver {
	@Query(() => [Quiz])
	async quizzes(): Promise<Quiz[]> {
		return await Quiz.find({});
	}

	@Query(() => Quiz)
	async quiz(
		@Arg('id', () => Int)
		id: number
	): Promise<Quiz> {
		const quiz = await Quiz.findOne(id);
		if (!quiz) {
			throw new Error('Quiz not found');
		}

		const questions = await Question.find({ quiz });
		quiz.questions = questions;
		return quiz;
	}

	@Mutation(() => Quiz)
	async createQuiz(
		@Arg('input', () => QuizInput)
		input: QuizInput
	): Promise<Quiz> {
		return Quiz.create({ ...input }).save();
	}

	@Mutation(() => Quiz)
	async updateQuiz(
		@Arg('id', () => Int)
		id: number,

		@Arg('name', () => String)
		name: string
	): Promise<Quiz> {
		const quiz = await Quiz.findOne(id);
		if (!quiz) {
			throw new Error('Quiz not found');
		}

		quiz.name = name;
		return await quiz.save();
	}

	@Mutation(() => Boolean)
	async deleteQuiz(
		@Arg('id', () => Int)
		id: number
	): Promise<boolean> {
		try {
			await Quiz.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
}
