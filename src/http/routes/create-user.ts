import Elysia, { t } from 'elysia';
import { db } from '../..';
import { users } from '../../db/schema';

export const createUser = new Elysia().post(
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
	},
	{
		body: t.Object({
			name: t.String({
				description: 'Nome do usuário',
			}),
			email: t.String({
				description: 'Email do usuário',
			}),
		}),
		detail: {
			description: 'Cria um novo usuário',
		},
	},
);
