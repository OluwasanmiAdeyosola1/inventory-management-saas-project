const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCreateSupplier(data) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Supplier name is required');
  }

  if (data.email && !EMAIL_REGEX.test(data.email)) {
    errors.push('Email format is invalid');
  }

  if (data.phone !== undefined && typeof data.phone !== 'string') {
    errors.push('Phone must be a string');
  }

  if (data.address !== undefined && typeof data.address !== 'string') {
    errors.push('Address must be a string');
  }

  return errors;
}

function validateUpdateSupplier(data) {
  const errors = [];

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Supplier name cannot be empty');
    }
  }

  if (data.email && !EMAIL_REGEX.test(data.email)) {
    errors.push('Email format is invalid');
  }

  if (data.phone !== undefined && typeof data.phone !== 'string') {
    errors.push('Phone must be a string');
  }

  if (data.address !== undefined && typeof data.address !== 'string') {
    errors.push('Address must be a string');
  }

  return errors;
}

module.exports = { validateCreateSupplier, validateUpdateSupplier };
