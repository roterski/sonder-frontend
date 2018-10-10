# TODO
Check code for comments with `TODO` tag

## Bugs
- newly created post is not added to the post list without reload

## Features
- comments
  - [x] create
  - [x] voting
- posts
  - filter by group
  - add groups

## Development
- add more environments (`test`, `development`, `staging`) so `DEVELOPMENT_ONLY` tags can be uncommented

## Performance
- split components into smart containers and dumb components and enable `ChangeDetectionStrategy.OnPush`
