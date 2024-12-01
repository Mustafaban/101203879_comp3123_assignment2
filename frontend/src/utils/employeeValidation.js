export const validateEmployee = (employee) => {
    let errors = {};
    
    if (!/^[a-zA-Z\s]+$/.test(employee.first_name)) {
      errors.first_name = 'First name should only contain letters';
    }
    if (!/^[a-zA-Z\s]+$/.test(employee.last_name)) {
      errors.last_name = 'Last name should only contain letters';
    }
  
    if (!/\S+@\S+\.\S+/.test(employee.email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!/^[a-zA-Z\s]+$/.test(employee.position)) {
      errors.position = 'Position should only contain letters';
    }
    if (!/^[a-zA-Z\s]+$/.test(employee.department)) {
      errors.department = 'Department should only contain letters';
    }
  
    if (!/^\d+$/.test(employee.salary)) {
      errors.salary = 'Salary should be a whole number';
    }
  
    return errors;
  };
  