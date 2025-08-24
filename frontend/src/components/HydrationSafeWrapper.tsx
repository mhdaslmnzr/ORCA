'use client';

import React, { useState, useEffect } from 'react';

interface HydrationSafeWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const HydrationSafeWrapper: React.FC<HydrationSafeWrapperProps> = ({ 
  children, 
  fallback = (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#0f0f23',
      color: '#ffffff',
      fontSize: '18px'
    }}>
      <div>🦈 Loading ORCA Dashboard...</div>
    </div>
  ) 
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for next tick to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Show fallback until hydration is complete
  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default HydrationSafeWrapper;
