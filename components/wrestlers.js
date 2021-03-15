import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import next from 'next'

function Wrestlers({item}) {

    return (
        <div className="match" key={cleanWrestler}>
        {Card[currentMatch].contenders.map((contender, contenderI) => (
            <div className={(optionChosen == contender.name)?"wrestler current":"wrestler"} key={contender.name} onClick={() => {chooseOption(contender.name)}}>
            {contender.name}
            <Image
            src={`/images/${contender.name}.png`}
            alt=""
            width="100"
            height="100"
            />
            </div>
            )         
            )}      
        </div>

    )
}

export default Wrestlers;
