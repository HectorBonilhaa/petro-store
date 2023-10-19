"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductsWithTotalPrice } from "@/helpers/product";
import {
  ArrowLeftSquareIcon,
  ArrowRightSquareIcon,
  TruckIcon,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Pick<
    ProductsWithTotalPrice,
    | "basePrice"
    | "discountPercentage"
    | "description"
    | "discountPercentage"
    | "totalPrice"
    | "name"
  >;
}

const ProductInfo = ({
  product: { basePrice, totalPrice, description, discountPercentage, name },
}: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col px-5">
      <h2 className="text-lg">{name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {totalPrice.toFixed(2)}</h1>
        {discountPercentage > 0 && (
          <DiscountBadge>{discountPercentage}</DiscountBadge>
        )}
      </div>

      {discountPercentage > 0 && (
        <p className="text-sm opacity-75">
          De:{" "}
          <span className="text-sm line-through opacity-75">
            R$ {Number(basePrice).toFixed(2)}
          </span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <Button size="icon" variant="outline">
          <ArrowLeftSquareIcon
            size={14}
            onClick={handleDecreaseQuantityClick}
          />
        </Button>

        <span>{quantity}</span>

        <Button size="icon" variant="outline">
          <ArrowRightSquareIcon
            size={14}
            onClick={handleIncreaseQuantityClick}
          />
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60">{description}</p>
      </div>

      <Button className="font bold mt-8 uppercase">
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="flex items-center gap-2">
          <TruckIcon />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via{" "}
              <span className="font-bold text-yellow-400">Correios</span>©
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className=" text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;