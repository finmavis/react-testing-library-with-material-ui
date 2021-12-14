import userEvent from '@testing-library/user-event';

import { render, screen, within } from 'utils/render.utils';

import SignUp from './sign-up';

describe('<SignUp />', () => {
  test('As a user I want to be able see the sign-up form', () => {
    render(<SignUp />);

    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const genderInput = screen.getByRole('button', {
      name: /gender/i,
    });
    const watchVideoTimeframeInput = screen.getByRole('radiogroup', {
      name: /watch video timeframe/i,
    });
    const termsAndConditionInput = screen.getByRole('checkbox', {
      name: /i agree to the terms and conditions/i,
    });
    const emailSubscriptionInput = screen.getByRole('checkbox', {
      name: /yes, please use e-mail to send me information about other offerings/i,
    });
    const signupButton = screen.getByRole('button', {
      name: /sign up/i,
    });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(genderInput).toBeInTheDocument();
    expect(watchVideoTimeframeInput).toBeInTheDocument();
    expect(termsAndConditionInput).toBeInTheDocument();
    expect(emailSubscriptionInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });

  test('As a user I want to be able see the validation message when submit without filling the sign-up form', async () => {
    render(<SignUp />);

    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const genderInput = screen.getByRole('button', {
      name: /gender/i,
    });
    const watchVideoTimeframeInput = screen.getByRole('radiogroup', {
      name: /watch video timeframe/i,
    });
    const termsAndConditionInput = screen.getByRole('checkbox', {
      name: /i agree to the terms and conditions/i,
    });
    const signupButton = screen.getByRole('button', {
      name: /sign up/i,
    });

    userEvent.click(signupButton);

    expect(
      await screen.findByRole('textbox', { name: /first name/i })
    ).toHaveAccessibleDescription(/Firstname is required/i);
    expect(lastNameInput).toHaveAccessibleDescription(/Lastname is required/i);
    expect(emailInput).toHaveAccessibleDescription(/Email is required/i);
    expect(passwordInput).toHaveAccessibleDescription(/Password is required/i);
    expect(confirmPasswordInput).toHaveAccessibleDescription(
      /Confirm Password is required/i
    );
    expect(genderInput).toHaveAccessibleDescription(/Gender is required/i);
    expect(watchVideoTimeframeInput).toHaveAccessibleDescription(
      /Please select an option/i
    );
    expect(termsAndConditionInput).toHaveAccessibleDescription(
      /You must agree with terms and conditions/i
    );

    userEvent.type(firstNameInput, 'John');
    expect(
      await screen.findByRole('textbox', { name: /first name/i })
    ).not.toHaveAccessibleDescription();

    userEvent.type(lastNameInput, 'Maverick');
    expect(
      await screen.findByRole('textbox', { name: /last name/i })
    ).not.toHaveAccessibleDescription();

    userEvent.type(emailInput, 'Invalid Email');
    expect(
      await screen.findByRole('textbox', { name: /email/i })
    ).toHaveAccessibleDescription(/Please enter a valid email/i);

    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'test@test.com');
    expect(
      await screen.findByRole('textbox', { name: /email/i })
    ).not.toHaveAccessibleDescription();

    userEvent.type(passwordInput, 'SECRET');
    expect(
      await screen.findByLabelText(/^password$/i)
    ).toHaveAccessibleDescription(/Password must be at least 8 characters/i);

    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, 'SUPER_SECRET_DO_NOT_TELL_ANYONE');
    expect(
      await screen.findByLabelText(/^password$/i)
    ).not.toHaveAccessibleDescription();

    userEvent.type(confirmPasswordInput, 'SUPER');
    expect(
      await screen.findByLabelText(/confirm password/i)
    ).toHaveAccessibleDescription(/Passwords must match/i);

    userEvent.clear(confirmPasswordInput);
    userEvent.type(confirmPasswordInput, 'SUPER_SECRET_DO_NOT_TELL_ANYONE');
    expect(
      await screen.findByLabelText(/confirm password/i)
    ).not.toHaveAccessibleDescription();

    userEvent.click(genderInput);
    userEvent.click(await screen.findByText(/helicopter/i));
    // OR use getByRole
    // userEvent.click(
    //   screen.getByRole('option', {
    //     name: /helicopter/i,
    //   })
    // );
    expect(
      await screen.findByRole('button', {
        name: /gender/i,
      })
    ).toHaveAccessibleDescription(/are you serious/i);

    userEvent.click(genderInput);
    userEvent.click(await screen.findByText(/female/i));
    expect(
      await screen.findByRole('button', {
        name: /gender/i,
      })
    ).not.toHaveAccessibleDescription();

    userEvent.click(within(watchVideoTimeframeInput).getByText(/weekly/i));
    expect(
      await screen.findByRole('radiogroup', {
        name: /watch video timeframe/i,
      })
    ).not.toHaveAccessibleDescription();

    userEvent.click(termsAndConditionInput);
    expect(
      await screen.findByRole('checkbox', {
        name: /i agree to the terms and conditions/i,
      })
    ).toBeChecked();
    expect(
      await screen.findByRole('checkbox', {
        name: /i agree to the terms and conditions/i,
      })
    ).not.toHaveAccessibleDescription();
  });

  test('As a user I want to be able submit the sign-up form and see the success message', async () => {
    render(<SignUp />);

    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    });
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    });
    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const genderInput = screen.getByRole('button', {
      name: /gender/i,
    });
    const watchVideoTimeframeInput = screen.getByRole('radiogroup', {
      name: /watch video timeframe/i,
    });
    const termsAndConditionInput = screen.getByRole('checkbox', {
      name: /i agree to the terms and conditions/i,
    });
    const signupButton = screen.getByRole('button', {
      name: /sign up/i,
    });

    userEvent.type(firstNameInput, 'John');
    userEvent.type(lastNameInput, 'Maverick');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'SUPER_SECRET_DO_NOT_TELL_ANYONE');
    userEvent.type(confirmPasswordInput, 'SUPER_SECRET_DO_NOT_TELL_ANYONE');
    userEvent.click(genderInput);
    userEvent.click(await screen.findByText(/female/i));
    userEvent.click(within(watchVideoTimeframeInput).getByText(/weekly/i));
    userEvent.click(termsAndConditionInput);

    userEvent.click(signupButton);

    expect(await screen.findByText(/Welcome!/i)).toBeInTheDocument();
    expect(firstNameInput).toHaveValue('');
    expect(lastNameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
    // expect(
    //   screen.getByRole('button', {
    //     name: /gender/i,
    //   })
    // ).toHaveValue('');
    // expect(
    //   screen.getByRole('radiogroup', {
    //     name: /watch video timeframe/i,
    //   })
    // ).toHaveValue('');
    expect(termsAndConditionInput).not.toBeChecked();
  });
});
