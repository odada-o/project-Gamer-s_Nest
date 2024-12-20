'use client';
import { useGameCommunity } from '@/contexts/FilterContext';
import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import FilterSection from '../FilterSection';
import QuestionList from '../QuestionList';
import ResetButton from '../ResetButton';

const DiscussionsContent = () => {
  const { resetFilters } = useGameCommunity();

  return (
    <div className='bg-[#1a1b1e] min-h-screen'>
      <SearchBar />

      <div className='flex flex-col md:flex-row gap-6 mt-6 '>
        <div className='w-full md:w-64'>
          <div className='bg-[#2d2d3a] rounded-lg shadow-lg shadow-black/20 p-4 md:sticky md:top-36'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='font-bold text-white'>필터</h2>
              <ResetButton resetFilters={resetFilters} />
            </div>
            <FilterSection />
          </div>
        </div>

        {/* Main Content */}
        <main className='flex-1'>
          <QuestionList />
        </main>
      </div>
    </div>
  );
};

export default DiscussionsContent;
