import express from 'express'

import { ArticleModel } from '../models/Articles.js';
import { UserModel } from '../models/Users.js';


const router = express.Router()

router.post("/submit", async(req, res)=>{
  const { authorId, title, content } = req.body;
  const newArticle = await ArticleModel.create({
    author: authorId,
    title: title,
    content : content,
    datePosted : new Date(),
  })
  if(newArticle){
    const addToAuthorArticles = await UserModel.updateOne(
      { "_id":newArticle.author },
      { 
        $push: {articles: newArticle._id}
      }
      )
    }
    res.send({ message:" article submitted successfully !", aricle:newArticle})
})


router.post("/delete", async(req, res) =>{
  const { articleId } = req.body
  const article = await ArticleModel.findOne({"_id":articleId})
  if(article){
    await UserModel.updateOne(
      {"_id": article.author},
      {
        $pull: { articles: articleId }
      }
    )    
    await ArticleModel.deleteOne({ "_id":articleId })
    res.send({message : "deleted successfully !"})
  }else{
    res.send({message : "no article found "})
  }
})

router.post("/feed", async(req, res)=>{
  const articles = await ArticleModel.find({})
  res.json({articles})
})




export { router as articlesRouter }