/**
 * NodeJS GLOBAL type extension
 * This is used for adding Jest globals,
 * so that our *.unit/int.test.ts can pickup on the globals
 *
 * @author ale8k
 */
declare namespace NodeJS {
    interface Global {
        /** Redis URI (we avoid URL to allow changing our protocol whenever we like) */
        __REDIS_URI__: string;
    }
}
