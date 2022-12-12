import { useEffect } from 'react'

function useOutsideClickDetector (ref: any, cb: () => void): void {
  useEffect(() => {
    function handleClickOutside (event: any): void {
      if (ref.current && !ref.current.contains(event.target)) {
        cb()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line
  }, [ref]);
}

const useHiddenBodyScroll = (isVisible: boolean) => {
  const appRef = document.getElementsByTagName('body')

  useEffect(() => {
    if (isVisible) {
      if(appRef) appRef[0].style.overflowY = 'hidden'
    }
    else {
      if(appRef) appRef[0].style.overflowY = 'auto'
    }
    // eslint-disable-next-line
  }, [isVisible])
}

export { useOutsideClickDetector, useHiddenBodyScroll }
