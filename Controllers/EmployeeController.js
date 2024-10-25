const EmployeeDetails = require("../Models/Employee");
const responseHandler = require("../library/responseTemplate");

exports.createEmployee = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const query = { email: req.body.email };

    // Find and update if the employee exists, or create a new one if it doesn't
    const updatedEmployee = await EmployeeDetails.findOneAndUpdate(
      query,
      req.body, 
      { new: true, upsert: true }
    );

    // Respond with the template
    return res.json(responseHandler(1, 200, "Employee profile created or updated successfully", updatedEmployee));
  } catch (error) {
    return res.json(responseHandler(0, 400, "Error creating or updating employee profile", error.message));
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const employees = await EmployeeDetails.find();
    if (employees.length === 0) {
      return res.status(404).json(responseHandler(0, 404, "No employees found."));
    }
    return res.json(responseHandler(1, 200, "Employees retrieved successfully", employees));
  } catch (error) {
    return res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const result = await EmployeeDetails.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json(responseHandler(0, 404, "No employee found with the given ID."));
    }

    return res.json(responseHandler(1, 200, "Employee deleted successfully", { id }));
  } catch (error) {
    return res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};
