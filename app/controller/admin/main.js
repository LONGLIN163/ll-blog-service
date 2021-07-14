'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
    async index() {
      this.ctx.body="main";
    }

    async checkLogin() {

      let userName=this.ctx.request.body.userName;
      let password=this.ctx.request.body.password;

      let sql = "SELECT userName FROM admin_user WHERE userName='"+userName + 
                "' AND password = '"+password+"'"
  
      const res = await this.app.mysql.query(sql)
  
      if(res.length>0){
        let openId=new Date().getTime();
        //this.ctx.session.openId={"openId":openId}
        this.ctx.session.openId=openId;
        this.ctx.body={
          "data":"login success",
          "openId":openId
        }
      }else{
        this.ctx.body={
          "data":"login failed"       
        }      
      }
      console.log("session***************:"+this.ctx.session.openId)
    }

    async getTypeInfo(){
      const resType = await this.app.mysql.select('type')
      this.ctx.body={data:resType}
    }

    async addArticle(){
      let temArticle= await this.ctx.request.body;
      const result = await this.app.mysql.insert("article",temArticle)
      console.log("addArticle------>",result)

      const insertSuccess = result.affectedRows === 1; // if there is one row changed, it will be true
      const insertId = result.insertId
  
      this.ctx.body={
          isScuccess:insertSuccess,
          insertId:insertId
      }
    }

    async updateArticle(){
      let temArticle= await this.ctx.request.body;
      const result = await this.app.mysql.update("article",temArticle)
      const updateSuccess = result.affectedRows === 1; // if true
      this.ctx.body={
        isSuccess:updateSuccess
      }
    }

    async getArticleList(){
      let sql = 'SELECT article.id as id,'+
      'article.title as title,'+
      'article.introduce as introduce,'+
      'article.addTime as addTime,'+
      'article.view_count as view_count ,'+
      'type.typeName as typeName '+
      'FROM article LEFT JOIN type ON article.type_id = type.Id '+
      'ORDER BY article.id DESC'
  
      const results = await this.app.mysql.query(sql)
  
      this.ctx.body={
        data:results
      }
    }

    async delArticle(){
      let id=this.ctx.params.id;
      const res=await this.app.mysql.delete("article",{id})
      this.ctx.body={data:res}
    }

    async getArticleById() {
      let id=this.ctx.params.id;
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

}

module.exports = MainController;
