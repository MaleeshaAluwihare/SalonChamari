import React from 'react';
import Swal from 'sweetalert2';

const MyComponent = () => {
  const showAlert = () => {
    Swal.fire({
      title: 'Hello!',
      text: 'This is a SweetAlert2 dialog!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div>
      <button onClick={showAlert}>Show Alert</button>
    </div>
  );
};

export default MyComponent;
