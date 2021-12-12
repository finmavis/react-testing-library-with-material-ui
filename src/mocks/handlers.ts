import { rest } from 'msw';

interface LoginBody {
  email: string;
  password: string;
  keepSignedIn: boolean;
}
interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  experience: string;
}

export const handlers = [
  rest.post<LoginBody>('/api/login', (req, res, ctx) => {
    const { email, keepSignedIn } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        email,
        keepSignedIn,
        firstName: 'John',
        lastName: 'Maverick',
      })
    );
  }),
  rest.post<RegisterBody>('/api/register', (req, res, ctx) => {
    const { firstName, lastName, email, gender, experience } = req.body;

    return res(
      ctx.status(200),
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        firstName,
        lastName,
        email,
        gender,
        experience,
      })
    );
  }),
];
