export const getSession = async (): Promise<boolean> => {
  const response = await fetch('/ws/rest/v1/session', {
    method: 'GET',
    redirect: 'follow',
  });

  const userInfo = await response.json();
  console.log('userInfo', userInfo);
  const { authenticated } = userInfo;
  return authenticated;
};

export const clearSession = async () => {
  await fetch('/ws/rest/v1/session', {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('auth-token'),
    },
  }).then((data) => {
    console.log('data', data);
    if (data?.status === 204 && data?.ok === true) {
      localStorage.removeItem('userInformation');
      localStorage.removeItem('authenticated');
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }
  });
};
