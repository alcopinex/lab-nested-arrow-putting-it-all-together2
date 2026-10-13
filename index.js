 // Factory function demonstrating closure and nested arrow functions
const createLoginSystem = (correctUser, correctPass, maxAttempts = 3) => {
  // Private variables kept in scope via closure
  let attemptsRemaining = maxAttempts;
  let isLocked = false;

  // Inner function handling the validation logic
  const authenticate = (username, password) => {
    // Check if the account is already locked
    if (isLocked) {
      return "Account is locked. Too many failed login attempts.";
    }

    // Validate credentials using an arrow function or standard check
    const isValid = username === correctUser && password === correctPass;

    if (isValid) {
      attemptsRemaining = maxAttempts; // Reset attempts on successful login
      return "Login successful! Welcome back.";
    } else {
      attemptsRemaining--;

      if (attemptsRemaining <= 0) {
        isLocked = true;
        return "Account is now locked due to multiple failed attempts.";
      }

      return `Invalid credentials. You have ${attemptsRemaining} attempt(s) remaining.`;
    }
  };

  return authenticate;
};

// --- Test Cases ---
const login = createLoginSystem("admin", "secret123", 3);

console.log(login("admin", "wrongpassword")); // Attempt 1 failure
console.log(login("admin", "wrongpassword")); // Attempt 2 failure
console.log(login("admin", "secret123"));    // Correct password, but let's test locking first...