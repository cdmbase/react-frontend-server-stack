import { Store } from './types';


const configureDeps = (initialState: Store.State, platformDeps: Store.Deps) => ({
  ...platformDeps,
  getUid: () => platformDeps.uuid.v4(),
  now: () => Date.now(),
//   validate,
});

export default configureDeps;