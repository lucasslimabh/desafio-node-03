import { Router } from 'express';

import { getRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import AppError from '../errors/AppError';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

import Transaction from '../models/Transaction';
import DeleteTransactionService from '../services/DeleteTransactionService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  try {
    let list = {};
    const transactionRepository = getRepository(Transaction);
    const tr = new TransactionsRepository();

    const transactions = await transactionRepository.find();
    const balance = await tr.getBalance(transactions);

    list = { transactions, balance };

    response.status(200).json(list);
  } catch (err) {
    throw new AppError('falha ao trazer os dados', 400);
  }
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const transactionService = new CreateTransactionService();
  const transaction = await transactionService.execute({
    title,
    value,
    type,
    category,
  });

  response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();
  const msg = await deleteTransactionService.execute(id);

  if (msg) {
    response.json({ message: msg });
  }
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
