import { Quiz } from '../entities/Quiz';
import { Question } from '../entities/Question';
import { Answer } from '../entities/Answer';

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
class QuestionInput {
	@Field()
	quizId: number;

	@Field()
	question: string;
}

@Resolver()
export class QuestionResolver {
	@Query(() => Question)
	async question(
		@Arg('id', () => Int)
		id: number
	): Promise<Question> {
		const question = await Question.findOne(id);
		if (!question) {
			throw new Error('Question not found');
		}

		const answers = await Answer.find({ question });
		question.answers = answers;
		return question;
	}

	@Mutation(() => Question)
	async createQuestion(
		@Arg('input', () => QuestionInput)
		input: QuestionInput
	): Promise<Question> {
		const quiz = await Quiz.findOne(input.quizId);
		if (!quiz) {
			throw new Error('Quiz not found');
		}

		return Question.create({ quiz, question: input.question }).save();
	}

	@Mutation(() => Question)
	async updateQuestion(
		@Arg('id', () => Int)
		id: number,

		@Arg('question', () => String)
		question: string
	): Promise<Question> {
		const questionToUpdate = await Question.findOne(id);
		if (!questionToUpdate) {
			throw new Error('Question not found');
		}

		questionToUpdate.question = question;
		return await questionToUpdate.save();
	}

	@Mutation(() => Boolean)
	async deleteQuestion(
		@Arg('id', () => Int)
		id: number
	): Promise<boolean> {
		try {
			await Question.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
}
