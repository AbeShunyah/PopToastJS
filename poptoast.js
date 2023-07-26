// PopToast Class
class PopToast {
  // PopToast constructor
  constructor() {
    // Create a container for the toast messages and append it to the body
    this.toastContainer = document.createElement('div');
    this.toastContainer.classList.add('pop-toast-container');
    document.body.appendChild(this.toastContainer);
  }

  // Method to show a toast message
  show(message, options = {}) {
    // Default options for the toast
    const defaultOptions = {
      duration: 3000,
      position: 'top-right',
      closeable: true,
      style: {},
      type: 'success'
    };

    // Merge the default options and the passed options
    options = { ...defaultOptions, ...options };

    // Define the icons
    const iconSVGs = {
      success: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
      info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>'
    }

    // Create the toast element and add appropriate classes
    const toast = document.createElement('div');
    toast.classList.add('pop-toast', `pop-toast-${options.type}`, `pop-toast-${options.position}`);

    // Create the icon element and set its innerHTML to the corresponding SVG
    const iconElement = document.createElement('div');
    iconElement.classList.add('pop-toast-icon');
    iconElement.innerHTML = iconSVGs[options.type];

    // Append the icon element to the toast
    toast.appendChild(iconElement);

    // Apply custom styles if any
    for (let [key, value] of Object.entries(options.style)) {
      toast.style[key] = value;
    }

    // Create the message element and append it to the toast
    const messageElement = document.createElement('div');
    messageElement.classList.add('pop-toast-message');
    messageElement.textContent = message;
    toast.appendChild(messageElement);

    // If the toast is closeable, add a close button
    if (options.closeable) {
      const closeButton = document.createElement('button');
      closeButton.classList.add('pop-toast-close');
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', () => {
        this.hide(toast);
      });
      toast.appendChild(closeButton);
    }

    // Append the toast element to the container
    this.toastContainer.appendChild(toast);

    // Animate the toast after a short delay
    setTimeout(() => {
      toast.classList.add('pop-toast-show');
    }, 0);

    // Hide the toast after the specified duration
    setTimeout(() => {
      this.hide(toast);
    }, options.duration);
  }

  // Method to hide a toast message
  hide(toast) {
    // Add the 'toast-hidden' class to animate hiding
    toast.classList.remove('pop-toast-show');
    toast.classList.add('pop-toast-hidden');
    // Remove the toast from the DOM after the hiding animation finishes
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
}

// Attach PopToast to the global window object
window.PopToast = PopToast;