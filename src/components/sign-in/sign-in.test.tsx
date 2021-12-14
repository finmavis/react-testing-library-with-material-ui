import { render, screen } from 'utils/render.utils';
import userEvent from '@testing-library/user-event';

import SignIn from './sign-in';

describe('<SignIn />', () => {
  test('As a user I want to be able see the form', () => {
    render(<SignIn />);
    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const rememberMeInput = screen.getByRole('checkbox', {
      name: /remember me/i,
    });
    const signInButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(rememberMeInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  test('As a user I want to be able see the validation message when submit without filling the form', async () => {
    render(<SignIn />);
    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    userEvent.click(signInButton);

    expect(
      await screen.findByRole('textbox', {
        name: /email address/i,
      })
    ).toHaveAccessibleDescription(/Email is required/i);
    expect(passwordInput).toHaveAccessibleDescription(/Password is required/i);

    userEvent.type(emailInput, 'invalid email');
    expect(
      await screen.findByRole('textbox', {
        name: /email address/i,
      })
    ).toHaveAccessibleDescription(/Please enter a valid email/i);

    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'test@test.com');
    expect(
      await screen.findByRole('textbox', {
        name: /email address/i,
      })
    ).not.toHaveAccessibleDescription();

    userEvent.type(passwordInput, 'SUPER_SECRET_DO_NOT_TELL_ANYONE');
    expect(
      await screen.findByLabelText(/password/i)
    ).not.toHaveAccessibleDescription();
  });

  test('As a user I want to be able submit the sign-in form and see the message success sign-in', async () => {
    render(<SignIn />);
    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', {
      name: /sign in/i,
    });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'SUPER_SECRET_DO_NOT_TELL_ANYONE');
    userEvent.click(signInButton);

    expect(await screen.findByText(/welcome back!/i)).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(signInButton).toBeEnabled();
  });
});
