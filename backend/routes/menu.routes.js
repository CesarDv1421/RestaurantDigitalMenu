import { Router } from 'express';
const app = Router();

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

app.get('/', async (req, res) => {
  try {
    const categories = await prisma.categorias.findMany();

    const menuFromDB = await prisma.$queryRaw`
    SELECT
      m.id AS id,
      m.nombre AS name,
      m.descripcion AS description,
      m.precio AS price,
      m.img AS img,
      c.categoria AS category,
      GROUP_CONCAT(DISTINCT tv.variante ORDER BY tv.variante ASC SEPARATOR ', ') AS variants,
      GROUP_CONCAT(DISTINCT v.precio ORDER BY v.precio ASC SEPARATOR ', ') AS priceVariants,
      GROUP_CONCAT(DISTINCT io.ingrediente ORDER BY io.ingrediente ASC SEPARATOR ', ') AS ingredients,
      GROUP_CONCAT(DISTINCT e.extra ORDER BY e.extra ASC SEPARATOR ', ') AS extras,
      GROUP_CONCAT(DISTINCT pe.price ORDER BY e.extra ASC SEPARATOR ', ') AS extraPrices
    FROM
      menu AS m
    JOIN
      categorias AS c ON m.id_categoria = c.id
    LEFT JOIN
      variantes AS v ON m.id = v.id_menu
    LEFT JOIN
      tipos_de_variantes AS tv ON v.id_tipos_de_variantes = tv.id
    LEFT JOIN
      platos_con_ingredientes_opcionales AS pio ON m.id = pio.id_menu
    LEFT JOIN
      ingredientes_opcionales AS io ON pio.id_ingredientes_opcionales = io.id
    LEFT JOIN
      platos_con_extras AS pe ON m.id = pe.id_menu
    LEFT JOIN
      extras AS e ON pe.id_extra = e.id
    GROUP BY
      m.id, m.nombre, m.descripcion, m.precio, m.img, c.categoria;
  `;

    const menu = menuFromDB.map((item) => {
      if (item.variants !== null && item.price_variants !== null) {
        const variantsArray = item.variants.split(', ');
        const priceVariantsArray = item.priceVariants.split(', ').map(Number);

        const variants = variantsArray.map((variant, index) => ({
          variant: variant,
          price: priceVariantsArray[index],
        }));

        //Quitando objetos cuyo clave-valor null son innecesarios
        delete item.price;
        delete item.priceVariants;
        delete item.extras;
        delete item.extraPrices;
        delete item.ingredients;

        return {
          ...item,
          variants: variants,
        };
      }
      if (item.ingredients !== null) {
        const ingredientsArray = item.ingredients.split(', ');
        const extrasArray = item.extras.split(', ');
        const extraPrice = item.extraPrices.split(', ').map(Number);

        const extras = extrasArray.map((extra, index) => ({
          extras: extra,
          extrasPrice: extraPrice[index],
        }));

        const ingredients = ingredientsArray.map((ingredient) => ({
          ingredient,
        }));

        delete item.extraPrices;
        delete item.priceVariants;

        return {
          ...item,
          extras,
          ingredients,
        };
      }

      item.price = Number(item.price);
      //null necesario para funcionalidades de renderizado condicional
      item.variants = null;
      delete item.priceVariants;
      delete item.extraPrices;
      delete item.extras;
      delete item.ingredients;

      return item;
    });

    res.status(200).json({ menu, categories });
  } catch (err) {
    res.status(500).json({ err });
  }
});

export default app;
