/**
 * These are useful DI module that works great with rebox-client and rebox-server.
 * You DON't HAVE to use them. You could just create your own modules in your project using rebox.
 * It is highly recommended to use them with rebox-client and rebox-server
 */

export { default as commonModule, contextModuleFactory, lifecycleModuleFactory } from './common';
export { default as clentModule } from './client';
export { default as serverModule } from './server';
