import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Teacher } from '../entities/Teacher';
import { Quiz } from '../entities/Quiz';

@Resolver()
export class TeacherResolver {
	@Query(() => [Teacher])
	async teachers(): Promise<Teacher[]> {
		return await Teacher.find({});
	}

	@Query(() => Teacher)
	async teacher(
		@Arg('id', () => Int)
		id: number
	): Promise<Teacher> {
		const teacher = await Teacher.findOne(id);
		if (!teacher) {
			throw new Error('Teacher not found');
		}

		const quizzes = await Quiz.find({ teacher });
		teacher.quizzes = quizzes;
		return teacher;
	}

	@Query(() => Teacher)
	async teacherByName(
		@Arg('name', () => String)
		name: string
	): Promise<Teacher> {
		const teacher = await Teacher.findOne({ name });
		if (!teacher) {
			throw new Error('Teacher not found');
		}

		const quizzes = await Quiz.find({ teacher });
		teacher.quizzes = quizzes;
		return teacher;
	}

	@Mutation(() => Teacher)
	async createTeacher(
		@Arg('name', () => String)
		name: string
	): Promise<Teacher> {
		return Teacher.create({ name }).save();
	}

	@Mutation(() => Teacher)
	async updateTeacher(
		@Arg('id', () => Int)
		id: number,

		@Arg('name', () => String)
		name: string
	): Promise<Teacher> {
		const teacher = await Teacher.findOne(id);
		if (!teacher) {
			throw new Error('Quiz not found');
		}

		teacher.name = name;
		return await teacher.save();
	}

	@Mutation(() => Boolean)
	async deleteTeacher(
		@Arg('id', () => Int)
		id: number
	): Promise<boolean> {
		try {
			await Teacher.delete(id);
			return true;
		} catch (err) {
			return false;
		}
	}
}
