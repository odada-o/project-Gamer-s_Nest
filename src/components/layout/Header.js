'use client';
import { Menu, Filter, Search, ShoppingCart, User } from 'lucide-react';
import { useColorMode } from '@chakra-ui/react';
import { ThemeToggle } from '../ThemeToggle';
import Input from '../common/Input';
import { usePathname } from 'next/navigation';
import DrawerMenu from '../navigation/DrawerMenu';
import { useScroll } from '@/hooks/useScroll';
import HeaderSearch from '../common/HeaderSearch';

const Header = ({ onMenuClick, activeMenu = { activeMenu }, setActiveMenu = { setActiveMenu } }) => {
  const { colorMode } = useColorMode();
  const pathname = usePathname();
  const scrolled = useScroll();
  // 경로에 따른 헤더 타입 결정
  const getHeaderType = () => {
    if (pathname === '/') return 'default';
    if (pathname.startsWith('/games/') && pathname.length > 7) return 'detail';
    if (pathname === '/games') return 'list';
    if (pathname === '/community') return 'community';
    return 'default';
  };
  const headerType = getHeaderType(pathname);
  const getHeaderStyle = () => {
    switch (headerType) {
      case 'detail':
        return {
          backgroundColor: scrolled
            ? colorMode === 'dark'
              ? 'rgba(17, 24, 39, 0.95)'
              : 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          borderBottom: '1px solid #E5E7EB',
          transition: 'background-color 0.3s ease',
        };
      case 'list':
        return {
          backgroundColor: colorMode === 'dark' ? '#1F2937' : '#F3F4F6',
          borderBottom: '2px solid #3B82F6',
          color: colorMode === 'dark' ? '#FFFFFF' : '#1F2937',
        };
      case 'community':
        return {
          backgroundColor: scrolled
            ? colorMode === 'dark'
              ? 'rgba(23, 25, 35, 1)'
              : 'rgba(255, 255, 255, 0.95)'
            : 'rgba(23, 25, 35, 1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderBottom: 'none',
          transition: 'background-color 0.3s ease',
        };
      default: // 'default' 헤더 스타일
        return {
          backgroundColor: scrolled
            ? colorMode === 'dark'
              ? 'rgba(17, 24, 39, 0.95)'
              : 'rgba(255, 255, 255, 0.95)'
            : 'transparent',
          // borderBottom: '1px solid #E5E7EB',
          color: colorMode === 'dark' ? '#D1D5DB' : '#1F2937',
          transition: 'background-color 0.3s ease',
        };
    }
  };
  // 헤더 내용 렌더링
  const renderHeaderContent = () => {
    switch (headerType) {
      case 'list':
        return (
          <>
            <div className='flex items-center justify-between h-16'>
              {/* <h1 className='text-xl font-bold mb-2'>Games List</h1> */}
              <DrawerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
              <HeaderSearch />
            </div>
          </>
        );

      case 'detail':
        return (
          <div className='flex items-center justify-between h-16'>
            <DrawerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <HeaderSearch />
          </div>
        );
      case 'community':
        return (
          <div className='flex items-center justify-between h-16 '>
            <DrawerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <HeaderSearch />
          </div>
        );
      case 'games':
        return (
          <div className='flex items-center justify-between h-16 '>
            <DrawerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <HeaderSearch />
          </div>
        );

      default:
        return (
          <>
            <DrawerMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} className={'lg:hidden'} />
            <div className='w-full max-w-md'>
              <Input placeholder='Search...' />
            </div>
            <div className='flex gap-5 items-center'>
              <button
                onClick={() => {
                  alert('기능 구현중입니다...');
                }}
                className='p-2 hover:bg-gray-800 hover:text-white rounded-full'
              >
                <User className='w-5 h-5' />
              </button>
              <ThemeToggle />
            </div>
          </>
        );
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 px-6 backdrop-blur-sm ${
        headerType === 'default' ? 'flex items-center justify-between p-6' : ''
      } ${headerType === 'detail' && !scrolled ? 'bg-transparent' : ''}
      `}
      style={getHeaderStyle()}
    >
      {renderHeaderContent()}
    </header>
  );
};

export default Header;
