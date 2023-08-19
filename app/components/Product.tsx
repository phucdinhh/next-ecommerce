import Image from "next/image";

type Props = {
  name: string;
  image: string;
  price: number;
};

export default function Product({ name, image, price }: Props) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} />
      <h1>{name}</h1>
      {price}
    </div>
  );
}
