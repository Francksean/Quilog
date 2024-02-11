import React, { useState, useEffect } from 'react'
import './articleReader.css'
import Header from '../../components/header/header'
import axios from 'axios'

import commentIcon from '../../assets/iconamoon_comment-fill.png'
import likeIcon from '../../assets/mdi_like-outline.png'
import shareIcon from '../../assets/material-symbols_share.png'


function ArticleReader() {
  const [feedArticles, setFeedArticles] = useState([])

  useEffect(()=>{
    const fetchFeed = async()=>{
      axios.get("https://quilog-server.vercel.app/content/feed")
    }
    fetchFeed()
    setFeedArticles(Array.from(fetchFeed))
  }, [])
  return (
    <div className='article_reader'>
      <Header/>
      <div className="article_reader_body">
        <h1>Feed</h1>
        { feedArticles.map((feedItem)=>{
          <FeedItem 
            articleAuthor={feedItem.author} 
            articleTitle={feedItem.title} 
            articleContent={feedItem.content}
            datePosted={feedItem.datePosted}
            articleLikes={feedItem.like}
            articleComments={feedItem.comments}
            articleViews={feedItem.views}
            articleShared={feedItem.shared}/>
        })}
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
      const briefFetched = await axios.get("https://quilog-server.vercel.app/infos/users/userBrief", { userId: articleAuthor })
      setAuthorPic( briefFetched.data.profilePic )
      setAuthorName( briefFetched.data.username)
    }
    fetchAuthorBrief()
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
            <button>Viewq</button>
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