import React, { useState, useEffect } from 'react'
import './articleReader.css'
import Header from '../../components/header/header'
import axios from 'axios'

import commentIcon from '../../assets/iconamoon_comment-fill.png'
import likeIcon from '../../assets/mdi_like-outline.png'
import shareIcon from '../../assets/material-symbols_share.png'


function ArticleReader() {
  const [feedArticles, setFeedArticles] = useState([])
  const [ isFeedBeenFetched, setIsFeedBeenFetched ] = useState(false)

  useEffect(()=>{
    const fetchFeed = async()=>{
      const feed = await axios.get("https://quilog-server.vercel.app/content/feed")
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
            articleId={feedItem._id}
            articleAuthor={feedItem.author} 
            articleTitle={feedItem.title} 
            articleContent={feedItem.content}
            datePosted={feedItem.datePosted}
            articleLikes={feedItem.like}
            articleComments={feedItem.comments}
            articleViews={feedItem.views}
            articleShared={feedItem.shared}
          />
        )) : null }
        </div>
      </div>
    </div>
  )
}

export default ArticleReader

function FeedItem({ articleId, articleAuthor, articleTitle, articleContent, datePosted, articleViews, articleLikes, articleComments, articleShared }) {
  const [ authorPic, setAuthorPic ] = useState("")
  const [ authorName, setAuthorName ] = useState("")
  const [ commentValue, setCommentValue ] = useState("")
  const [ isCommentSectionOpen, setIsCommentSectionOpen ] = useState(false)

  const datePostedConverted = new Date(datePosted).toUTCString()

  const handleCommentChanges = (e)=>{
    setCommentValue(e.target.value)
  }
  useEffect(()=>{
    const fetchAuthorBrief = async () => {
      const briefFetched = await axios.post("https://quilog-server.vercel.app/infos/users/userBrief", { userId: articleAuthor })
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

  const commentSubmitter = async ()=>{
    const res = await axios.post("https://quilog-server.vercel.app/content/postComment", {
      articleId: articleId, 
      content: commentValue,
      authorId: localStorage.getItem("userId")
    })
    if(res){
      alert(res.data.message)
    }else{
      alert("Error while posting the comment \n We're sorry ")
    }
  }

  return (
    <div className='feed_item'>
      <div className="feed_item_header">
        <div className='feed_item_header_pic' style={{backgroundImage:`url(${authorPic})`}}></div>
        <div className="feed_item_header_infos">
          <h2>{ articleTitle }</h2>
          <p>{ `By ${authorName}, posted on ${datePostedConverted}` }</p>
        </div>
      </div>
      <div className="feed_item_body">
        <p className='aricle_text'>{articleContent}</p>
        <div className="feed_item_stats_box">
          {/* <div className="feed_item_stats_box_item">
            <p>views</p>
            <p>{articleViews}</p>
          </div> */}
          <div className="feed_item_stats_box_item">
            <button><img src={likeIcon} alt=""/></button>
            <p>{articleLikes}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button onClick={()=>{commentSectionToggler()}}><img src={commentIcon} alt="" /></button>
            <p>{articleComments.length}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button><img src={shareIcon} alt="" /></button>
            <p>{articleShared}</p>
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
            articleComments.length === 0 ? <p>No comment yet</p> : 
            articleComments.map((commentItem) => (
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
      console.log("Fetching author brief...");
      console.log(author)
      try {
        const res = await axios.post("https://quilog-server.vercel.app/users/userBrief", { userId: author });
        console.log("Response received:", res);
        if (res && res.data) {
          console.log("Author data:", res.data);
          setCommentAuthorName(res.data.username);
          setCommentAuthorPic(res.data.profilePic);
        }
      } catch (error) {
        console.error("Error fetching author brief:", error);
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
