// src/pages/AboutPage.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="hero bg-primary flex items-center justify-center min-h-screen">
      <div className="container text-center">
        <h1 className="text-white text-7xl mb-12">About Us</h1>
        <div className="text-white max-w-3xl mx-auto">
          <p className="text-xl mb-6">
            Are you a student who struggles with managing homework and study time? Or a professional with important meetings and projects to schedule? Well, say no more!
          </p>
          <p className="text-xl mb-6">
            Procrastinot is an awesome new website/web tool designed with the idea of making personal time and task management fun and easy for the end user with a simple-to-operate interface and design. Via the user-friendly dashboard, you can select from several options such as current projects, completed, and to-do.
          </p>
          <p className="text-xl mb-6">
            With the built-in time tracking tool, the user can keep track of the time and duration spent on a task. The user also has access to a live timer to monitor the current duration of time being spent on a task being worked on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
