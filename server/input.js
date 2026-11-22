export function fail(status, message) {
  throw Object.assign(new Error(message), { status });
}

export function text(value, min, max) {
  if (typeof value !== 'string' || value.trim().length < min || value.length > max) {
    fail(400, 'Перевір заповнення і довжину полів.');
  }
  return value.trim();
}
