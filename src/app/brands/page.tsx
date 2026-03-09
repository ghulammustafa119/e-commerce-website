import Image from "next/image";
import Link from "next/link";

const styles = [
  { label: "Casual", image: "/images/casual .png", value: "casual" },
  { label: "Formal", image: "/images/formal.png", value: "formal" },
  { label: "Party", image: "/images/party.png", value: "party" },
  { label: "Gym", image: "/images/gym.png", value: "gym" },
];

export default function Brands() {
  return (
    <div className="w-full flex justify-center items-center mt-16 mb-4 max-w-screen-xl mx-auto px-4">
      <div className="w-full bg-[#F0F0F0] rounded-[20px] md:rounded-[40px] px-4 sm:px-6 md:px-16 py-8 md:py-16">
        <h1 className="font-integralcf text-2xl md:text-[48px] font-bold text-center">
          BROWSE BY DRESS STYLE
        </h1>
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 md:mt-12">
          <Link href={`/onsale?dressStyle=${styles[0].value}`} className="relative bg-white w-full md:w-[36%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              {styles[0].label}
            </h2>
            <Image
              src={styles[0].image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={407}
              height={289}
              alt={`${styles[0].label} style clothing`}
            />
          </Link>
          <Link href={`/onsale?dressStyle=${styles[1].value}`} className="relative bg-white w-full md:w-[64%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              {styles[1].label}
            </h2>
            <Image
              src={styles[1].image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={684}
              height={289}
              alt={`${styles[1].label} style clothing`}
            />
          </Link>
        </div>
        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Link href={`/onsale?dressStyle=${styles[2].value}`} className="relative bg-white w-full md:w-[64%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              {styles[2].label}
            </h2>
            <Image
              src={styles[2].image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={684}
              height={289}
              alt={`${styles[2].label} style clothing`}
            />
          </Link>
          <Link href={`/onsale?dressStyle=${styles[3].value}`} className="relative bg-white w-full md:w-[36%] h-[190px] md:h-[289px] rounded-[20px] overflow-hidden group">
            <h2 className="absolute left-6 md:left-9 top-5 md:top-8 text-xl md:text-4xl font-bold z-10">
              {styles[3].label}
            </h2>
            <Image
              src={styles[3].image}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={407}
              height={289}
              alt={`${styles[3].label} style clothing`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
