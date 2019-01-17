// SurveyField contains logic to render single label and text input
import React from 'react';

// meta with nested destrucuring of meta.error and meta.touched : deal with validation
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
