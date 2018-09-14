import { PostLoadedGuard } from './post-loaded.guard';
import { PostsLoadedGuard } from './posts-loaded.guard';

export const guards: any[] = [
  PostLoadedGuard,
  PostsLoadedGuard
];

export * from './post-loaded.guard';
export * from './posts-loaded.guard';
