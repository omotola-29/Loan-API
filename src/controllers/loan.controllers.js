const Loan = require("../models/loan.model");
const { v4: uuidv4 } = require("uuid");
exports.apply = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    amount,
    reason,
    address,
    nextOfKin,
    guarantor,
  } = req.body;
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !amount ||
      !reason ||
      !address ||
      !nextOfKin ||
      !phoneNumber ||
      !guarantor
    ) {
      return res
        .status(400)
        .json({ message: "Please Fill All Required Fields" });
    }
// Generate unique loan number using uuid
const loanNo = `LOAN-${uuidv4().slice(0, 8)}`.toUpperCase();
// Create a new loan application
const newApplication = new Loan({
  firstName,
  lastName,
  email,
  phoneNumber,
  amount,
  reason,
  address,
  nextOfKin,
  guarantor,
  loanNo, // Add the generated loan number
});
// Save the loan application to the database
await newApplication.save();
return res
  .status(201)
  .json({ message: "Loan Application Submitted Successfully" });
} catch (error) {
console.error(error);
return res.status(500).json({ message: "Server Error" });
}
};

// Update Loan Application
exports.update = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    amount,
    reason,
    address,
    nextOfKin,
    guarantor,
  } = req.body;
  try {
    const id = req.params.id;
    const updateApplication = await Loan.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        amount,
        reason,
        address,
        nextOfKin,
        guarantor,
      },
      {
        isNew: true,
      }
    );
    if (!updateApplication) {
      return res.status(404).json({ message: "Loan Application not found" });
    }
    return res
      .status(200)
      .json({ message: "Loan Application Updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
// Get all loan applications
exports.getAll = async (req, res) => {
  try {
    const loanApplications = await Loan.find();
    return res.status(200).json({data: loanApplications, length: loanApplications.length});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get a single loan application By First Name
exports.getByFirstName = async (req, res) => {
  const { firstName } = req.query;
  try {
    const loanApplication = await Loan.findOne({ firstName });
    if (!loanApplication) {
      return res.status(404).json({ message: "Loan Application not found" });
    }
    return res.status(200).json(loanApplication);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get a single loan application By LoanNo
exports.getByLoanNo = async (req, res) => {
  const { loanNo } = req.query;
  try {
    const loanApplication = await Loan.findOne({ loanNo });
    if (!loanApplication) {
      return res.status(404).json({ message: "Loan Application not found" });
    }
    return res.status(200).json(loanApplication);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get All And Filter By FIFO
exports.getAllAndFilterByFIFO = async (req, res) => {
  try {
    const loanApplications = await Loan.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: loanApplications, length: loanApplications.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// Search by amount
exports.getByAmount = async (req, res) => {
  const { amount } = req.query;
  try {
    const loanApplications = await Loan.find({ amount: { $gte: amount } });
    if (!loanApplications.length) {
      return res.status(404).json({ message: "Loan Applications not found" });
    }
    return res.status(200).json({ data: loanApplications, length: loanApplications.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// Change Loan Status To Approve
exports.approveLoan = async (req, res)=> {
  const { loanNo } = req.query;
try {
  const loan =  await Loan.findOne({ loanNo });
  if(!loan){
      return res.status(404).json({message: "Loan not found"});
  }
  loan.isApproved = true;
  await loan.save();
  return res.status(200).json({data: loan, message: "Loan Approved Successfully"});
} catch (error) {
   console.error(error);
   return res.status(500).json({message: "Server Error"});
}
}

exports.deleteLoan = async (req, res) => {
  const { loanNo } = req.query;
  try {
    const loan = await Loan.deleteOne({ loanNo });
    return res.status(200).json({data: loan, message: "Loan Deleted Succesfully"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Server Error"});
}
}
