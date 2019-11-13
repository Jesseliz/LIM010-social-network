export const datePost = () => {
  const opt1 = {
    month: 'short', day: 'numeric', year: 'numeric',
  };
  const opt2 = {
    hour12: 'true', hour: 'numeric', minute: 'numeric',
  };
  const date = new Date().toLocaleDateString('es-Es', opt1);
  const time = new Date().toLocaleTimeString('es-Es', opt2);
  const dataTime = `${date} - ${time}`;
  return dataTime;
};

export const addPostFirebase = (notePost, selectPrivacidad, userUid, userDisplayName, imgUrl) => firebase.firestore().collection('post').add({
  notes: notePost,
  privacidad: selectPrivacidad,
  user: userUid,
  userName: userDisplayName,
  timePost: datePost(),
  img: imgUrl,
});

export const deletePostFirebase = id => firebase.firestore().collection('post').doc(id).delete();

export const editPostFirebase = (id, note, selectedPrivacidad) => firebase.firestore().collection('post').doc(id).update({
  notes: note,
  privacidad: selectedPrivacidad,
  timePost: datePost(),
});

export const showPostFirebase = callback => firebase.firestore().collection('post').where('privacidad', '==', 'publico').orderBy('timePost', 'desc')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const showPostUserFirebase = (userUid, callback) => firebase.firestore().collection('post').where('user', '==', userUid).orderBy('timePost', 'desc')
  .get()
  .then((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const uploadImage = (file) => {
  const postImageRef = firebase.storage().ref().child(`images/${file.name}`);
  return postImageRef.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL());
};
