import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import computeProductTotalPrice from "@/helpers/product";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className="">
      <div className="flex flex-col gap-8 pb-8 lg:flex-row lg:justify-center">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />

        <div className="lg:mt-12 lg:w-[29.5rem] lg:bg-accent">
          <ProductInfo product={computeProductTotalPrice(product)} />
        </div>
      </div>
      <div className="lg:flex lg:flex-col lg:ml-12 text-center lg:mb-8">
        <SectionTitle>Produtos recomendados</SectionTitle>
      </div>
      <div className="lg:flex lg:flex-wrap lg:ml-10">
        <ProductList products={product.category.products} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
