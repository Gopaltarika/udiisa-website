import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/udiisa'

async function main() {
  await mongoose.connect(uri)
  const email = 'info@udisports.in'
  const plainPassword = 'Admin@123'

  let admin = await Admin.findOne()
  if (admin) {
    // Update existing admin credentials
    admin.email = email
    admin.password = await bcrypt.hash(plainPassword, 10)
    if (!admin.name) admin.name = 'Admin'
    await admin.save()
    console.log('Admin updated:', email, '/', plainPassword)
  } else {
    const hash = await bcrypt.hash(plainPassword, 10)
    admin = await Admin.create({ email, password: hash, name: 'Admin' })
    console.log('Admin created:', email, '/', plainPassword)
  }
  process.exit(0)
}

main().catch((e) => {
  console.error('Seed admin failed:', e)
  process.exit(1)
})
