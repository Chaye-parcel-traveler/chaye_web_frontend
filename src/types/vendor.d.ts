declare module 'aos' {
  type AosOptions = {
    duration?: number;
    easing?: string;
    once?: boolean;
  };

  const AOS: {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  };

  export default AOS;
}

declare module 'moment/locale/fr';

declare module 'tiny-slider-react' {
  import type { ComponentType, ReactNode } from 'react';

  type TinySliderProps = {
    children?: ReactNode;
    className?: string;
    settings?: Record<string, unknown>;
  };

  const TinySlider: ComponentType<TinySliderProps>;
  export default TinySlider;
}
