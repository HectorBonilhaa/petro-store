"use client";

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
  };

  return (
    <div className="flex flex-col gap-12 lg:ml-12 lg:mt-12 lg:w-[46rem] lg:flex-row">
      <div className="flex h-[380px] w-full bg-accent lg:h-[41.875rem] lg:w-[46rem]">
        <button className="sm: ml-10 mt-10 hidden h-[77px] w-[80px] flex-col gap-4 lg:flex">
          {imageUrls.map((imageUrl) => (
            <div
              key={imageUrl}
              className={`flex h-[90px] w-[77px] items-center justify-center gap-4 rounded-lg bg-[#0B0B0B]
            ${
              imageUrl === currentImage &&
              "border-2 border-solid border-primary"
            }
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
        <Image
          alt={name}
          src={currentImage}
          height={0}
          width={0}
          sizes="100vw"
          className="mt-20 h-auto max-h-[70%] w-full lg:ml-0 lg:mt-28 lg:h-[24.0625rem] lg:w-[32.125rem]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>

      {/* botoes */}

      <button className="mt-8 grid grid-cols-4 gap-4 px-5 lg:hidden">
        {imageUrls.map((imageUrl) => (
          <div
            key={imageUrl}
            className={`flex h-[90px] flex-col items-center justify-center rounded-lg bg-accent
            ${
              imageUrl === currentImage &&
              "border-2 border-solid border-primary"
            }
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
