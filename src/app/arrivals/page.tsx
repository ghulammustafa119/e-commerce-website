import React from 'react'
import Image from 'next/image'
const Arrivals = () => {
  return (
    <div>
        
      <h1 className="mt-8 text-center uppercase font-semibold text-[32px] text-3xl">
        new arrivals
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <Image
            src={"/images/four.png"}
            alt="one-pic"
            width={270}
            height={298}
            className="mx-10"
          />
          <p>T-SHIRT WITH TAPE DETAILS</p>
          <Image
            src={"/images/abc.png"}
            alt="abc-pic"
            width={150}
            height={19}
          />
          <Image src={"/images/d20.png"} alt="d20-pic" width={55} height={32} />
        </div>

        <div>
          <Image
            src={"/images/one.png"}
            alt="one-pic"
            width={270}
            height={298}
            className="mx-10"
          />
          <p>SKINNY FIT JEANS</p>
          <Image
            src={"/images/def.png"}
            alt="def-pic"
            width={126}
            height={19}
          />
          <Image
            src={"/images/d240.png"}
            alt="d20-pic"
            width={200}
            height={32}
          />
        </div>

        <div>
          <Image
            src={"/images/two.png"}
            alt="one-pic"
            width={270}
            height={298}
            className="mx-10"
          />
          <p>CHECKERED SHIRT</p>
          <Image
            src={"/images/ghi.png"}
            alt="ghi-pic"
            width={150}
            height={19}
          />
          <Image
            src={"/images/d180.png"}
            alt="d180-pic"
            width={56}
            height={32}
          />
        </div>

        <div>
          <Image
            src={"/images/three.png"}
            alt="one-pic"
            width={270}
            height={298}
            className="mx-10"
          />
          <p>SLEEVE STRIPED T-SHIRT</p>
          <Image
            src={"/images/klm.png"}
            alt="klm-pic"
            width={150}
            height={19}
          />
          <Image
            src={"/images/d240.png"}
            alt="d240-pic"
            width={189}
            height={32}
          />
        </div>
      </div>

      <div className="w-[218px] h-[52px] text-center m-auto pt-3">
        <button>View All</button>
      </div>
    </div>
  )
}

export default Arrivals