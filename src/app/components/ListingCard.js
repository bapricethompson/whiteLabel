import Image from "next/image";

export default function ListingCard({ imgUrl, infoTitle, price }) {
  return (
    <div className="h-full flex flex-col text-left rounded-xl py-6 px-4  shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <div className="relative w-[90%] aspect-[5/6] mx-auto mb-6 rounded overflow-hidden">
        <Image
          src={imgUrl}
          alt={infoTitle || "Info image"}
          fill
          style={{ objectFit: "cover", borderRadius: "inherit" }}
        />
      </div>
      <div className="w-[80%] ml-8">
        <h1 className="text-2xl font-semibold">{infoTitle}</h1>
        <h2 className="text-lg py-2">${price}</h2>
      </div>
    </div>
  );
}
