const express = require('express');
const { apply, update, getAll, getByFirstName, getByLoanNo, getAllAndFilterByFIFO, getByAmount, approveLoan, deleteLoan } = require('../controllers/loan.controllers');
const router = express.Router();
router.post('/application-form', apply)
router.put('/update-application-form/:id', update)
router.get('/getAllApplications', getAll)
router.get('/findByFirstName', getByFirstName)
router.get('/findByLoanNo', getByLoanNo)
router.get('/fifo', getAllAndFilterByFIFO)
router.get('/getByAmount', getByAmount)
router.patch('/approveLoan', approveLoan)
router.delete('/deleteLoan', deleteLoan)


module.exports = router;