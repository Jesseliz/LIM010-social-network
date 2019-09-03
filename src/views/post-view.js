/* eslint-disable import/no-cycle */
import {
  deletePost, edit, addLike, deleteLikePost, showLikePost, saveComment,
} from '../controller/post-controller.js';
import { getAllComments } from '../model/controller-likes.js';
import { userCurrent } from '../model/controller-authentication.js';
import { listComment } from './comment-view.js';

export const listNotes = (objNote) => {
  const liElemnt = document.createElement('li');
  liElemnt.classList.add('li-child');
  liElemnt.innerHTML = `
  <div class="div-post">
    <div class="user-publicated padding flex-name-post">
      <div class="only-flex">
        <div>
          <p>${objNote.userName} </p>
          <select id="selectPriv-${objNote.id}" class="btn-select" name="select" disabled>
            ${objNote.privacidad === 'privado' ? `<option value="privado" selected>Privado</option>
            <option value="publico">Público</option>` : `<option value="privado">Privado</option>
            <option value="publico" selected>Público</option> `}
          </select>
        </div>
        <p class="date-publication">${objNote.timePost}</p>
      </div>
      ${userCurrent().uid === objNote.user ? `
      <span><i class="fa fa-trash btn-delete" id="delete-${objNote.id}" aria-hidden="true"></i><span>` : `<span class="hide"><i class="fa fa-trash" id="delete-${objNote.id}" aria-hidden="true"></i></span>`}
    </div>
    <div class="middle-post">
      <textarea class="textarea no-border margin padding" id="text-${objNote.id}" disabled>${objNote.notes}</textarea>
      ${objNote.img !== '' ? `<img class="img-post" src="${objNote.img}">` : ''}
    </div>
    <div class="botom-post padding">
      <div>
        <i class="fa fa-heart-o heart-empty" aria-hidden="true" id="like-${objNote.id}" data-post="${objNote.id}"></i>
        <i class="fa fa-heart hide heart-full" aria-hidden="true" id="dislike-${objNote.id}" data-post="${objNote.id}"></i>
        <a id="counter-${objNote.id}" class="counter-heart"></a>
      </div>
      <div>
        <span id="show-comment"><i class="fa fa-comment-o show-comment" aria-hidden="true"></i></span>
        <a id="commentsCount-${objNote.id}" class="counter-heart"></a>
      </div>
      ${userCurrent().uid === objNote.user ? `
      <span class="margin-left hide" id="save-post-${objNote.id}" data-note="${objNote.notes}"
        data-privacidad="${objNote.privacidad}"><i class="fa fa-floppy-o iconSave" aria-hidden="true"></i></span>
      <span class="margin-left" id="edit-${objNote.id}" data-note="${objNote.notes}"
       data-privacidad="${objNote.privacidad}"><i class="fa fa-pencil-square-o iconEdit" aria-hidden="true"></i><span>
      ` : `
      <span class="margin-left hide" id="save-post-${objNote.id}" data-note="${objNote.notes}"
        data-privacidad="${objNote.privacidad}"><i class="fa fa-floppy-o iconSave" aria-hidden="true"></i></span>
      <span class="margin-left hide" id="edit-${objNote.id}" data-note="${objNote.notes}"
        data-privacidad="${objNote.privacidad}"><i class="fa fa-pencil-square-o iconEdit" aria-hidden="true"></i><span>`}
    </div>
    <div id="comments-section" class="hide">
      <form id="form-publication" maxlength=50 class="form-comment" required>
        <textarea placeholder="Escribe tu comentario" id="commentario-${objNote.id}" class="textarea-comment"></textarea>
        <span id="comment-${objNote.id}" data-post="${objNote.id}" class="margin"><i class="fa fa-paper-plane btn-comment" aria-hidden="true"></i></span>
      </form>
      <section id="allComments-${objNote.id}"></section>
    </div>
  </div>
`;
  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deletePost(objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => edit(objNote.id));

  liElemnt.querySelector(`#like-${objNote.id}`)
    .addEventListener('click', () => addLike(objNote.id));

  liElemnt.querySelector(`#dislike-${objNote.id}`)
    .addEventListener('click', () => deleteLikePost(objNote.id));

  liElemnt.querySelector(`#comment-${objNote.id}`)
    .addEventListener('click', () => {
      const contNote = liElemnt.querySelector(`#commentario-${objNote.id}`);
      saveComment(objNote.id);
      contNote.value = '';
    });

  showLikePost(liElemnt, objNote.id);

  const allComents = liElemnt.querySelector(`#allComments-${objNote.id}`);
  const showComment = liElemnt.querySelector('#show-comment');
  const commentSection = liElemnt.querySelector('#comments-section');
  const countComent = liElemnt.querySelector(`#commentsCount-${objNote.id}`);
  showComment.addEventListener('click', () => {
    if (commentSection.className === 'hide') {
      commentSection.classList.remove('hide');
    } else {
      commentSection.classList.add('hide');
    }
  });

  getAllComments(objNote.id, (coments) => {
    allComents.innerHTML = '';
    coments.forEach((comment) => {
      allComents.appendChild(listComment(comment));
    });
    countComent.innerHTML = coments.length;
  });
  return liElemnt;
};
