import React from 'react'
import { LoaderIcon } from 'lucide-react'
import { useThemeStore } from '../store/useThemeStore'
const Loading = () => {
  const {theme}=useThemeStore();
  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
      <LoaderIcon className='animate-spin size-20 text-primary'/>
    </div>
  )
}

export default Loading;
