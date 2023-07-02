export class WelcomeWindow {
  constructor() {
    this.wrap = document.createElement('div');
  }

  renderWelcomeModal() {
    const modalWrap = document.createElement('div');
    modalWrap.className = 'modal fade show';
    modalWrap.id = 'welcomeModal';
    modalWrap.dataset.bsBackdrop = 'static';
    modalWrap.dataset.bsKeyboard = 'false';

    const modal = document.createElement('div');
    modal.className = 'modal-dialog modal-dialog-centered';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = `
      <div class="modal-header">
        <h1 class="modal-title fs-5">Вкажіть інформацію про себе</h1>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="submit" form="welcomeForm" class="btn btn-primary">Відправити</button>
      </div>
    `;

    const form = document.createElement('form');
    form.id = 'welcomeForm';
    const universityFormGroup = document.createElement('div');
    universityFormGroup.className = 'form-group mb-2';

    const universityLabel = document.createElement('label');
    universityLabel.innerHTML = 'Ваш університет';
    universityLabel.htmlFor = 'university';
    universityLabel.className = 'form-label';

    const universityInput = document.createElement('input');
    universityInput.className = 'form-control mb-2';
    universityInput.placeholder = 'Введіть назву вашого університету';
    universityInput.id = 'university';
    universityInput.name = 'university';
    universityInput.required = true;
    universityInput.minLength = 3;

    modalContent.querySelector('.modal-body').appendChild(form);
    form.appendChild(universityFormGroup);
    universityFormGroup.appendChild(universityLabel);
    universityFormGroup.appendChild(universityInput);

    modal.appendChild(modalContent);
    modalWrap.appendChild(modal);

    const modalController = new bootstrap.Modal(modalWrap);
    modalController.show();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const university = e.target.elements['university'].value;
      console.log(university);

      amplitude.track('test_welcome_modal_submit', {
        university,
      });

      localStorage.setItem('welcome_modal_finished', '1');
      modalController.hide();
    });

    this.wrap.appendChild(modalWrap);
  }

  render() {
    if (!localStorage.getItem('welcome_modal_finished')) {
      this.renderWelcomeModal();
    }

    return this.wrap;
  }
}
