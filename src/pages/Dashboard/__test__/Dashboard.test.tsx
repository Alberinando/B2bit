import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Dashboard from '../Dashboard';

jest.mock('axios');

test('fetches profile data on mount and displays it', async () => {
    const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
    mockAxiosGet.mockResolvedValueOnce({
        data: {
            id: '445e138e-99c6-4055-91d1-ebc2fb6165ee',
            avatar: {
                id: 75,
                high: 'https://you-drive-homologation-bucket.s3.amazonaws…/images/30f2ade090db49d9a3dc7594a778ffa4_high.png',
                medium: 'https://you-drive-homologation-bucket.s3.amazonaws…mages/30f2ade090db49d9a3dc7594a778ffa4_medium.png',
                low: 'https://you-drive-homologation-bucket.s3.amazonaws…a/images/30f2ade090db49d9a3dc7594a778ffa4_low.png'
            },
            name: 'Cliente',
            email: 'cliente@youdrive.com',
            role: 'OWNER',
            type: 'StoreUser'
        }
    });

    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MTQ2MzQxLCJpYXQiOjE3MTYwNTk5NDEsImp0aSI6ImM3MDc4ZDg1ZDE4ZTQzN2M5OGVhOGZmZjAwMTllYTVlIiwidXNlcl9pZCI6NH0.FrHR2tnN8ZIhUwAA6SHjGZjstjo4lVFIqthTzDjU9Pc');

    const { getByLabelText } = render(<Dashboard />);

    await waitFor(() => expect(mockAxiosGet).toHaveBeenCalledWith(
        'https://api.homologation.cliqdrive.com.br/auth/profile/',
        {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2MTQ2MzQxLCJpYXQiOjE3MTYwNTk5NDEsImp0aSI6ImM3MDc4ZDg1ZDE4ZTQzN2M5OGVhOGZmZjAwMTllYTVlIiwidXNlcl9pZCI6NH0.FrHR2tnN8ZIhUwAA6SHjGZjstjo4lVFIqthTzDjU9Pc',
                'Accept': 'application/json;version=v1_web',
                'Content-Type': 'application/json'
            }
        }
    ));

    await waitFor(() => expect(getByLabelText('Your Nome')).toHaveValue('Cliente'));
    await waitFor(() => expect(getByLabelText('Your E-mail')).toHaveValue('cliente@youdrive.com'));
});

test('logs out and redirects when logout button is clicked', () => {
    const { getByText } = render(<Dashboard />);

    fireEvent.click(getByText('Logout'));

    expect(localStorage.getItem('token')).toBeNull();
    expect(window.location.pathname).toBe('/');
});
