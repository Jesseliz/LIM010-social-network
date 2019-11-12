/* eslint-disable import/no-cycle */
import { userCurrent } from '../model/controller-authentication.js';
import {
  addPostFirebase, deletePostFirebase, editPostFirebase, showPostFirebase,
  showPostUserFirebase, uploadImage,
} from '../model/controller-post.js';
import {
  addLikeFirebase, deleteLikeFirebase, addCommentFirebase, editCommentFirebase,
} from '../model/controller-likes.js';
import { home } from '../views/home-view.js';
import { myPost } from '../views/myPost-view.js';
import { modalMessage } from './home-controller.js';

export const savePost = (event) => {
  event.preventDefault();
  const notePost = document.querySelector('#publication').value;
  const selectedPrivacidad = document.querySelector('#privacidad').value;
  const fileButton = document.querySelector('#fileButton');
  const user = userCurrent();
  const userUid = user.uid;
  const userName = user.displayName;
  if (notePost !== '') {
    if (fileButton.files[0] === undefined) {
      addPostFirebase(notePost, selectedPrivacidad, userUid, userName, '')
        .then(() => {
        });
    } else {
      uploadImage(fileButton.files[0])
        .then(url => addPostFirebase(notePost, selectedPrivacidad, userUid, userName, url));
    }
  } else {
    const modalTitle = 'Error de Registro';
    const modalContent = 'Ingresé el contenido que deseé compartir';
    modalMessage(modalTitle, modalContent, '#fa5457');
  }
};

export const saveComment = (postId) => {
  const noteComment = document.querySelector(`#commentario-${postId}`).value;
  const user = userCurrent();
  const userUid = user.uid;
  const userName = user.displayName;
  if (noteComment !== '') {
    addCommentFirebase(userUid, userName, postId, noteComment)
      .then(() => {
      }).catch((error) => {
        const modalTitle = 'Error Nuevo Comentario';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent, '#a5bf48ed');
      });
  } else {
    const modalTitle = 'Error de Registro';
    const modalContent = 'Ingresé un comentario en la caja de texto';
    modalMessage(modalTitle, modalContent, '#fa5457');
  }
};

export const deletePost = (id) => {
  deletePostFirebase(id)
    .then(() => {
    }).catch((error) => {
      const modalTitle = 'Error Eliminar Publicación';
      const modalContent = `Error adding document:${error}`;
      modalMessage(modalTitle, modalContent);
    });
};

export const edit = (id) => {
  const textPost = document.querySelector(`#text-${id}`);
  const selectPrivacity = document.querySelector(`#selectPriv-${id}`);
  const botonGuardar = document.querySelector(`#edit-${id}`);
  const boton = document.querySelector(`#save-post-${id}`);

  textPost.contentEditable = true;
  selectPrivacity.disabled = false;
  textPost.focus();
  boton.classList.remove('hide');
  botonGuardar.classList.add('hide');
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    const note = textPost.innerHTML;
    const selectedPrivacidad = selectPrivacity.value;
    editPostFirebase(id, note, selectedPrivacidad)
      .then(() => {
        boton.classList.add('hide');
        botonGuardar.classList.remove('hide');
      })
      .catch((error) => {
        const modalTitle = 'Error Editar Publicación';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent);
      });
  });
};

export const editComment = (idComment, idPost) => {
  const textComment = document.querySelector(`#textcomment-${idComment}`);
  textComment.disabled = false;
  textComment.style.backgroundColor = '#fefefe';
  const boton = document.querySelector(`#savecomment-${idComment}`);
  const botonEditar = document.querySelector(`#edit-${idComment}`);

  boton.classList.remove('hide');
  botonEditar.classList.add('hide');
  boton.addEventListener('click', (e) => {
    e.preventDefault();
    textComment.style.backgroundColor = '#f2eeed';
    textComment.disabled = true;
    const note = textComment.value;
    editCommentFirebase(idPost, idComment, note)
      .then(() => {
        boton.classList.add('hide');
        botonEditar.classList.remove('hide');
      })
      .catch((error) => {
        const modalTitle = 'Error Editar Comentario';
        const modalContent = `Error adding document:${error}`;
        modalMessage(modalTitle, modalContent);
      });
  });
};

export const deleteLikePost = (postId) => {
  const user = userCurrent().uid;
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  deleteLikeFirebase(user, postId)
    .then(() => {
      buttonDislike.classList.add('hide');
      buttonLike.classList.remove('hide');
    });
};

export const addLike = (postId) => {
  const buttonLike = document.getElementById(`like-${postId}`);
  const buttonDislike = document.getElementById(`dislike-${postId}`);
  const user = userCurrent();
  const userUid = user.uid;
  const userName = user.displayName;
  addLikeFirebase(userUid, userName, postId)
    .then(() => {
      buttonDislike.classList.remove('hide');
      buttonLike.classList.add('hide');
    });
};
export const allNotes = (content) => {
  const contentPost = content.querySelector('#content-post');
  showPostFirebase((notes) => {
    contentPost.innerHTML = '';
    contentPost.appendChild(home(notes));
  });
};

export const myPostNotes = (content1) => {
  const contentPost = content1.querySelector('#content-post');
  firebase.auth().onAuthStateChanged((user) => {
    const userUid = user.uid;
    showPostUserFirebase(userUid, (myPostnotes) => {
      contentPost.innerHTML = '';
      contentPost.appendChild(myPost(myPostnotes));
    });
  });
};
