export interface Image {
  id: string;
  name: string;
  type: string;
  ratio: string;
}

export interface SlideData {
  id: string;
  type: string;
  primaryTitle: string;
  secondaryTitle: string;
  bodyContent: string;
  highlights: string[];
  images: Image[];
}

export interface ContentData {
  slides: SlideData[];
}
