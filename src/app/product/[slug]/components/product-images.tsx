"use client"

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  }

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          alt={name}
          src={currentImage}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      {/* botoes */}
      <button className="grid grid-cols-4 gap-4 mt-8 px-5">
      {imageUrls.map((imageUrl) => (
        <div
          key={imageUrl}
          className={`flex h-[90px] items-center justify-center rounded-lg bg-accent
            ${imageUrl === currentImage && 'border-2 border-solid border-primary'}
          `}
          onClick={() => handleImageClick(imageUrl)}
          >
          <Image
            src={imageUrl}
            alt={name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
      ))}
      </button>
    </div>
  );
};

export default ProductImages;