import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<string> {
    const transactionRepository = getRepository(Transaction);

    const transaction = await transactionRepository.findOne(id);

    if (transaction) {
      await transactionRepository.delete(transaction.id);

      return 'Arquivo excluido';
    }
    throw new AppError('id not found', 400);
  }
}

export default DeleteTransactionService;
