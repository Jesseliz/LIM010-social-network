import MockFirebase from 'mock-cloud-firestore';
import {
  addLikeFirebase, deleteLikeFirebase, getAllLikes,
  addCommentFirebase, getAllComments, editCommentFirebase, deleteCommentFirebase,
} from '../src/model/controller-likes.js';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        a01: {
          img: '',
          notes: 'post 1',
          privacidad: 'publico',
          timePost: '1 de septiembre de 2019 - 12:32 p. m.',
          user: 'user1',
          userName: 'Jesseliz',
          __collection__: {
            likes: {
              __doc__: {
                user1: {
                  idPost: 'a01',
                  idUser: 'user1',
                  nameUser: 'Jesseliz',
                },
              },
            },
            comment: {
              __doc__: {
                c1: {
                  idPost: 'a01',
                  idUser: 'user1',
                  comment: 'Comentario 1',
                  nameUser: 'Jesseliz',
                  timePost: '31 de agosto de 2019 - 2:19 p. m.',
                },
                c2: {
                  idPost: 'a01',
                  idUser: 'user2',
                  comment: 'Comentario 2',
                  nameUser: 'Alba',
                  timePost: '31 de agosto de 2019 - 2:10 p. m.',
                },
              },
            },
          },
        },
        a02: {
          img: '',
          notes: 'post 2',
          privacidad: 'privado',
          timePost: '1 de septiembre de 2019 - 12:35 p. m.',
          user: 'user3',
          userName: 'Paola',
        },
      },
    },
  },
};


global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addLikeFirebase', () => {
  it('deberia poder agregar like a un post', done => addLikeFirebase('user3', 'Paola', 'a02')
    .then(() => {
      getAllLikes('a02', (likes) => {
        const result = likes.find(data => data.id === 'user3');
        expect(result.id).toBe('user3');
        done();
      });
    }));
});

describe('deleteLikeFirebase', () => {
  it('deberia poder quitar like a un post', done => deleteLikeFirebase('user1', 'a01')
    .then(() => {
      getAllLikes('a01', (likes) => {
        const result = likes.find(data => data.id === 'user1');
        expect(result).toBe(undefined);
        done();
      });
    }));
});

describe('addCommentFirebase', () => {
  it('deberia poder agregar un comentario a un post', done => addCommentFirebase('user3', 'Paola', 'a02', 'Primer comentario')
    .then(() => {
      getAllComments('a02', (comments) => {
        const result = comments.find(data => data.comment === 'Primer comentario');
        expect(result.comment).toBe('Primer comentario');
        done();
      });
    }));
});

describe('editCommentFirebase', () => {
  it('deberia poder editar un comentario de un post', done => editCommentFirebase('a01', 'c1', 'comentario editado')
    .then(() => {
      getAllComments('a01', (comments) => {
        const result = comments.find(data => data.comment === 'comentario editado');
        expect(result.comment).toBe('comentario editado');
        done();
      });
    }));
});

describe('deleteCommentFirebase', () => {
  it('deberia poder borrar un comentario de un post', done => deleteCommentFirebase('a01', 'c2')
    .then(() => {
      getAllComments('a01', (comments) => {
        const result = comments.find(data => data.id === 'c2');
        expect(result).toBe(undefined);
        done();
      });
    }));
});
