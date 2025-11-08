import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetchUserProgress();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    try {
      // Fetch all courses (mock backend)
      const coursesResponse = await axios.get('http://localhost:4000/api/courses');
      const userCourses = coursesResponse.data.courses.slice(0, 3); // Mock: first 3 courses

      // Mock progress for each course
      const progressData = {};
      for (const course of userCourses) {
        progressData[course._id] = {
          progressPercentage: Math.floor(Math.random() * 100), // Random progress
          totalTimeSpent: Math.floor(Math.random() * 50), // Random hours
          currentTutorial: null
        };
      }

      setEnrolledCourses(userCourses);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCourseProgress = (courseId) => progress[courseId]?.progressPercentage || 0;

  const getContinueUrl = (courseId) => {
    const courseProgress = progress[courseId];
    if (courseProgress?.currentTutorial) {
      return `/tutorials/${courseProgress.currentTutorial._id}`;
    }
    return `/courses/${courseId}`;
  };

  if (!user) {
    return (
      <div className="dashboard">
        <div className="container">
          <h2>Please login to view your dashboard</h2>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user.username}!</h1>
          <p>Continue your learning journey</p>
        </div>

        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-info">
              <div className="stat-number">{enrolledCourses.length}</div>
              <div className="stat-label">Courses Enrolled</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-number">
                {Object.values(progress).filter(p => p?.progressPercentage === 100).length}
              </div>
              <div className="stat-label">Courses Completed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <div className="stat-number">
                {Object.values(progress).reduce((total, p) => total + (p?.totalTimeSpent || 0), 0)}
              </div>
              <div className="stat-label">Hours Learned</div>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <section className="continue-learning">
          <h2>Continue Learning</h2>
          <div className="courses-grid">
            {enrolledCourses.map(course => (
              <div key={course._id} className="course-card">
                <div className="course-header">
                  <h3>{course.title}</h3>
                  <div className="progress-text">
                    {getCourseProgress(course._id)}% Complete
                  </div>
                </div>

                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getCourseProgress(course._id)}%` }}
                  />
                </div>

                <div className="course-actions">
                  <Link 
                    to={getContinueUrl(course._id)}
                    className="btn btn-primary"
                  >
                    {getCourseProgress(course._id) === 0 ? 'Start' : 'Continue'}
                  </Link>
                  <Link 
                    to={`/courses/${course._id}`}
                    className="btn btn-outline"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="recommended-courses">
          <h2>Recommended For You</h2>
          <div className="courses-grid">
            {enrolledCourses.slice(0, 2).map(course => (
              <div key={course._id} className="course-card">
                <div className="course-thumbnail">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} />
                  ) : (
                    <div className="thumbnail-placeholder">💻</div>
                  )}
                </div>
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-footer">
                    <span className="level">{course.level}</span>
                    <Link 
                      to={`/courses/${course._id}`}
                      className="btn btn-primary"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
