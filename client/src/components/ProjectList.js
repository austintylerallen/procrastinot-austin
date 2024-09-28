import React from 'react';

const ProjectList = ({ projects }) => {
  return (
    <div>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
