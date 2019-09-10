/* eslint-disable import/no-cycle */
import {
  deletePost, edit, addLike, deleteLikePost, saveComment,
} from '../controller/post-controller.js';
import { getAllComments, getAllLikes } from '../model/controller-likes.js';
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
      <span id="delete-${objNote.id}"><i class="fa fa-trash btn-delete" aria-hidden="true"></i><span>` : `<span id="delete-${objNote.id}" class="hide"><i class="fa fa-trash" aria-hidden="true"></i></span>`}
    </div>
    <div class="middle-post">
      <div class="textarea no-border padding" id="text-${objNote.id}" contentEditable="false">${objNote.notes}</div>
      ${objNote.img !== '' ? `<img class="img-post margin" src="${objNote.img}">` : ''}
      <div>
      </div>
    </div>
    <div class="botom-post padding">
      <div>
      <i class="fa fa-heart-o heart-empty hide" aria-hidden="true" id="like-${objNote.id}" data-post="${objNote.id}"></i>
      <i class="fa fa-heart heart-full" aria-hidden="true" id="dislike-${objNote.id}" data-post="${objNote.id}"></i>
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
      <span class="margin-left hide" id="save-post-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}"><i class="fa fa-floppy-o iconSave" aria-hidden="true"></i></span>
      <span class="margin-left hide" id="edit-${objNote.id}" data-note="${objNote.notes}" data-privacidad="${objNote.privacidad}"><i class="fa fa-pencil-square-o iconEdit" aria-hidden="true"></i><span>`}
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

  const counter = liElemnt.querySelector(`#counter-${objNote.id}`);


  liElemnt.querySelector(`#delete-${objNote.id}`)
    .addEventListener('click', () => deletePost(objNote.id));

  liElemnt.querySelector(`#edit-${objNote.id}`)
    .addEventListener('click', () => edit(objNote.id));

  const buttonLike = liElemnt.querySelector(`#like-${objNote.id}`);
  const buttonDislike = liElemnt.querySelector(`#dislike-${objNote.id}`);

  const callbackLikes = (likes) => {
    counter.innerHTML = '';
    counter.innerHTML = likes.length;
    const user = likes.find(like => like.id === userCurrent().uid);
    if (user === undefined) {
      buttonDislike.classList.add('hide');
      buttonLike.classList.remove('hide');
      buttonLike.addEventListener('click', (e) => {
        e.preventDefault();
        addLike(objNote.id);
        buttonDislike.classList.add('hide');
        buttonLike.classList.remove('hide');
      });
    } else {
      buttonDislike.addEventListener('click', (e) => {
        e.preventDefault();
        deleteLikePost(objNote.id);
        buttonLike.classList.add('hide');
        buttonDislike.classList.remove('hide');
      });
    }
  };

  getAllLikes(objNote.id, callbackLikes);

  liElemnt.querySelector(`#comment-${objNote.id}`)
    .addEventListener('click', () => {
      const contNote = liElemnt.querySelector(`#commentario-${objNote.id}`);
      saveComment(objNote.id);
      contNote.value = '';
    });

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
  const callbackComment = (coments) => {
    allComents.innerHTML = '';
    coments.forEach((comment) => {
      allComents.appendChild(listComment(comment));
    });
    countComent.innerHTML = coments.length;
  };
  getAllComments(objNote.id, callbackComment);
  return liElemnt;
};
