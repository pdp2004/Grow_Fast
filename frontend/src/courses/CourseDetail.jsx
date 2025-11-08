import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';


const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');


  useEffect(() => {
    fetchCourseDetails();
    checkEnrollment();
  }, [id]);


  const fetchCourseDetails = async () => {
    try {
      const [courseResponse, tutorialsResponse] = await Promise.all([
        axios.get(`/api/courses/${id}`),
        axios.get(`/api/tutorials/course/${id}`)
      ]);

      setCourse(courseResponse.data.course);
      setTutorials(tutorialsResponse.data.tutorials);

      // Removed: user check and progress fetch per user
      // If you want to fetch progress for all, remove condition or adjust logic
      const progressResponse = await axios.get(`/api/progress/course/${id}`);
      setProgress(progressResponse.data.progress);

    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };


  const checkEnrollment = async () => {
    // Removed: user check
    try {
      const progressResponse = await axios.get(`http://localhost:4000/api/progress/course/${id}`);
      setEnrolled(!!progressResponse.data.progress);
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };


  const handleEnroll = async () => {
    // Removed: user check, navigate to login
    try {
      setEnrolled(true);
      // In real app, you'd call enrollment API
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };


  const getCompletedTutorials = () => {
    if (!progress) return 0;
    return progress.completedTutorials.length;
  };


  const isTutorialCompleted = (tutorialId) => {
    if (!progress) return false;
    return progress.completedTutorials.some(ct => ct.tutorial._id === tutorialId);
  };


  const getTutorialProgress = (tutorialId) => {
    if (!progress) return 0;
    return isTutorialCompleted(tutorialId) ? 100 : 0;
  };


  if (loading) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="loading">Loading course...</div>
        </div>
      </div>
    );
  }


  if (!course) {
    return (
      <div className="course-detail-page">
        <div className="container">
          <div className="error-page">
            <h2>Course not found</h2>
            <p>The course you're looking for doesn't exist.</p>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="course-detail-page">
      {/* Course Header */}
      <div className="course-header">
        <div className="container">
          <div className="course-header-content">
            <div className="course-info-main">
              <nav className="breadcrumb">
                <Link to="/courses">Courses</Link>
                <span> / </span>
                <span>{course.category}</span>
              </nav>
              
              <h1>{course.title}</h1>
              <p className="course-subtitle">{course.description}</p>
              
              <div className="course-meta-header">
                <div className="meta-item">
                  <span className="meta-icon">👨‍💻</span>
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⭐</span>
                  <span>Rating: {course.rating || '4.5'}/5</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">👥</span>
                  <span>{course.studentsEnrolled || 0} students</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📺</span>
                  <span>{tutorials.length} tutorials</span>
                </div>
              </div>

              <div className="course-tags">
                {course.tags?.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="course-sidebar">
              <div className="enrollment-card">
                <div className="course-thumbnail-large">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} />
                  ) : (
                    <div className="thumbnail-placeholder-large">
                      <span className="thumbnail-icon">💻</span>
                    </div>
                  )}
                </div>

                <div className="pricing">
                  {course.price === 0 ? (
                    <div className="price-free">
                      <span className="price-amount">Free</span>
                    </div>
                  ) : (
                    <div className="price-paid">
                      <span className="price-amount">₹{course.price}</span>
                    </div>
                  )}
                </div>

                {enrolled ? (
                  <div className="enrollment-status">
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Your Progress</span>
                        <span>{getCompletedTutorials()}/{tutorials.length} tutorials</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${progress ? progress.progressPercentage : 0}%` 
                          }}
                        />
                      </div>
                      <span className="progress-text">
                        {progress ? progress.progressPercentage : 0}% Complete
                      </span>
                    </div>
                    
                    {tutorials.length > 0 && (
                      <Link 
                        to={`/tutorials/${tutorials[0]._id}`}
                        className="btn btn-primary full-width"
                      >
                        {progress ? 'Continue Learning' : 'Start Learning'}
                      </Link>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="btn btn-primary full-width enroll-btn"
                  >
                    {course.price === 0 ? 'Enroll for Free' : 'Enroll Now'}
                  </button>
                )}

                <div className="course-features">
                  <div className="feature">
                    <span className="feature-icon">📺</span>
                    <span>{tutorials.length} Video Tutorials</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">⏱️</span>
                    <span>{course.duration || '10'} Hours Content</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📱</span>
                    <span>Lifetime Access</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📄</span>
                    <span>Downloadable Resources</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container">
        <div className="course-content">
          {/* Tabs */}
          <div className="course-tabs">
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              Curriculum ({tutorials.length})
            </button>
            <button 
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <div className="overview-section">
                  <h3>About This Course</h3>
                  <p>{course.description}</p>
                  
                  <div className="what-you-learn">
                    <h4>What You'll Learn</h4>
                    <div className="learn-items">
                      <div className="learn-item">
                        <span className="check-icon">✅</span>
                        <span>Master fundamental programming concepts</span>
                      </div>
                      <div className="learn-item">
                        <span className="check-icon">✅</span>
                        <span>Build real-world projects</span>
                      </div>
                      <div className="learn-item">
                        <span className="check-icon">✅</span>
                        <span>Prepare for technical interviews</span>
                      </div>
                      <div className="learn-item">
                        <span className="check-icon">✅</span>
                        <span>Join a community of learners</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="requirements-section">
                  <h4>Requirements</h4>
                  <ul>
                    <li>Basic computer knowledge</li>
                    <li>No prior programming experience required</li>
                    <li>Dedication to learn and practice</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="curriculum-content">
                <div className="curriculum-header">
                  <h3>Course Content</h3>
                  <div className="curriculum-stats">
                    <span>{tutorials.length} tutorials • {course.duration || '10'} hours</span>
                  </div>
                </div>

                <div className="tutorials-list">
                  {tutorials.map((tutorial, index) => (
                    <div key={tutorial._id} className="tutorial-item">
                      <div className="tutorial-info">
                        <div className="tutorial-number">{index + 1}</div>
                        <div className="tutorial-details">
                          <h4>{tutorial.title}</h4>
                          <p>{tutorial.description}</p>
                          <div className="tutorial-meta">
                            <span className="duration">⏱️ {tutorial.duration || '10'} min</span>
                            {tutorial.isFree && <span className="free-badge">Free</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="tutorial-actions">
                        {enrolled ? (
                          <Link 
                            to={`/tutorials/${tutorial._id}`}
                            className={`btn ${isTutorialCompleted(tutorial._id) ? 'btn-completed' : 'btn-primary'}`}
                          >
                            {isTutorialCompleted(tutorial._id) ? 'Completed' : 'Watch'}
                          </Link>
                        ) : (
                          <span className="preview-text">
                            {tutorial.isFree ? 'Free Preview' : 'Enroll to access'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-header">
                  <h3>Student Reviews</h3>
                  <div className="rating-overview">
                    <div className="average-rating">
                      <span className="rating-number">4.5</span>
                      <span className="rating-stars">⭐⭐⭐⭐⭐</span>
                      <span className="rating-count">Based on 1,234 reviews</span>
                    </div>
                  </div>
                </div>

                <div className="reviews-list">
                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer">
                        <div className="reviewer-avatar">A</div>
                        <div className="reviewer-info">
                          <span className="reviewer-name">Amit Kumar</span>
                          <span className="review-date">2 days ago</span>
                        </div>
                      </div>
                      <div className="review-rating">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="review-content">
                      <p>This course is amazing! Harry explains everything in such a simple way. 
                      I went from zero to building my own projects in just 2 months.</p>
                    </div>
                  </div>

                  <div className="review-item">
                    <div className="review-header">
                      <div className="reviewer">
                        <div className="reviewer-avatar">P</div>
                        <div className="reviewer-info">
                          <span className="reviewer-name">Priya Singh</span>
                          <span className="review-date">1 week ago</span>
                        </div>
                      </div>
                      <div className="review-rating">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="review-content">
                      <p>The best programming course I've ever taken. The projects are practical 
                      and the support from the community is fantastic.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
