function checkAuth(isProtectedPage) {
  const user = localStorage.getItem("user");

  if (isProtectedPage && !user) {
    window.location.replace("login.html");
  } else if (!isProtectedPage && user) {
    window.location.replace("index.html");
  }
}

function registerUser(username, password, currency = "$") {
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const userExists = users.some((u) => u.username === username);
  if (userExists) {
    return {
      success: false,
      message: "Username already exists! Please choose another.",
    };
  }

  const newUser = { username, password, currency };
  users.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  return {
    success: true,
    message: "Registration successful! You can now log in.",
  };
}

function loginUser(username, password) {
  let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    const sessionUser = { username: user.username, currency: user.currency };
    localStorage.setItem("user", JSON.stringify(sessionUser));
    return { success: true, message: "Login successful!" };
  } else {
    return { success: false, message: "Invalid username or password." };
  }
}

function logoutUser() {
  localStorage.removeItem("user");
  window.location.replace("login.html");
}
