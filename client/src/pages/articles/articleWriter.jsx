import React, { useState } from 'react'
import './articleWriter.css'
import Header from "../../components/header/header"
import { useUser } from '../../components/context/userDatasContext'

function ArticleWriter() {
  const [ articleTitle, setArticleTitle ] = useState("")
  const [ articleText, setArticleText ] = useState("")
  const { user } = useUser()

  const handleInputChanges = () =>{
    
  }

  return (
    <div>
      <Header/>
      <div className="article_writer_body">
        <div className="article_writer_body_container">
          <div className="article_input_title">
            <label htmlFor="title_article"></label>
            <input type="text" value={ articleTitle } id='title_article' placeholder="Your artcle's title"/>                  
          </div>
          <div className="article_input_text">
            <label htmlFor="article_body"></label>
            <textarea name="article_body" id="article_body" value={ articleText } placeholder='write your text...'></textarea>
          </div>
          <p>{`By ${user.username} on ${new Date().toDateString()}`}</p>
        </div>
        <div className="buttons_box">
          <button>Clear all</button>
          <button>Post your article</button>
        </div>
      </div>
    </div>
  )
}

export default ArticleWriter