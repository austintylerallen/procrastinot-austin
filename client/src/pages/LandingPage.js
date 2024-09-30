import React from 'react';

const LandingPage = () => {
  return (
    <section className="hero min-h-screen bg-primary flex items-center justify-center font-mono"> {/* Add font-mono */}
      <div className="container text-center text-white">
        <div id="main-header" className="mb-6">
          <h1 className="text-6xl font-bold uppercase text-todo">procrastinot</h1>
        </div>
        <div id="sub-header" className="mb-12">
          <h2 className="text-2xl text-working">Productivity Tracker</h2>
        </div>
        <a
          href="/auth"
          id="landing-login"
          className="button bg-todo text-white text-lg px-8 py-4 rounded-lg shadow-custom hover:bg-working transition duration-200"
        >
          Come On In
        </a>
        <div id="dynamic-content" className="mt-12">
          {/* Add any dynamic content */}
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
