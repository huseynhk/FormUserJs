const checkUser = async () => {
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
  
    const isUser = await isExist(formData.email);
    console.log(isUser);
    if (isUser) {
      console.log("User  exists");
      setTimeout(() => {
        window.location.href = `main.html?userId=${isUser.id}`;
      }, 3000);
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
        } else {
          console.log("Post request is unsuccessful");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isExist = async (email) => {
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
  
  const editedFirstName = document.getElementById("editedFirstName");
  const editedLastName = document.getElementById("editedLastName");
  const editedEmail = document.getElementById("editedEmail");
  const editedPassword = document.getElementById("editedPassword");
  
  
  const showEditForm = async () => {
    const editFormContainer = document.getElementById("editFormContainer");
    editFormContainer.style.display =
      editFormContainer.style.display === "none" ? "block" : "none";
  
    if (editFormContainer.style.display === "block") {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${wantedId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {
          const users = await response.json();
          console.log(users);
          editedFirstName.value = users.firstname;
          editedLastName.value = users.lastname;
          editedEmail.value = users.email;
          editedPassword.value = users.password;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const editUser = async () => {
    const editedData = {
      firstname: editedFirstName.value,
      lastname: editedLastName.value,
      email: editedEmail.value,
      password: editedPassword.value,
    };
  
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const users = await response.json();
        if (users.length > 0) {
          const updateResponse = await fetch(
            `http://localhost:3000/users/${wantedId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(editedData),
            }
          );
  
          if (updateResponse.ok) {
            console.log("User data updated successfully");
            alert("User data updated successfully!");
          } else {
            console.log("Put request is unsuccessful");
          }
        }
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteButton = document.getElementById("deleteButton");
  const deleteAccount = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const users = await response.json();
        if (users.length > 0) {
          const deleteResponse = await fetch(
            `http://localhost:3000/users/${wantedId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          if (deleteResponse.ok) {
            console.log("User data deleted successfully");
            alert("User data deleted successfully!");
            window.location.reload(); 
          } else {
            console.log("Delete request is unsuccessful");
          }
        }
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  