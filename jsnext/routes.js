export default [
    {
        path: '/',
        name: 'index',
        component: (resolve, reject) => import('./index.js').then(resolve).catch(reject)
    },
    {
        path: '/posts',
        name: 'posts',
        component: (resolve, reject) => import('./posts.js').then(resolve).catch(reject)
    },
    {
        path: '/archive/:id',
        name: 'archive',
        component: (resolve, reject) => import('./archive.js').then(resolve).catch(reject)
    }
];
