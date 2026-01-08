import React from 'react'
import Image from "next/image";


type PropType = {
  selected: boolean
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        {/* <Image src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} alt="" width={100} height={100} className='image'></Image> */}
        <img src={`/lighting/junie-b-jones/junie-b-jones${index+1}.jpg`} className='image'></img>
      </button>
    </div>
  )
}
