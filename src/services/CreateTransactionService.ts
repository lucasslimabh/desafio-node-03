import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const objCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (objCategory) {
      const transaction = transactionRepository.create({
        title,
        value,
        type,
        category_id: objCategory.id,
      });

      await transactionRepository.save(transaction);

      return transaction;
    }
    throw new AppError('Category not found', 400);
  }
}

export default CreateTransactionService;
