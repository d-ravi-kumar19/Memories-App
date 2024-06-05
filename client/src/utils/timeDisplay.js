// src/utils/timeDisplay.js

import React from 'react';
import moment from 'moment';

const TimeDisplay = ({ createdAt }) => {
  const duration = moment.duration(moment().clone().diff(moment(createdAt)));

  const seconds = duration.seconds();
  const minutes = duration.minutes();
  const hours = duration.hours();
  const days = duration.days();
  const months = duration.months();
  const years = duration.years();

  const formatDuration = () => {
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  return (
    <span>{formatDuration()}</span>
  );
};

export default TimeDisplay;
