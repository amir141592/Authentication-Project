import { Elysia, t } from 'elysia';

import { mongooseConnection } from './databases/mongodb.database';

import UserModel from './models/mongoose/user.model';

try {
  if (await mongooseConnection) {
    console.info('Connected to MongoDB');

    new Elysia()
      .onError(({ error }) => {
        throw new Error('something broke in elysia!🥴️', { cause: error });
      })
      .onStart(() =>
        console.info('🦊️ elysia is running on http://localhost:3000')
      )
      .get(
        '/',
        () =>
          new Response(
            `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <span style="font-size: 5rem">&#x1F98A</span>
          <h1>Hi! I'm Elysia.</h1>
        </div>
        `,
            {
              headers: [['Content-Type', 'text/html']],
            }
          )
      )
      .group('/user', (app) =>
        app
          .post(
            '/sign-up',
            async ({
              body: { firstName, lastName, email, password, phone },
            }) => {
              UserModel.create({
                firstName,
                lastName,
                email,
                password: await Bun.password.hash(password),
                phone,
              });

              return { code: '0x0001', message: 'user created', data: null };
            },
            {
              body: t.Object({
                firstName: t.String({ minLength: 2, maxLength: 24 }),
                lastName: t.String({ minLength: 2, maxLength: 32 }),
                email: t.String({
                  pattern: '^((?!.)[w-_.]*[^.])(@w+)(.w+(.w+)?[^.W])$',
                }),
                phone: t.String({
                  pattern:
                    '+(9[976]d|8[987530]d|6[987]d|5[90]d|42d|3[875]d|2[98654321]d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)d{1,14}$',
                }),
                password: t.String({
                  pattern:
                    '^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^wds:])([^s]){8,64}$',
                }),
              }),
            }
          )
          .post('/sign-in', () => {})
          .post('/profile', () => {})
      )
      .listen(3000);
  }
} catch (error) {
  throw new Error('could not run elysia', { cause: error });
}
