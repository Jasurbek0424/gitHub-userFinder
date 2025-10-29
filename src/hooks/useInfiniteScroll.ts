import { useEffect, useRef } from 'react';

export const useInfiniteScroll = ({ onIntersect, root = null, enabled = true, rootMargin = '0px' }:{onIntersect: ()=>void; root?: Element|null; enabled?: boolean; rootMargin?: string}) => {
  const observerRef = useRef<IntersectionObserver|null>(null);
  const elementRef = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    if(!enabled) return;
    if(observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting) onIntersect(); });
    }, { root, rootMargin });
    const el = elementRef.current;
    if(el) observerRef.current.observe(el);
    return ()=>observerRef.current?.disconnect();
  }, [onIntersect, root, enabled, rootMargin]);

  return elementRef;
};
