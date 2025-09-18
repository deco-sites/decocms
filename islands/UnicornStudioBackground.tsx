import { useEffect, useRef } from "preact/hooks";

interface UnicornStudioBackgroundProps {
  projectId: string;
  className?: string;
}

declare global {
  var UnicornStudio: {
    init: (config?: { scale?: number; dpi?: number }) => Promise<Array<{
      element: HTMLElement;
      destroy: () => void;
    }>>;
    isInitialized?: boolean;
  } | undefined;
}

export default function UnicornStudioBackground({ 
  projectId, 
  className = "" 
}: UnicornStudioBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeScript = (callback: () => void) => {
      const version = '1.4.30';
      const existingScript = document.querySelector(
        'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js"]'
      );

      if (existingScript) {
        if (globalThis.UnicornStudio) {
          callback();
        } else {
          existingScript.addEventListener('load', callback);
        }
        return;
      }

      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${version}/dist/unicornStudio.umd.js`;
      script.async = true;
      script.onload = () => {
        callback();
      };
      script.onerror = () => console.error('Failed to load UnicornStudio script');
      document.body.appendChild(script);
    };

    const initializeScene = async () => {
      if (!containerRef.current || !globalThis.UnicornStudio) return;

      // Set the project ID
      containerRef.current.setAttribute('data-us-project', projectId);
      containerRef.current.setAttribute('data-us-scale', '1');
      containerRef.current.setAttribute('data-us-dpi', '1.5');
      containerRef.current.setAttribute('data-us-lazyload', 'false');

      // Destroy previous scene if it exists
      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
      }

      try {
        const scenes = await globalThis.UnicornStudio.init({
          scale: 1,
          dpi: 1.5,
        });

        // Find our scene
        const ourScene = scenes.find(
          (scene) => scene.element === containerRef.current || 
                     scene.element.contains(containerRef.current)
        );

        if (ourScene) {
          sceneRef.current = ourScene;
        }
      } catch (error) {
        console.error('Failed to initialize UnicornStudio scene:', error);
      }
    };

    initializeScript(() => {
      void initializeScene();
    });

    return () => {
      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, [projectId]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
