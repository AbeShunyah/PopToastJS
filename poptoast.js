// PopToast Class
export default class PopToast {
  // PopToast constructor
  constructor() {
    // Create a container for the toast messages and append it to the body
    this.toastContainer = document.createElement('div');
    this.toastContainer.classList.add('toast-container');
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
      type: 'default'
    };

    // Merge the default options and the passed options
    options = { ...defaultOptions, ...options };

    // Define the icons
    const iconSVGs = {
      default: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/></svg>',
      info: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l-.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>',
      success: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"><path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>'
    }

    // Create the toast element and add appropriate classes
    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${options.type}`, `toast-${options.position}`);

    // Create the icon element and set its innerHTML to the corresponding SVG
    const iconElement = document.createElement('div');
    iconElement.classList.add('toast-icon');
    iconElement.innerHTML = iconSVGs[options.type];

    // Append the icon element to the toast
    toast.appendChild(iconElement);

    // Apply custom styles if any
    for (let [key, value] of Object.entries(options.style)) {
      toast.style[key] = value;
    }

    // Create the message element and append it to the toast
    const messageElement = document.createElement('div');
    messageElement.classList.add('toast-message');
    messageElement.textContent = message;
    toast.appendChild(messageElement);

    // If the toast is closeable, add a close button
    if (options.closeable) {
      const closeButton = document.createElement('button');
      closeButton.classList.add('toast-close');
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
      toast.classList.add('toast-show');
    }, 0);

    // Hide the toast after the specified duration
    setTimeout(() => {
      this.hide(toast);
    }, options.duration);
  }

  // Method to hide a toast message
  hide(toast) {
    // Add the 'toast-hidden' class to animate hiding
    toast.classList.remove('toast-show');
    toast.classList.add('toast-hidden');
    // Remove the toast from the DOM after the hiding animation finishes
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
}
