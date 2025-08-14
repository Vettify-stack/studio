
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PlanTier = 'silver' | 'gold' | 'platinum';

interface PlanContextType {
  plan: PlanTier;
  setPlan: (plan: PlanTier) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanTier>('gold'); // Default to Gold

  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
