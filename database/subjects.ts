import 'server-only';
import { cache } from 'react';
import { sql } from '../database/connect';
import { Subject } from '../migrations/00001-createTableSubjects';

export const getSubjects = cache(async () => {
  // return subjects;
  const subjects = await sql<Subject[]>`
    SELECT * FROM subjects
  `;
  return subjects;
});

export const getSubjectById = cache(async (id: number) => {
  // Postgres returns an array
  const [subject] = await sql<Subject[]>`
    SELECT
      *
    FROM
      subjects
    WHERE
      id = ${id}
  `;
  return subject;
});

/*
export const deleteAnimalById = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    DELETE FROM
      animals
    WHERE
      id = ${id}
    RETURNING *
  `;

  return animal;
});

export const createAnimal = cache(
  async (firstname: string, type: string, accessory?: string) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO animals
        (first_name, type, accessory)
      VALUES
        (${firstname}, ${type}, ${accessory || null})
      RETURNING *
    `;

    return animal;
  },
);

export const updateAnimalById = cache(
  async (id: number, firstname: string, type: string, accessory?: string) => {
    const [animal] = await sql<Animal[]>`
      UPDATE
        animals
      SET
        first_name = ${firstname},
        type = ${type},
        accessory = ${accessory || null}
      WHERE id = ${id}
      RETURNING *
    `;
    return animal;
  },
);

// export function getAnimal(id: number) {
//   return animals1.find((animal) => animal.id === id);
// }

// animalId: number;
// animalfirstname: string;
// animalType: string;
// animalAccessory: string | null;
// animalFoodId: number;
// animalFoodName: string;
// animalFoodType: string;

// Join query for getting animal with related food/foods
export const getAnimalsWithFoods = cache(async (id: number) => {
  const animalsFoods = await sql<AnimalFood[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.id AS animal_food_id,
      foods.name AS animal_food_name,
      foods.type AS animal_food_type
    FROM
      animals
    INNER JOIN
      animal_foods ON animals.id = animal_foods.animal_id
    INNER JOIN
      foods ON foods.id = animal_foods.food_id
    WHERE
      animals.id = ${id}
  `;
  return animalsFoods;
});

// Join query for getting a single animal with related food/foods using Json_aag
export const getAnimalWithFoodsById = cache(async (id: number) => {
  const [animal] = await sql<AnimalWithFoodsInJsonAgg[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      (
        SELECT
          json_agg(foods.*)
        FROM
          animal_foods
        INNER JOIN
          foods ON animal_foods.food_id = foods.id
        WHERE
          animal_foods.animal_id = animals.id
      ) AS animal_foods
    FROM
      animals
    WHERE
      animals.id = ${id}
    GROUP BY
      animals.first_name, animals.type, animals.accessory, animals.id;
  `;

  return animal;
});
*/
