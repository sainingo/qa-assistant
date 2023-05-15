import { render, fireEvent, cleanup } from '@testing-library/react';
import Login from './Login';
import { beforeEach, describe, afterEach, it, expect, beforeAll, afterAll } from 'vitest';
import AuthenticationResource from './AuthenticationResource';
import { act } from 'react-dom/test-utils';
import { handlers } from '../../../tests/handlers/LoginHandler.mock';
import { MemoryRouter as Router } from 'react-router-dom';
import { setupServer } from 'msw/node';

// setup the mock server handler
const server = setupServer(...handlers);

let userNameField: any;
let passwordField: any;
let loginButton: any;
const testURL = 'https://dev3.openmrs.org/openmrs/ws/rest/v1/session';
const testUser = {
  username: 'Admin',
  password: 'Admin123',
};

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  const { getByRole, getByPlaceholderText } = render(
    <Router>
      <Login />
    </Router>,
  );
  userNameField = getByPlaceholderText(/Username/i);
  passwordField = getByPlaceholderText(/Password/i);
  loginButton = getByRole('button', { name: 'Log In' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Login', () => {
  it('Should render the form inputs and submit button', () => {
    expect(userNameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('Should change form values when a user types a new entry', () => {
    fireEvent.change(userNameField, { target: { value: testUser.username } });
    fireEvent.change(passwordField, { target: { value: testUser.password } });
    expect((userNameField as HTMLInputElement).value).toBe(testUser.username);
    expect((passwordField as HTMLInputElement).value).toBe(testUser.password);
  });

  it('Should display an error message when form inputs are empty ', async () => {
    await act(async () => {
      const nullFormError = 'Please fill in the form';
      const errorMessage1 = await AuthenticationResource('', '');
      const errorMessage2 = await AuthenticationResource(testUser.username, '');
      const errorMessage3 = await AuthenticationResource('', testUser.password);
      expect(errorMessage1).toBe(nullFormError);
      expect(errorMessage2).toBe(nullFormError);
      expect(errorMessage3).toBe(nullFormError);
    });
  });

  it('Should not authenticate a user with invalid credentials', async () => {
    const response = await fetch(testURL, {
      headers: {
        Authorization: 'Basic ' + btoa('notAdmin:notAdmin123'),
      },
    });
    expect(response.status).toEqual(401);
    const responseBody = await response.json();
    expect(responseBody.authenticated).toBe(false);
  });

  it('Should authenticate a user with valid credentials', async () => {
    const response = await fetch(testURL, {
      headers: {
        Authorization: 'Basic ' + btoa(`${testUser.username}:${testUser.password}`),
      },
    });
    expect(response.status).toEqual(200);
    const responseBody = await response.json();
    expect(responseBody.authenticated).toBe(true);
  });
});
