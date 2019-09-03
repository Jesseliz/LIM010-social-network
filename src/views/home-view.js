/* eslint-disable import/no-cycle */
import { savePost } from '../controller/post-controller.js';
import { listNotes } from './post-view.js';

export const home = (notes) => {
  const homeDiv = document.createElement('div');
  homeDiv.innerHTML = `
  <div id="form-save" class="div-post">
    <form id="form-publication" class="padding" maxlength=50 required>
        <textarea placeholder="¿Que quieres compartir?" id="publication" class="textarea-post"></textarea>
        <div class="flex-bottom-form">
            <div>
                <label for="fileButton" id="image"><i class="fa fa-picture-o btn-picture"
                        aria-hidden="true"></i></label>
                <input type="text" class="file-name" id="inputval" />
                <input type="file" class="hide" name="file" value="upload" id="fileButton" />
            </div>
            <select id="privacidad" class="btn-select" name="select">
                <option value="publico" selected>Público</option>
                <option value="privado">Privado</option>
            </select>
            <input type="button" id="compartir-post" class="btn-share" value="Compartir">
        </div>
    </form>
  </div>
  <section>
    <ul id="notes-list" class="ul-parent">
    </ul>
  </section>
    `;
  const ul = homeDiv.querySelector('#notes-list');
  notes.forEach((note) => {
    ul.appendChild(listNotes(note));
  });
  const btnComportirPost = homeDiv.querySelector('#compartir-post');
  const nameValue = homeDiv.querySelector('#inputval');

  btnComportirPost.addEventListener('click', savePost);

  const fileButton = homeDiv.querySelector('#fileButton');
  fileButton.addEventListener('change', () => {
    const fileValue = fileButton.files[0].name;
    nameValue.value = fileValue;
  });
  return homeDiv;
};
