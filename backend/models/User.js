//models/User.js
import mongoose from 'mongoose';
import crypto from 'crypto';

// Helper function to generate a unique 8-character alphanumeric ID
function generateEID() {
  return 'bot-' + crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 characters + 'bot-' prefix
}

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, default: '' },
  companyName: { type: String, required: true, unique: true },
  city: { type: String, default: '' },
  domainURL: { type: String, default: '' },
  ipAddress: { type: String, default: '' },
  password: { type: String, required: true },
  script: { type: String, default: '' }, // Embed script field
  eid: { type: String, unique: true } // Field for storing the EID
});

// Middleware to generate the embed script and EID before saving the user
UserSchema.pre('save', function (next) {
  const user = this;
  
  // Generate the EID
  user.eid = generateEID();
  
  // Get the current environment domain
  const scriptDomain = process.env.NODE_ENV === 'production' 
    ? process.env.PRODUCTION_URL // Replace with your live domain
    : 'http://localhost:3000';

  // Generate the embed script
  const scriptUrl = `${scriptDomain}/widget.js`;
  const dataId = `chatbot-${user._id}`;
  
  user.script = `<script src='${scriptUrl}' data-id='${dataId}' eid='${user.eid}'></script>`;
  
  next();
});

const User = mongoose.model('User', UserSchema);
export default User;