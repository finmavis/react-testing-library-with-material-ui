import { render, screen } from 'utils/render.utils';
import userEvent from '@testing-library/user-event';

import AutocompleteProduct from '../autocomplete-product';

describe('<AutocompleteProduct />', () => {
  test('As a user I want to be able see the autocomplete product input', async () => {
    render(<AutocompleteProduct />);

    const productInput = screen.getByRole('textbox', {
      name: /product/i,
    });
    userEvent.type(productInput, 'men');

    const selectedOption = await screen.findByRole('option', {
      name: /^mens cotton jacket$/i,
    });
    // Or using findByText
    // const selectedOption = await screen.findByText(/^mens cotton jacket$/i)

    userEvent.click(selectedOption);

    expect(productInput).toHaveValue('Mens Cotton Jacket');
    expect(screen.getByText(/name:/i)).toHaveTextContent(
      'Name: Mens Cotton Jacket'
    );
    expect(screen.getByText(/description:/i)).toHaveTextContent(
      'Description: great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.'
    );
    expect(screen.getByText(/category:/i)).toHaveTextContent(
      `Category: men's clothing`
    );
    expect(screen.getByText(/price:/i)).toHaveTextContent('Price: 55.99');
    expect(screen.getByText(/rating:/i)).toHaveTextContent('Rating: 4.7');

    userEvent.click(screen.getByTestId('CloseIcon'));

    expect(productInput).toHaveValue('');
    expect(screen.getByText(/name:/i)).toHaveTextContent('Name: -');
    expect(screen.getByText(/description:/i)).toHaveTextContent(
      'Description: -'
    );
    expect(screen.getByText(/category:/i)).toHaveTextContent(`Category: -`);
    expect(screen.getByText(/price:/i)).toHaveTextContent('Price: -');
    expect(screen.getByText(/rating:/i)).toHaveTextContent('Rating: -');
  });
});
