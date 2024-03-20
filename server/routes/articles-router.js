import express from 'express'

import * as articlesController from '../controllers/articles-controller.js'

const router = express.Router()

router.post("/submit", articlesController.submitArticle )

router.delete("/deleteArticle/:articleId", articlesController.deleteArticleById)

router.get("/feed", articlesController.fetchFeed)

router.post("/postComment", articlesController.postComment )

router.post("/likeArticle", articlesController.likeArticle)

export { router as articlesRouter }