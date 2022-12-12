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

export { useOutsideClickDetector }
