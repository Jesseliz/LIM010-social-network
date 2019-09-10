import { datePost } from './controller-post.js';

export const addLikeFirebase = (userUid, userName, postId) => firebase.firestore().collection('post').doc(postId).collection('likes')
  .doc(userUid)
  .set({
    idUser: userUid,
    nameUser: userName,
    idPost: postId,
  });

export const getAllLikes = (idPost, callback) => {
  firebase.firestore().collection('post').doc(idPost).collection('likes')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};

export const deleteLikeFirebase = (user, postId) => firebase.firestore().collection('post').doc(postId).collection('likes')
  .doc(user)
  .delete();

/* export const showLikeFirebase = idPost => firebase.firestore().collection('post')
.doc(idPost).collection('likes'); */

export const addCommentFirebase = (userUid, userName, postId, text) => firebase.firestore().collection('post').doc(postId).collection('comment')
  .add({
    idUser: userUid,
    nameUser: userName,
    comment: text,
    idPost: postId,
    timePost: datePost(),
  });

export const deleteCommentFirebase = (idPost, idComment) => firebase.firestore().collection('post').doc(idPost).collection('comment')
  .doc(idComment)
  .delete();

export const editCommentFirebase = (idPost, idComment, commentEdit) => firebase.firestore().collection('post').doc(idPost).collection('comment')
  .doc(idComment)
  .update({
    comment: commentEdit,
    timePost: datePost(),
  });

export const getAllComments = (idPost, callback) => {
  firebase.firestore().collection('post').doc(idPost).collection('comment')
    .orderBy('timePost', 'desc')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};
