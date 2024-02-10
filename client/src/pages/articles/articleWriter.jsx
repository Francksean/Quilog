import React, { useState } from 'react'
import './articleWriter.css'
import Header from "../../components/header/header"
import { useUser } from '../../components/context/userDatasContext'

function ArticleWriter() {
  const [ articleTitle, setArticleTitle ] = useState("")
  const [ articleText, setArticleText ] = useState("")
  const { user } = useUser()

  const handleInputChanges = (e, func) =>{
    func(e.target.value)
  }
  const clearer = () => {
    setArticleText("")
  }

  return (
    <div className='article_writer'>
      <Header/>
      <div className="article_writer_body">
        <div className="article_writer_body_container">
          <div className="article_input">
            <input type="text" value={ articleTitle } id='title_article' placeholder="Your article's title" onChange={(e) => {handleInputChanges(e, setArticleTitle())}}/>                  
          </div>
          <div className="article_input">
            <textarea name="article_body" id="article_body" value={ articleText } placeholder='Write your text...' onChange={(e) => {handleInputChanges(e, setArticleText())}}/>
          </div>
          <p>{`By ${user.username} on ${new Date().toDateString()}`}</p>
        </div>
        <div className="buttons_box">
          <button onClick={()=>{clearer()}}>Clear all</button>
          <button>Post your article</button>
        </div>
      </div>
    </div>
  )
}

export default ArticleWriter