/* eslint-disable*/
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body="haha";
  }

  // Api-home page
  async getArticleList() {
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.addTime as addTime,'+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id'

    const results = await this.app.mysql.query(sql)

    this.ctx.body={
    data:results
    }
  }

  // Api-detailed page
  async getArticleById() {
    let id=this.ctx.params.id;
    console.log("id*********",id)
    let sql='SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content ,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+ 
    'WHERE article.id='+id
    
    const results=await this.app.mysql.query(sql);
    this.ctx.body={data:results};
  }

  // Api-heade nav info
  async getTypeInfo() {
    const results=await this.app.mysql.select("type");
    this.ctx.body={data:results};
  }

  // Api-get article list by article type
  async getListById(){
    // console.log("getListById---this.ctx---",this.ctx)
    let id=this.ctx.params.id;
    console.log("getListById---id---",id)

    let sql='SELECT article.id as id ,'+
    'article.title as title ,'+
    'article.introduce as introduce ,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime ,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id=type.Id '+
    'WHERE type_id='+id
    const results=await this.app.mysql.query(sql);
    this.ctx.body={data:results};
  }
}

module.exports = HomeController;
