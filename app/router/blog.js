module.exports = app => {
  //console.log('app---', app);
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.home.index);
  router.get('/blog/getArticleList', controller.blog.home.getArticleList);
  router.get('/blog/getArticleById/:id', controller.blog.home.getArticleById);
  router.get('/blog/getListById/:id', controller.blog.home.getListById);
  router.get('/blog/getTypeInfo', controller.blog.home.getTypeInfo);
};
