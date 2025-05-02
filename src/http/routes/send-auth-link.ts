import { createId } from '@paralleldrive/cuid2';
import Elysia, { t } from 'elysia';
import { db } from '../..';
import { authLinks } from '../../db/schema';
import { env } from '../../env';

export const sendAuthlink = new Elysia().post(
	'/authenticate',
	async ({ body, set }) => {
		const { email } = body;

		const userFromEmail = await db.query.users.findFirst({
			where(fields, operators) {
				return operators.eq(fields.email, email);
			},
		});

		if (!userFromEmail) {
			throw new Error('User not found');
		}

		const authLinkCode = createId();

		await db.insert(authLinks).values({
			userId: userFromEmail.id,
			code: authLinkCode,
		});

		// send email

		const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL);
		authLink.searchParams.set('code', authLinkCode);
		authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL);

		console.log(authLink.toString());

		set.status = 200;
		return { message: 'Auth link sent' };
	},
	{
		body: t.Object({
			email: t.String({ format: 'email' }),
		}),
	},
);
