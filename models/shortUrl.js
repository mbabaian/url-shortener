// template for shortUrl
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Schema = mongoose.Schema

const urlSchema = new Schema ({

    originalUrl: String,
    shorterUrl: String

}, {timestamps: true})

// define models class
                                // tablename    //structure 
const ModelClass = mongoose.model('shortUrl', urlSchema)

module.exports = ModelClass

