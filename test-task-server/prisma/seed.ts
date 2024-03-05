import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await upsertShops();
  await upsertProducts();
}

async function upsertShops(): Promise<void> {
  const countOfShops = await prisma.shop.count();

  if (countOfShops) return;

  await prisma.shop.createMany({
    data: [{ title: 'Pharmacy' }, { title: 'Drugs 24' }, { title: 'Drugs 12' }],
  });
}

async function upsertProducts(): Promise<void> {
  const countOfProducts = await prisma.product.count();

  if (countOfProducts) return;

  await prisma.product.createMany({
    data: [
      {
        title: 'Paracetamol',
        description: 'Great Paracetamol!',
        image:
          'https://m.apteka911.ua/content/shop/products/138334/photos/502090-138334-big-1500x1500-dcc6.jpg',
        price: 500,
        shopTitle: 'Pharmacy',
      },
      {
        title: 'Paracetamol ++',
        description: 'Paracetamol ++ greatest paracetamol',
        image:
          'https://m.apteka911.ua/content/shop/products/138334/photos/502090-138334-big-1500x1500-dcc6.jpg',
        price: 499,
        shopTitle: 'Drugs 24',
      },
      {
        title: 'Nurofen',
        description:
          'Nurofen relieves pain and reduces inflammation and temperature as well as relieving headaches and other types of pain. It also relieves cold and flu symptoms. For oral administration and short-term use only.',
        image:
          'https://media-services.digital-rb.com/s3/live-productcatalogue/sys-master/images/hdf/h80/8817528340510/Nurofen-Express-342mg-FRONT-1500x1500px.jpg',
        price: 600,
        shopTitle: 'Drugs 24',
      },
      {
        title: 'Nurofen Extra',
        description:
          'Nurofen Extra Strength 400 mg Liquid Capsules are indicated for symptomatic relief of non-serious arthritic conditions, rheumatic or muscular pain, backache, neuralgia, migraine, headaches, dental pain, dysmenorrhoea, feverishness, colds and influenza. For oral administration and short-term use only.',
        image:
          'https://www.nurofen.ie/static/c4fd49be389aeac8346f09213c34679b/b4040/mncbfyetrnqulianjau7.png',
        price: 1099,
        shopTitle: 'Drugs 12',
      },
      {
        title: 'Activated carbon',
        description:
          'Activated carbons (AC) are carbonaceous adsorbents synthesized from carbonaceous materials with high carbon content, low ash content, and significant volatiles matter through physical, chemical or a combination of both. From: Reference Module in Earth Systems and Environmental Sciences, 2022.',
        image:
          'https://storage.googleapis.com/static-storage/products/images/v2z/1057824.min.webp',
        price: 309,
        shopTitle: 'Pharmacy',
      },
      {
        title: 'White activated carbon',
        description: 'same as black activated carbon, but white',
        image:
          'https://storage.googleapis.com/static-storage/products/images/v2/20191024-IMG_3691.min.webp',
        price: 329,
        shopTitle: 'Drugs 12',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
