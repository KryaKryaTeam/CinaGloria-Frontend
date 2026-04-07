# About project

> Project name is CinaGloria, this is a front-end part. It is using React/Next.js, Typescript, InversifyJs and Mobx. Here also implemented DDD and some owr systems.

## Folder structure

```
/src
├── app
│ ├── pages
│ │ └── index.tsx
│ └──  styles
|── core
| |── domain - write domain logic here
| | |── aggregate - write application services here
| | |── entity - write entity logic here
| | |── events - events for the entities
| | └── value-object - DDD object for the entities
| |── requests
| | |── local - use this folder to write request which is not connecting with external services
| | └── network - write requests which are connecting with external services here
| |     └── NetworkRequest.ts - base request for others (abstract class)
| |── Container.ts - register for DI here using inversifyJS
| |── Container.types.ts - symbols for DI
| └── initSocket.ts - socket initializate file
|── hooks
| |── form - hooks for forms
| |── loadMachine
| |   └── useLoadMachine.hook.ts - use it to get access to LoadState
| |── notification
| |   └── useNotification.hook.ts - use it to get access to notification and some additional methods
| └── user
|     └── useMe.hook.ts - use it to get access to info about user
|── infrastructure - write local utils here
|── state
| |── LoadMachine
| |   |── LoadScope.ts - use it to group requests and observe their loading
| |   └── LoadState.ts - use it to manage scopes and loading state of whole app
| |── AuthFormsState.ts
| |── NotificationStore.ts - store for notifications
| └── UserState.ts - store for store user data
└── ui
  |── backgrounds - different backgrounds here
  |── component - small components without logic ( no shadcn )
  |── widgets - components with a logic, or builded from other components
  | ...shadcn components
```

## Architecture explanetion

UI handles with hooks to call requests or access state, requests affect on state, state call update on ui. You shouldn't do request in UI, it's bad practice.
Also we have a scope system, u registering scope in LoadState using LoadScope and after based on `http://.../app/{here}/**` it will be load it from cache or network.
If scope will be not loaded in the moment of opening a page, ui wait for fully load in layout. Global scope block whole app using `/ui/widgets/app/LoadingScreen.tsx`
