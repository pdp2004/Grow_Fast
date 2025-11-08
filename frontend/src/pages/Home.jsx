import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import StatsComponent from './StatsComponent';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const staticCourses = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Learn HTML, CSS, JavaScript and modern frameworks to build responsive websites and web applications.',
      icon: '🌐',
      color: '#667eea'
    },
    {
      id: 2,
      title: 'Data Science & AI',
      description: 'Master Python, data analysis, machine learning and artificial intelligence with hands-on projects.',
      icon: '🤖',
      color: '#f5576c'
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      description: 'Learn DSA and crack interviews at top companies like Google and Microsoft.',
      icon: '⚡',
      color: '#4facfe'
    }
  ];

  const companies = [
    'Amazon', 'Google', 'Microsoft', 'Goldman Sachs', 'PayPal', 'Samsung',
    'EY', 'Hitachi', 'JPMorgan', 'IBM', 'Dell', 'Deloitte'
  ];

  const courseFeatures = [
    { icon: "🚀", category: "Beginner-Friendly", title: "Step-by-step courses designed for absolute beginners." },
    { icon: "⚡", category: "Advanced Concepts", title: "Deep dive into frameworks and advanced coding topics." },
    { icon: "💼", category: "Real-World Projects", title: "Learn by building practical, industry-ready projects." },
    { icon: "💰", category: "Affordable Pricing", title: "Premium courses at prices students can afford." },
    { icon: "📚", category: "Comprehensive Resources", title: "Access templates, code snippets, and more." },
    { icon: "🔍", category: "Industry Insights", title: "Stay updated with the latest tech trends." }
  ];

  const testimonials = [
    {
      id: 1,
      text: "I'm really grateful for this platform. If you're a beginner, you can trust this and invest your time — it's worth it!",
      author: "Mohit Kumar",
      role: "Web Developer",
      rating: 5
    },
    {
      id: 2,
      text: "If you want to level up your coding and dev skills, this is the best place. The courses are well-structured and up-to-date.",
      author: "Rakesh Shetty",
      role: "Frontend Engineer",
      rating: 5
    }
  ];

  const RatingStars = ({ rating }) => (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
      ))}
    </div>
  );

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/courses');
        if (response.data?.courses) {
          setCourses(response.data.courses.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCourses();
  }, []);

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Learn to Code with GrowFast</h1>
            <p>Master programming with structured, practical, and beginner-friendly courses. Build real projects and prepare for your dream job.</p>
            <div className="hero-buttons">
              <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
              <Link to="/login" className="btn btn-outline">Start Learning</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="container">
          <h1 className="about-title">At GrowFast, you don’t just learn code</h1>
          <p className="about-description">You gain practical, project-based skills trusted by top tech companies worldwide.</p>
          <div className="courses-grid">
            {staticCourses.map(course => (
              <div key={course.id} className="course-card" style={{ '--course-color': course.color }}>
                <div className="course-icon">{course.icon}</div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsComponent />

      {/* COMPANY LOGOS */}
      <section className="company-logos">
        <div className="container">
          <h2>Our Students Work At</h2>
          <div className="companies-grid">
            {companies.map((company, i) => (
              <div key={i} className="company-item">{company}</div>
            ))}
          </div>
          <div className="additional-text">+ many more</div>
        </div>
      </section>

      {/* COURSE FEATURES */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Learn With Us</h2>
          <div className="features-grid">
            {courseFeatures.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.category}</h3>
                <p>{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <RatingStars rating={t.rating} />
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <h3>{t.author}</h3>
                  <p>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hero-container end-cta">
        <div className="hero-content">
          <h1>Start Your Coding Journey Today</h1>
          <p>Join thousands of learners already building their future with GrowFast.</p>
          <Link to="/login" className="cta-button">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
