export const useAnimation = (dependencies = []) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
  
    useEffect(() => {
      setShouldAnimate(true);
      
      return () => setShouldAnimate(false);
    }, dependencies);
  
    return shouldAnimate;
  };