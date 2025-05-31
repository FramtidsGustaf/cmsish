import { Hono } from 'hono';
import { createPage, deletePage, getAllPages, getPageById, updatePage } from './controllers/pages';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from './controllers/posts';
import { createBlock, deleteBlock, getBlocksByPageId, updateBlock } from './controllers/blocks';

const adminApiRoute = new Hono().basePath('/api');

// PAGES
adminApiRoute.get('/pages', getAllPages);
adminApiRoute.get('/page/:pageId', getPageById);
adminApiRoute.post('/page', createPage);
adminApiRoute.put('/page', updatePage);
adminApiRoute.delete('/page', deletePage);

// POSTS
adminApiRoute.get('/posts', getAllPosts);
adminApiRoute.get('/post/:postId', getPostById);
adminApiRoute.post('/post', createPost);
adminApiRoute.put('/post', updatePost);
adminApiRoute.delete('/post', deletePost);

// BLOCKS
adminApiRoute.get('/blocks', getBlocksByPageId);
adminApiRoute.post('/block', createBlock);
adminApiRoute.put('/block', updateBlock);
adminApiRoute.delete('/block', deleteBlock);
