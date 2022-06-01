import { ArrowCircleUpIcon } from '@heroicons/react/outline';
import React from 'react'
import BackToTop from "react-back-to-top-button";

function Up() {
  return (
    <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
    >
    <div className="h-12 w-12 rounded-md bg-[#d83d2e] text-white rounded-full">
                    <ArrowCircleUpIcon className="h-12 w-12" aria-hidden="true" />
    </div>    
        
    </BackToTop>

  )
}

export default Up