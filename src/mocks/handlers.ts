import { rest } from 'msw';
import { PRODUCTS } from 'constants/products.constant';

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
  rest.get('/api/products', (req, res, ctx) => {
    const search = req.url.searchParams.get('search') ?? '';
    const products = PRODUCTS.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    return res(
      ctx.status(200),
      ctx.json({
        items: products,
      })
    );
  }),
];
