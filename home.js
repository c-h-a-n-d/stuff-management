// Check if the dashboard page is already open
if (window.location.href.indexOf('/dashboard') !== -1) {
    // Redirect to the existing dashboard page
    window.location.href = '/dashboard';
  } else {
    // Open the dashboard page in a new tab
    window.open('/dashboard', '_blank');
  }