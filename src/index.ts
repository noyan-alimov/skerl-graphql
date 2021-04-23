import { createConnection } from 'typeorm';
import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { TeacherResolver } from './resolvers/teacher';
import { QuizResolver } from './resolvers/Quiz';
import { QuestionResolver } from './resolvers/question';
import { AnswerResolver } from './resolvers/answer';
import { Teacher } from './entities/Teacher';
import { Quiz } from './entities/Quiz';
import { Question } from './entities/Question';
import { Answer } from './entities/Answer';

const main = async (): Promise<void> => {
	await createConnection({
		type: 'postgres',
		database: 'skerl',
		username: 'postgres',
		password: 'password',
		synchronize: true,
		logging: true,
		entities: [Teacher, Quiz, Question, Answer],
		migrations: [path.join(__dirname, './migrations/*')],
		cli: {
			migrationsDir: 'migrations',
		},
	});

	const app = express();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				TeacherResolver,
				QuizResolver,
				QuestionResolver,
				AnswerResolver,
			],
			validate: false,
		}),
	});

	apolloServer.applyMiddleware({
		app,
		cors: { origin: 'http://localhost:8100', credentials: true },
	});

	app.listen(8000, () => {
		console.log('Server running on port 8000');
	});
};

main();
