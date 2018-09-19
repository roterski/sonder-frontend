export interface Vote {
  targetClass: 'posts' | 'comments';
  targetId: number;
  voted: -1 | 0 | 1;
}
