import { reducer } from './posts.reducer';
import { Comment, Author } from '../models';
import { initialState, PostsState } from './posts.interfaces';
import { PostsActionTypes } from './posts.actions';

describe('Posts Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('PostCommentsLoaded', () => {
    describe('when initial post comments were empty', () => {
      let actual, comments;
      let state: PostsState;
      const postId = 7;
      let payload: { comments: Comment[], postId: number };
      beforeEach(() => {
        state = initialState;
        const author: Author = { id: 1, username: 'author_name' };
        comments = [
          {
            id: 1,
            body: 'hello',
            author: author,
            parentIds: [],
            points: 0,
            voted: 0
          },
          {
            id: 2,
            body: 'there',
            author: author,
            parentIds: [1],
            points: 0,
            voted: 0
          }
        ];

        payload = {
          postId: postId,
          comments: comments
        };

        actual = reducer(state, { type: PostsActionTypes.PostCommentsLoaded, payload });
      });

      it('adds comment entities with children', () => {
        expect(actual.comments.ids).toEqual([1, 2]);
        expect(actual.comments.entities).toEqual(
          {
            1: {...comments[0], ...{ childrenIds: [2] } },
            2: comments[1]
          }
        );
      });

      it('adds to commentsByPost', () => {
        expect(actual.commentsByPost).toEqual({
          [postId]: {
            ids: [1, 2],
            loaded: true
          }
        });
      });
    });
  });
});
