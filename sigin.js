const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const wantedId = window.location.search.split("?userId=")[1];

// const addPerson = async () => {
//   if (
//     firstName.value == "" ||
//     lastName.value == "" ||
//     email.value == "" ||
//     password.value == "" ||
//     confirmPassword.value == ""
//   ) {
//     alert("Bosdur");

//     if (firstName.value == "") {
//       firstName.classList.add("inputError");
//     }
//     if (lastName.value == "") {
//       lastName.classList.add("inputError");
//     }
//     if (email.value == "") {
//       email.classList.add("inputError");
//     }
//     if (password.value == "") {
//       password.classList.add("inputError");
//     }
//     if (confirmPassword.value == "") {
//       confirmPassword.classList.add("inputError");
//     }

//   }
//   else if (password.value !== confirmPassword.value) {
//     alert("Password Uygun deyil");
//   }
//    else {
//     const userData = {
//       firstName: firstName.value,
//       lastName: lastName.value,
//       email: email.value,
//       password: password.value,
//       confirmPassword: confirmPassword.value,
//     };
//     console.log(userData);

//     try {
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (response.ok) {
//         console.log("Post request is successful");

//           const data = await response.json();
//           console.log(data);
//           const existingUser = data.find(user => user.email === userData.email);
//           if (existingUser) {
//             console.log("User already exists");
//             setTimeout(() => {
//               window.location.href = "main.html";
//             }, 3000);
//           }

//       } else {
//         console.log("Post request is unsuccessful");
//       }

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

// };


const addUser = async () => {
  const idNames = [
    "firstname",
    "lastname",
    "email",
    "password",
    "confirmPassword",
  ];
  const formData = {};
  let isEmpty = true;

  idNames.forEach((item) => {
    const element = document.getElementById(item);
    formData[item] = element.value;
    // elementlerin id-lerin formData obyektinin icine set edirik ve inputlarin value-suna beraber edirik

    if (element.value === "") {
      element.classList.add("inputError");
      isEmpty = false;

      setTimeout(() => {
        element.classList.remove("inputError");
      }, 3000);
    }
  });

  if (formData.password !== formData.confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  if (!isEmpty) {
    alert("Please fill in all the required fields.");
    return;
  }

  const isUser = await isExist2(formData.email);
  console.log(isUser);
  if (isUser) {
  alert("You have an Account go to Log In page")
  } else {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");
        window.location.href = "welcome.html";
      } else {
        console.log("Post request is unsuccessful");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const isExist2 = async (email) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.find((user) => user.email === email);
    } else {
      console.log("Error User doesnt exist");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};