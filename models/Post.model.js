const { Schema, model } = require('mongoose');

// Subdocumento para los comentarios de cada post
const commentSchema = new Schema(
  {
    content: String,
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    imagePath: String,
    imageName: String
  },
  { timestamps: true }
);

// Esquema del post principal
const postSchema = new Schema(
  {
    content: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    picPath: String,
    picName: String,
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = model('Post', postSchema);
