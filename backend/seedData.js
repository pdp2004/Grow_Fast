import mongoose from "mongoose";
import Course from "./models/Course.js";
import Tutorial from "./models/Tutorial.js";

const seedData = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/growfast');
  
  // Create sample courses
  const course = await Course.create({
    title: "Complete Web Development Bootcamp",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more!",
    instructor: "Harry",
    category: "web development",
    level: "beginner",
    price: 0,
    duration: 40,
    tags: ["html", "css", "javascript", "react", "nodejs"]
  });

  // Create sample tutorials
  await Tutorial.create([
    {
      title: "Introduction to HTML",
      description: "Learn the basics of HTML and create your first web page",
      videoUrl: "https://example.com/video1.mp4",
      duration: 30,
      course: course._id,
      order: 1,
      isFree: true
    },
    {
      title: "CSS Fundamentals",
      description: "Master CSS styling and layout techniques",
      videoUrl: "https://example.com/video2.mp4",
      duration: 45,
      course: course._id,
      order: 2,
      isFree: true
    }
  ]);

  console.log('Sample data created!');
  process.exit();
};

seedData();