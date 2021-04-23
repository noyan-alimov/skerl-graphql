import { Question } from '../entities/Question';
import { Answer } from '../entities/Answer';

import { Arg, Field, InputType, Int, Mutation, Resolver } from 'type-graphql';

@InputType()
class AnswerInput {
	@Field()
	questionId: number;

	@Field()
	answer: string;

	@Field()
	isCorrect: boolean;
}

@Resolver()
export class AnswerResolver {
	@Mutation(() => Answer)
	async createAnswer(
		@Arg('input', () => AnswerInput)
		input: AnswerInput
	): Promise<Answer> {
		const question = await Question.findOne(input.questionId);
		if (!question) {
			throw new Error('Question not found');
		}

		return Answer.create({
			question,
			answer: input.answer,
			isCorrect: input.isCorrect,
		}).save();
	}

	@Mutation(() => Answer)
	async updateAnswer(
		@Arg('id', () => Int)
		id: number,

		@Arg('answer', () => String, { nullable: true })
		answer?: string,

		@Arg('isCorrect', () => Boolean, { nullable: true })
		isCorrect?: boolean
	): Promise<Answer> {
		const answerToUpdate = await Answer.findOne(id);
		if (!answerToUpdate) {
			throw new Error('Answer not found');
		}

		if (answer) {
			answerToUpdate.answer = answer;
		}

		if (isCorrect !== undefined) {
			answerToUpdate.isCorrect = isCorrect;
		}

		return await answerToUpdate.save();
	}

	@Mutation(() => Boolean)
	async deleteAnswer(
		@Arg('id', () => Int)
		id: number
	): Promise<boolean> {
		try {
			await Answer.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
}
