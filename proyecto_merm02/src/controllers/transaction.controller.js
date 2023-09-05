import Transaction from '../models/transaction.model.js'

export const getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find({ user: req.user.id }).populate('user')
    res.json(transaction)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const createTranction = async (req, res) => {
  try {
    const { amount, description, date } = req.body
    const newTransaction = new Transaction({
      amount,
      description,
      user: req.user.id,
      date
    })
    const savedTransaction = await newTransaction.save()
    res.json(savedTransaction)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate('user')
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' })
    res.send(transaction)
  } catch (error) {
    return res.status(404).json({ message: 'Transaction not found' })
  }
}

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' })
    res.send(transaction)
  } catch (error) {
    return res.status(404).json({ message: 'Transaction not found' })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id)
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' })
    res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: 'Transaction not found' })
  }
}