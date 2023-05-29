export const Logout = async () => {
  try {
    await fetch('openmrs/ws/rest/v1/session', {
      method: 'DELETE',
    });

    localStorage.removeItem('userInformation');
    localStorage.removeItem('authenticated');

    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle the error, such as displaying a toast or showing an error message to the user
  }
};
