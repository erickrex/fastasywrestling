import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import next from 'next'

function Wrestler({item}) {

    return (
        <div key={item} className='wrestler'>
            {item}
            <Image
                    src={`/images/${item}.png`}
                    alt=""
                    width="100"
                    height="100"
                    />
        </div>

    )
}

export default Wrestler;