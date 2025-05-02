import { swagger } from '@elysiajs/swagger';
import { Elysia, t } from 'elysia';
import { db } from '..';
import { users } from '../db/schema';

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: 'CollectHub API',
					description: 'API for CollectHub',
					version: '1.0.0',
				},
			},
		}),
	)
	.post(
		'/users',
		async ({ body, set }) => {
			const { name, email } = body;

			const [user] = await db
				.insert(users)
				.values({
					name,
					email,
				})
				.returning({
					id: users.id,
				});

			set.status = 204;

			return {
				user,
			};
		},
		{
			body: t.Object({
				name: t.String(),
				email: t.String(),
			}),
		},
	);

app.listen(3333, () => {
	console.log('👨🏻‍💻 Server is running');
});
