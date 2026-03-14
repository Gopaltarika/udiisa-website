import mongoose from 'mongoose'

const generalMemberSchema = new mongoose.Schema({
  type:            { type: String, enum: ['individual', 'players', 'body-corporate'], required: true },
  name:            { type: String, required: true },
  email:           { type: String },
  phone:           { type: String },
  companyName:     { type: String },
  contactPerson:  { type: String },
}, { timestamps: true })

export default mongoose.model('GeneralMember', generalMemberSchema)
