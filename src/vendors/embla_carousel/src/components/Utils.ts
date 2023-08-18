import image1 from "../../../../images/screenshot.png";
import image2 from "../../../../images/comfortable-ui.gif";
import image3 from "../../../../images/type-effect.gif";
import image4 from "../../../../images/deletion-support.gif";
import image5 from "../../../../images/mobile-ui.gif";

export const images: string[] = [image1, image2, image3, image4, image5];
export const titles: string[] = [
    'Nicely formatted response', 
    'Comfortable UI',
    'Typing effect display',
    'Channel deletion supported',
    'Mobile UI'
];

export const imageByIndex = (index: number): string => images[index % images.length];
export const titleByIndex = (index: number): string => titles[index % images.length];
