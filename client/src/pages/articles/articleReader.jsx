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
    console.log("feed fetched ok ok")
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

function FeedItem({ articleAuthor, articleTitle, articleContent, datePosted, articleViews, articleLikes, articleComments, articleShared }) {
  const [ authorPic, setAuthorPic ] = useState("")
  const [ authorName, setAuthorName ] = useState("")
  const [ commentValue, setCommentValue ] = useState("")

  const datePostedConverted = new Date(datePosted).toUTCString()

  const handleCommentChanges = (e)=>{
    setCommentValue(e.target.value)
  }
  useEffect(()=>{
    const fetchAuthorBrief = async () => {
      const briefFetched = await axios.post("http://localhost:3000/infos/users/userBrief", { userId: articleAuthor })
      if(briefFetched){
        setAuthorPic( briefFetched.data.profilePic )
        setAuthorName( briefFetched.data.username)
      }
    }
    fetchAuthorBrief()
    console.log("feed_item_breif ok ok")
  }, [])
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
          <div className="feed_item_stats_box_item">
            <p>views</p>
            <p>{articleViews}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button><img src={likeIcon} alt=""/></button>
            <p>{articleLikes}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button><img src={commentIcon} alt="" /></button>
            <p>{articleComments.length}</p>
          </div>
          <div className="feed_item_stats_box_item">
            <button><img src={shareIcon} alt="" /></button>
            <p>{articleShared}</p>
          </div>
        </div>
      </div>
      <div className="comment_section_container comment_section_container_visible">
        <input type="text" placeholder='Write your comment here...' value={commentValue} onChange={(e)=>handleCommentChanges(e)} />
        <div className="written_comments">
          {
            articleComments.map((commentItem)=>{
              
            })
          }
        </div>
      </div>

    </div>
  )
}