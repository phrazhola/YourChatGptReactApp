import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay';
import { flushSync } from 'react-dom'
import { imageByIndex, titleByIndex } from './Utils'
import prev from "../../../../images/left-arrow.png";
import next from "../../../../images/right-arrow.png";

const TWEEN_FACTOR = 4.2

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max)

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const autoplayOptions: AutoplayOptionsType = {
    delay: 3000,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)])
    const [tweenValues, setTweenValues] = useState<number[]>([])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onScroll = useCallback(() => {
        if (!emblaApi) return

        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()

        const styles = emblaApi.scrollSnapList().map((scrollSnap: any, index: any) => {
            let diffToTarget = scrollSnap - scrollProgress

            if (engine.options.loop) {
                engine.slideLooper.loopPoints.forEach((loopItem: any) => {
                    const target = loopItem.target()
                    if (index === loopItem.index && target !== 0) {
                        const sign = Math.sign(target)
                        if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                        if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
                    }
                })
            }
            const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
            return numberWithinRange(tweenValue, 0, 1)
        })
        setTweenValues(styles)
    }, [emblaApi, setTweenValues])

    useEffect(() => {
        if (!emblaApi) return

        onScroll()
        emblaApi.on('scroll', () => {
            flushSync(() => onScroll())
        })
        emblaApi.on('reInit', onScroll)
    }, [emblaApi, onScroll])

    return (
        <div className='relative'>
            <div className="embla">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container">
                        {slides.map((index) => (
                            <div
                                className="embla__slide"
                                key={index}
                                style={{
                                    ...(tweenValues.length && { opacity: tweenValues[index], zIndex: tweenValues[index] > 0.5 ? 100 : 0 })
                                }}
                            >
                                <div className="flex flex-col col-span-full sm:col-span-8 embla-box">
                                    <p className="text-slate-200 text-xl font-medium mb-2 text-center">{titleByIndex(index)}</p>
                                    <img
                                        className="embla__slide__img"
                                        src={imageByIndex(index)}
                                        alt="Your alt text"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-full absolute top-1/2">
                <button className="embla__prev" onClick={scrollPrev}>
                    <img src={prev} alt='Prev' />
                </button>
                <button className="embla__next" onClick={scrollNext}>
                    <img src={next} alt='Next' />
                </button>
            </div>
        </div>
    )
}

export default EmblaCarousel
