'use client';
import React from 'react';
import { Benefits } from './Benefits';
import { Audience } from './Audience';

export { Benefits, Audience };

export const BenefitsAudience = () => {
  return (
    <>
      <Benefits />
      <Audience />
    </>
  );
};

export default BenefitsAudience;
