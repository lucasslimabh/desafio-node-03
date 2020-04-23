import { Router } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

const categoryRoute = Router();

categoryRoute.post('/', async (request, response) => {
  const { title } = request.body;

  const categoryRepository = getRepository(Category);

  const category = categoryRepository.create({
    title,
  });

  await categoryRepository.save(category);

  response.status(200).json(category);
});

export default categoryRoute;
