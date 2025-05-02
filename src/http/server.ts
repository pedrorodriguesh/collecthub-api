import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { createUser } from './routes/create-user';
import { sendAuthlink } from './routes/send-auth-link';

const app = new Elysia()
	.use(
		swagger({
			documentation: {
				info: {
					title: 'CollectHub API',
					version: '1.0.0',
					description: 'API for CollectHub',
				},
			},
		}),
	)
	.use(createUser)
	.use(sendAuthlink);

app.listen(3333, () => {
	console.log('👨🏻‍💻 Server is running - http://localhost:3333/swagger');
});
