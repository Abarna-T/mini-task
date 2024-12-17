export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const FETCH_INDIVIDUAL_USERS_SUCCESS = "FETCH_INDIVIDUAL_USERS_SUCCESS";
export const FETCH_INDIVIDUAL_USERS_FAILURE = "FETCH_INDIVIDUAL_USERS_FAILURE";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (data, total) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { data, total },
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchIndividualUsersSuccess = (data) => ({
  type: FETCH_INDIVIDUAL_USERS_SUCCESS,
  payload: { data },
});

export const fetchIndividualUsersFailure = (error) => ({
  type: FETCH_INDIVIDUAL_USERS_FAILURE,
  payload: error,
});

export const deleteUser = (id) => {
  console.log(id, "DELETE ID");
  return async (dispatch) => {
    //   dispatch(fetchUsersRequest());
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Delete Response: ", response.status);
      } else {
        const error = await response.text();
        console.error("Error deleting user: ", error);
      }
    } catch (error) {
      console.error("Error deleting user: ", error.message);
    }
  };
};
export const updateUserDetails = (id, updatedData) => {
  console.log("ID to update = ", id, "Updated Data = ", updatedData);
  return async (dispatch) => {
    console.log("djh");
    dispatch(fetchUsersRequest());
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      console.log("Update Response: ", result);
    } catch (error) {
      console.error("Error updating user: ", error.message);
    }
  };
};

export const getIndividualRecord = (id) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();
      dispatch(fetchIndividualUsersSuccess(data.data));
    } catch (error) {
      dispatch(fetchIndividualUsersFailure(error.message));
    }
  };
};
export const fetchUsers = (page = 1, per_page = 20) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${page}&per_page=${per_page}`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      const data = await response.json();
      dispatch(fetchUsersSuccess(data.data, data.total));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export const createUser = (userData) => {
  console.log("hellooo");
  userData.password = "1234";
  return async (dispatch) => {
    const d = {
      username: "",
      email: userData.email,
      password: "cityslicka",
    };
    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(d),
      });

      if (response.ok) {
        console.log("User created successfully");
      } else {
        console.log("Error in creating the user");
      }
    } catch (error) {
      console.error("Error creating user: ", error.message);
    }
  };
};
