import { isEscapeKey } from './util.js';

const body = document.body;

const showErrorModal = () => {
  const modal = document.createElement('div');
  modal.id = 'errorModal';
  modal.className = 'modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  modalContent.style.backgroundColor = '#232321';
  modalContent.style.margin = '15% auto';
  modalContent.style.padding = '20px';
  modalContent.style.border = '1px solid #888';
  modalContent.style.width = '80%';

  const errorMessage = document.createElement('p');

  modalContent.appendChild(errorMessage);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  errorMessage.textContent = 'проблема доступа к серверу';
  modal.style.display = 'block';
};

const onMessageKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageClick = (evt) => {
  if (evt.target.classList.contains('success__inner') || evt.target.classList.contains('error__inner')){
    return;
  }
  closeMessage();
};

const showMessage = (message) => {
  const messageObject = message.cloneNode(1);
  messageObject.style.zIndex = 2;

  body.appendChild(messageObject);
  body.addEventListener('click', onMessageClick);
  body.addEventListener('keydown', onMessageKeyDown);
};

function closeMessage () {
  body.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onMessageKeyDown);
  body.removeChild(body.lastChild);
}

export {showErrorModal, showMessage, closeMessage};
