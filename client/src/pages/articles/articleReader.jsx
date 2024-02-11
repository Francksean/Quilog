import React, { useEffect } from 'react'
import './articleReader.css'
import Header from '../../components/header/header'


function ArticleReader() {
  const FeedArticles = []
  useEffect(()=>{
    const fetchFeed = async()=>{
    }
  }, [])
  return (
    <div className='article_reader'>
      <Header/>
      <div className="article_reader_body">
        <h1>Feed</h1>
        
      </div>
    </div>
  )
}

export default ArticleReader