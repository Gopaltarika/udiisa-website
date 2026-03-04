import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  playerName:  { type: String, required: true },
  sportsName:  { type: String, required: true },
  photo:       { type: String, default: null },
}, { timestamps: true })

export default mongoose.model('Player', playerSchema)
