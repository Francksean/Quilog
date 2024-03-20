import { ArticleModel } from '../models/Articles.js';

export const submitArticle = async(req, res)=>{
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
  res.send({ message:" article submitted successfully !", article: newArticle})
}

export const deleteArticleById = async(req, res) =>{
  const { articleId } = req.params
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
}

export const fetchFeed = async(req, res)=>{
  const articles = await ArticleModel.find({})
  res.json({articles})
}

export const postComment = async(req, res)=>{
  const { articleId, content, authorId} = req.body
  const addComment = await ArticleModel.updateOne(
    {"_id": articleId},
    {
      $push: {
        comments:{
          author: authorId,
          datePosted: new Date(),
          commentContent: content
        }
      }
    }
  )
  if(addComment){
    res.send({ message: "comment posted successfully !"})
  }
}
export const likeArticle = async(req, res)=>{
  const { articleId, userId, value } = req.body
  const incLikes = await ArticleModel.updateOne(
    {"_id": articleId },
    {
      $inc : { like : value }
    }
  )
  if(incLikes){
    res.send({ message : "like added "})
  }
  if(value > 0 ){
    const addLikeToUSer = await UserModel.updateOne(
      { "_id": userId },
      {
        $push: { likedArticles : articleId }
      }
    )
  }else{
    const removeLikeToUSer = await UserModel.updateOne(
      { "_id": userId },
      {
        $pull: { likedArticles : articleId }
      }
    )
  }
}

