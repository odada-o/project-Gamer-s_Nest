import React from 'react';
import { Users } from 'lucide-react';
import { useGameCommunity } from '@/contexts/FilterContext';
import FilterSection from '../FilterSection';
import ResetButton from '../ResetButton';
import SearchBar from '../SearchBar';

const TeamRecruitContent = () => {
  const { posts, resetFilters } = useGameCommunity();

  return (
    <div className='bg-[#1a1b1e] min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <SearchBar />
        <div className='flex gap-6 mt-6'>
          <aside className='w-64 flex-shrink-0'>
            <div className='sticky top-36 bg-[#2d2d3a] rounded-lg shadow-lg shadow-black/20 p-4'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='font-bold text-white'>필터</h2>
                <ResetButton resetFilters={resetFilters} />
              </div>
              <FilterSection />
            </div>
          </aside>
          <div className='grid grid-cols-1 gap-4 w-full'>
            {posts.map((post) => (
              <div key={post.id} className='bg-[#2d2d3a] rounded-lg overflow-hidden'>
                <div className='relative h-40 overflow-hidden'>
                  <img src={post.game_image} alt={post.game_title} className='w-full h-full object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#2d2d3a] to-transparent' />
                  <div className='absolute bottom-0 left-0 right-0 p-4'>
                    <div className='text-xs text-purple-300 mb-1'>{post.game_title}</div>
                    <h3 className='text-lg font-semibold text-white'>{post.title}</h3>
                  </div>
                </div>
                <div className='p-4'>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4 text-gray-400' />
                      <span className='text-gray-300'>
                        {post.currentMembers}/{post.maxMembers} 멤버
                      </span>
                    </div>
                    <span className='text-green-400 text-sm'>모집중</span>
                  </div>
                  <p className='text-gray-300 text-sm mb-3'>{post.description}</p>
                  <div className='flex flex-wrap gap-2'>
                    {post.requirements.map((req) => (
                      <span key={req} className='px-2 py-1 bg-[#1a1b1e] rounded text-xs text-gray-300'>
                        {req}
                      </span>
                    ))}
                  </div>
                  <div className='mt-3 flex items-center justify-between text-sm text-gray-400'>
                    <span>작성자: {post.author}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRecruitContent;
