
'use client';

import { useState, useEffect } from 'react';

interface SafeDateProps {
  dateString: string;
}

export default function SafeDate({ dateString }: SafeDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(dateString).toLocaleDateString());
  }, [dateString]);

  if (!formattedDate) {
    return null; // Or a loading skeleton
  }

  return <>{formattedDate}</>;
}
