import React, { useState, useEffect } from 'react'
import './articleReader.css'
import Header from '../../components/header/header'
import axios from 'axios'
import { useUser } from '../../components/context/userDatasContext'


import commentIcon from '../../assets/iconamoon_comment-fill.png'
import likeIconBase from '../../assets/like_button_off.png'
import likeIconActive from '../../assets/like_button_active.png'
import shareIcon from '../../assets/material-symbols_share.png'


function ArticleReader() {
  const [feedArticles, setFeedArticles] = useState([])
  const [ isFeedBeenFetched, setIsFeedBeenFetched ] = useState(false)

  useEffect(()=>{
    const fetchFeed = async()=>{
      const feed = await axios.get("https://quilog-server.vercel.app/articles/feed")
      setFeedArticles(feed.data.articles)
    }
    fetchFeed()
  }, [])
  
  useEffect(() => {
    setIsFeedBeenFetched(true)
  }, [feedArticles]);
  
  return (
    <div className='article_reader'>
      <Header/>
      <div className="article_reader_body">
        <h1>Feed</h1>
        <div className='feed_items_container'>
        {isFeedBeenFetched ? feedArticles.map((feedItem) => (
          <FeedItem 
            key={feedItem._id}
            articleItem={feedItem}
          />
        )) : null }
        </div>
      </div>
    </div>
  )
}

export default ArticleReader


















function FeedItem({ articleItem }) {
  const{ user } = useUser()

  const [ authorPic, setAuthorPic ] = useState("")
  const [ authorName, setAuthorName ] = useState("")
  const [ commentValue, setCommentValue ] = useState("")
  const [ isCommentSectionOpen, setIsCommentSectionOpen ] = useState(false)
  const [ likeIcon, setLikeIcon ] = useState(likeIconBase)
  const [ articleLikes, setArticleLikes ] = useState(articleItem.like)

  
  
  const datePostedConverted = new Date(articleItem.datePosted).toUTCString()
  
  const handleCommentChanges = (e)=>{
    setCommentValue(e.target.value)
  }
  useEffect(()=>{
    if(user.likedArticles.includes(articleItem._id)){
      setLikeIcon(likeIconActive)
    }
    const fetchAuthorBrief = async () => {
      const briefFetched = await axios.post(`https://quilog-server.vercel.app/infos/users/getUserBrief/${articleItem.author}`)
      if(briefFetched){
        setAuthorPic( briefFetched.data.profilePic )
        setAuthorName( briefFetched.data.username)
      }
    }
    fetchAuthorBrief()
  }, [])

  const commentSectionToggler = ()=>{
    if(isCommentSectionOpen){
      setIsCommentSectionOpen(false)
    }else{
      setIsCommentSectionOpen(true)
    }
  }

  const likeHandler = async()=>{
    if(likeIcon == likeIconBase){
      setLikeIcon(likeIconActive)
      setArticleLikes(articleLikes + 1)
      const likeSender = await axios.post("http://localhost:3000/articles/likeArticle",
      { 
        articleId: articleItem._id,
        userId: localStorage.getItem("userId"),
        value: 1
      }
      )
    }else{
      setLikeIcon(likeIconBase)
      setArticleLikes(articleLikes - 1)
      const likeSender = await axios.post("http://localhost:3000/articles/likeArticle",
      { 
        articleId: articleItem._id,
        userId: localStorage.getItem("userId"),
        value: -1
      })
    }
  }

  const commentSubmitter = async ()=>{
    if(commentValue != ""){
      const res = await axios.post("https://quilog-server.vercel.app/articles/postComment", {
        articleId: articleItem._id, 
        content: commentValue,
        authorId: localStorage.getItem("userId")
      })
      if(res){
        alert(res.data.message)
      }else{
        alert("Error while posting the comment \n We're sorry ")
      }
    }else{
      alert("votre commentaire est vide")
    }
    setCommentValue("")
  }

  return (
    <div className='feed_item'>
      <div className="feed_item_header">
        <div className='feed_item_header_pic' style={{backgroundImage:`url(${authorPic})`}}></div>
        <div className="feed_item_header_infos">
          <h2>{ articleItem.title }</h2>
          <p>{ `By ${authorName}, posted on ${datePostedConverted}` }</p>
        </div>
      </div>
      <div className="feed_item_body">
        <p className='aricle_text'>{articleItem.content}</p>
        <div className="feed_item_stats_box">
          {/* <div className="feed_item_stats_box_item">
            <p>views</p>
            <p>{articleViews}</p>
          </div> */}
          <div className="feed_item_stats_box_item">
            <button onClick={()=>{likeHandler()}}><img src={likeIcon} alt=""/></button>
            <p>{articleLikes}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button onClick={()=>{commentSectionToggler()}}><img src={commentIcon} alt="" /></button>
            <p>{articleItem.comments.length}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button><img src={shareIcon} alt="" /></button>
            <p>{articleItem.shared}</p>
          </div>
        </div>
      </div>
      {isCommentSectionOpen ? 
        <div className="comment_section_container">
          <div className="input_submitter">
            <input type="text" placeholder='Write your comment here...' value={commentValue} onChange={(e)=>handleCommentChanges(e)} />
            <button onClick={()=>{commentSubmitter()}}>send</button>
          </div>
          <div className="comment_container">
          { 
            articleItem.comments.length === 0 ? <p>No comment yet</p> : 
            articleItem.comments.map((commentItem) => (
              <CommentItemElement key={commentItem._id} author={commentItem.author} commentText={commentItem.commentContent} datePosted={commentItem.datePosted} />
            ))
          }

          </div>
        </div> : null
      }

    </div>
  )
}


















function CommentItemElement ({author, commentText, datePosted}) {
  const [ commentAuthorPic, setCommentAuthorPic ] = useState('')
  const [ commentAuthorName, setCommentAuthorName ] = useState('')
  useEffect(() => {
    const fetchBrief = async () => {
      const res = await axios.post(`https://quilog-server.vercel.app/infos/users/getUserBrief/${author}`);
      if (res) {
        setCommentAuthorName(res.data.username);
        setCommentAuthorPic(res.data.profilePic);
      }
    };
  
    fetchBrief();
  }, []);
  
  return (
    <div className='comment_item'>
      <div className="comment_item_img">
        <img src={commentAuthorPic} alt="" />
      </div>
      <div className="comment_body">
        <p>{commentAuthorName}</p>
        <p>{ `${commentText} | on ${new Date(datePosted).toUTCString()}`}</p>
      </div>
    </div>
  )
}
