// ==============================
// USERS COLLECTION
// ==============================
users = {
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  role: "job_seeker",
  createdAt: Date
}


// ==============================
// RESUMES COLLECTION
// ==============================
resumes = {
  _id: ObjectId,
  userId: ObjectId,
  fileName: String,
  extractedSkills: [String],
  extractedExperience: String,
  extractedEducation: String,
  uploadedAt: Date
}


// ==============================
// JOB LISTINGS COLLECTION
// ==============================
job_listings = {
  _id: ObjectId,
  jobTitle: String,
  company: String,
  location: String,
  requiredSkills: [String],
  source: String,
  postedDate: Date
}


// ==============================
// APPLICATIONS COLLECTION
// ==============================
applications = {
  _id: ObjectId,
  userId: ObjectId,
  jobId: ObjectId,
  applicationStatus: String, 
  appliedDate: Date
}


// ==============================
// COVER LETTERS COLLECTION
// ==============================
cover_letters = {
  _id: ObjectId,
  userId: ObjectId,
  jobId: ObjectId,
  content: String,
  generatedAt: Date
}


// ==============================
// SKILL GAP REPORTS COLLECTION
// ==============================
skill_gap_reports = {
  _id: ObjectId,
  userId: ObjectId,
  jobId: ObjectId,
  missingSkills: [String],
  generatedAt: Date
}


// ==============================
// INTERVIEW LOGS COLLECTION
// ==============================
interview_logs = {
  _id: ObjectId,
  userId: ObjectId,
  jobId: ObjectId,
  questionsAsked: [String],
  userResponses: [String],
  feedbackSummary: String,
  createdAt: Date
}