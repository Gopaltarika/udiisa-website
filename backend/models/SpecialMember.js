import mongoose from 'mongoose'

const specialMemberSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  companyName: { type: String, default: '' },
  membershipCategory: { type: String, enum: ['Diamond', 'Gold', 'Silver'], default: 'Silver' },
  photo:       { type: String, default: null },
}, { timestamps: true })

export default mongoose.model('SpecialMember', specialMemberSchema)
