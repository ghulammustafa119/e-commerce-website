import React from "react";
import Image from "next/image";

const Brands = () => {
  return (
    <div>
      <h1 className="mt-8 text-center uppercase font-semibold text-[32px] text-3xl">
        top selling
      </h1>
      <div className="flex justify-between items-center">
        <div>
          <Image
            src={"/images/no32.png"}
            alt="no32-pic"
            width={295}
            height={298}
            className="mx-10"
          />
          <p>VERTICAL STRIPED SHIRT</p>
          <Image src={"/images/a.png"} alt="a-pic" width={160} height={19} />
          <div className="flex justify-items-start">
            <Image
              src={"/images/212.png"}
              alt="212-pic"
              width={53}
              height={32}
            />
            <Image
              src={"/images/232.png"}
              alt="232-pic"
              width={56}
              height={32}
            />
            <Image
              src={"/images/20.png"}
              alt="d20-pic"
              width={58}
              height={28}
            />
          </div>
        </div>

        <div>
          <Image
            src={"/images/no33.png"}
            alt="no33-pic"
            width={295}
            height={298}
            className="mx-10"
          />
          <p>COURAGE GRAPHIC T-SHIRT</p>
          <Image src={"/images/b.png"} alt="b-pic" width={137} height={19} />
          <Image src={"/images/145.png"} alt="145-pic" width={54} height={32} />
        </div>

        <div>
          <Image
            src={"/images/no34.png"}
            alt="no34-pic"
            width={295}
            height={298}
            className="mx-10"
          />
          <p>LOOSE FIT BERMUDA SHORTS</p>
          <Image src={"/images/c.png"} alt="c-pic" width={113} height={19} />
          <Image src={"/images/80.png"} alt="80-pic" width={47} height={32} />
        </div>

        <div>
          <Image
            src={"/images/no35.png"}
            alt="no35-pic"
            width={295}
            height={298}
            className="mx-10"
          />
          <p>FADED SKINNY JEANS</p>
          <Image src={"/images/d.png"} alt="d-pic" width={150} height={19} />
          <Image src={"/images/210.png"} alt="210-pic" width={55} height={32} />
        </div>
      </div>

      <div className="w-[218px] h-[52px] text-center m-auto pt-3">
        <button>View All</button>
      </div>

      <h1 className="mt-8 text-center uppercase font-semibold text-[32px] text-3xl">
        BROWSE BY dress STYLE
      </h1>
      <div className="flex justify-center items-center w-full h-[566px] bg-[#f0f0f0] mt-20 mx-20 ">
        <div>
          <Image
            src={"/images/casual.png"}
            alt="casual-pic"
            width={307}
            height={289}
            className="w-[300px] h-[200px] border-[2px] p-5 rounded-xl"
          />
          <Image
            src={"/images/gym.png"}
            alt="gym-pic"
            width={407}
            height={289}
            className="w-[300px] h-[200px] border-[2px] p-5 rounded-xl"
          />
        </div>
        <div>
          <Image
            src={"/images/formal.png"}
            alt="formal-pic"
            width={684}
            height={289}
            className="w-[400px] h-[200px] border-[2px] p-5 rounded-xl"
          />
          <Image
            src={"/images/party.png"}
            alt="party-pic"
            width={684}
            height={289}
            className="w-[400px] h-[200px] border-[2px] p-5 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Brands;
