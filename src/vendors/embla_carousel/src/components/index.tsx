import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import '../css/embla.css'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const CardCarousel: React.FC = () => (
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
);

export default CardCarousel;