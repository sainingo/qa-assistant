import storage from '../../app/localStorage';

export const signIn = async (username: string, password: string) => {
  const response = {
    error: '',
  };
  if (username.trim().length !== 0 && password.trim().length !== 0) {
    const result = await fetch(`/ws/rest/v1/session`, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password),
      },
      method: 'GET',
      redirect: 'follow',
    });
    try {
      const [, body] = await Promise.all([result.headers, result.json()]);
      if (body.authenticated) {
        storage.saveInfo(body);
        localStorage.setItem('authenticated', body.authenticated);
        localStorage.setItem('auth-token', btoa(username + ':' + password));
      }
      if (!body.authenticated) {
        response.error = 'Invalid username or password';
      }
    } catch (e) {
      switch (result.status) {
        // client-side
        case 400:
          response.error = 'Bad Request';
          break;
        case 403:
          response.error = 'Unauthorized Action';
          break;
        case 404:
          response.error = 'Not Found';
          break;
        case 408:
          response.error = 'Request Timeout';
          break;
        // server-side
        case 500:
          response.error = 'Internal Server Error';
          break;
        case 503:
          response.error = 'Service is Currently Unavailable';
          break;
        case 504:
          response.error = 'Server Timeout';
          break;
        default:
          response.error = 'Network Error';
      }
    }
  } else {
    response.error = 'Please fill in the form';
  }
  return response.error;
};

export const Logout = async () => {
  try {
    await fetch('/ws/rest/v1/session', {
      method: 'DELETE',
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('auth-token'),
      },
    });
    localStorage.removeItem('userInformation');
    localStorage.removeItem('authenticated');
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
