import { PostLoadedGuard } from './post-loaded.guard';
import { PostsLoadedGuard } from './posts-loaded.guard';
import { PostCommentsLoadedGuard } from './post-comments-loaded.guard';

export const guards: any[] = [
  PostLoadedGuard,
  PostsLoadedGuard,
  PostCommentsLoadedGuard
];

export * from './post-loaded.guard';
export * from './posts-loaded.guard';
export * from './post-comments-loaded.guard';
