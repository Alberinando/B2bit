global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    href: jest.fn()
  }
});

import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../Login';

jest.mock('axios');

test('submits form and calls axios post', async () => {
  const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
  mockAxiosPost.mockResolvedValueOnce({ data: { tokens: { access: 'test-token' } } });

  const { getByLabelText, getByText } = render(<Login />);

  fireEvent.input(getByLabelText('E-mail'), { target: { value: 'cliente@youdrive.com' } });
  fireEvent.input(getByLabelText('Senha'), { target: { value: 'password' } });

  fireEvent.click(getByText('Sign In'));

  await waitFor(() => expect(mockAxiosPost).toHaveBeenCalledWith(
    'https://api.homologation.cliqdrive.com.br/auth/login/',
    { email: 'cliente@youdrive.com', password: 'password' },
    {
      headers: {
        'Accept': 'application/json; version=v1_web',
        'Content-Type': 'application/json'
      }
    }
  ));
});
