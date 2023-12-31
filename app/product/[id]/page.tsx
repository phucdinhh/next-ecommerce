import { SearchParamTypes } from "@/types/SearchParamTypes";
import formatPrice from "@/util/PriceFormat";
import Image from "next/image";
import AddCart from "./AddCart";

export default async function Product({ searchParams }: SearchParamTypes) {
  console.log("{...searchParams} ", { ...searchParams });
  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-24 text-gray-700">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={600}
        height={600}
        className="w-full"
      />
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <div className="font-bold text-teal-700">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </div>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
