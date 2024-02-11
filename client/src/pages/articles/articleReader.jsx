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
  useEffect(()=>{
    const fetchAuthorBrief = async () => {
      const briefFetched = await axios.post("https://quilog-server.vercel.app/infos/users/userBrief", { userId: articleAuthor })
      setAuthorPic( briefFetched.data.profilePic )
      setAuthorName( briefFetched.data.username)
    }
    fetchAuthorBrief()
    console.log("feed_item_breif ok ok")
  }, [])
  return (
    <div className='feed_item'>
      <div className="feed_item_header">
        <img src={authorPic} alt="" />
        <div className="feed_item_header_infos">
          <h2>{ articleTitle }</h2>
          <p>{ authorName }</p>
        </div>
      </div>
      <div className="feed_item_body">
        <p>{articleContent}</p>
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
      <div className="feed_item_footer">
        <p>{`posted on ${datePosted}`}</p>
      </div>

    </div>
  )
}