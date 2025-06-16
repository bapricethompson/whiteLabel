import Slider from "../components/Slider";
import ClearButton from "../components/ClearButton";
import FilterButton from "../components/FilterButton";
import ListingCard from "../components/ListingCard";
import GenericH1 from "../components/GenericH1";
import GenericOuterDiv from "../components/GenericOuterDiv";

export default async function Shop() {
  let items = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/items`,
      {
        cache: "no-store", // Dynamic data for SSR
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    items = await res.json();
    console.log("Server-side fetched items:", items);
  } catch (error) {
    console.error("Error fetching items:", error);
    items = []; // Fallback to empty array
  }

  return (
    <div>
      <GenericOuterDiv>
        <div className="bg-borders py-12">
          <GenericH1 className="text-center">Find Your Favorites</GenericH1>
          <div className="my-12">
            <Slider />
          </div>
        </div>
        <div className="w-[80%] flex justify-between mx-auto py-12">
          <ClearButton />
          <FilterButton />
        </div>
        <div className="w-[90%] max-w-[1400px] py-8 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))] gap-6 mx-auto">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="min-w-[300px] flex-1 max-w-[450px]"
            >
              <a href={`./singleItem?itemId=${item.itemId}`}>
                <ListingCard
                  imgUrl={item.imgUrl}
                  infoTitle={item.title}
                  price={item.price}
                />
              </a>
            </div>
          ))}
        </div>
      </GenericOuterDiv>
    </div>
  );
}
