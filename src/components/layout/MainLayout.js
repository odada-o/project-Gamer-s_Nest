'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useColorMode } from '@chakra-ui/react';
import Footer from './Footer';

const MainLayout = ({ children, headerType, showAside = true, videoOff }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Games');
  const { colorMode } = useColorMode();
  const [scrollProgress, setScrollProgress] = useState(0);
  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 진행도를 0~1 사이의 값으로 계산
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / (scrollHeight * 0.3), 1); // 30% 스크롤까지 효과 적용
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className=' min-h-screen '>
      <div className={`grid  grid-cols-1 ${showAside === true ? 'lg:grid-cols-[260px_1fr]' : ''} `}>

        {showAside && (
          <div className='md:sticky md:top-0 lg:h-screen z-50'>
            <Sidebar isOpen={isSidebarOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
          </div>
        )}

        {videoOff ? (
          <></>
        ) : (
          <div className='fixed inset-0 -z-10'>
            <video
              autoPlay
              playsInline
              muted
              loop
              className='w-full h-full object-cover'
              poster='/pattern/video/main-mo.png'
            >
              <source src='/pattern/video/main-video.mp4' type='video/mp4' />
            </video>
            <div
              className='absolute inset-0 transition-opacity duration-300'
              style={{
                background:
                  colorMode === 'dark'
                    ? `linear-gradient(to bottom, rgba(0, 0, 0, ${0.6 + scrollProgress * 0.4}), rgba(0, 0, 0, ${
                        0.8 + scrollProgress * 0.2
                      }))`
                    : `linear-gradient(to bottom, rgba(255, 255, 255, ${
                        0.6 + scrollProgress * 0.4
                      }), rgba(255, 255, 255, ${0.8 + scrollProgress * 0.2}))`,
              }}
            />
          </div>
        )}

        {/* Main Content */}
        <div className=' flex flex-col '>
          <Header
            type={headerType}
            onMenuClick={handleMenuClick}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <main className={`flex-1 min-h-screen ${showAside ? '' : ''}`}>
            <div className='relative w-full flex flex-col gap-16 z-5'>{children}</div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
