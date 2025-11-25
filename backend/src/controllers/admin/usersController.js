import { errorResponse, successResponse } from "../../utils/response.js";
import {
  getAllUsers,
  updateUsers,
  deleteUsers,
  createUsers,
  showUser,
} from "../../services/admin/usersService.js";

export const getAllUsersController = async (req, res) => {
  try {
    const data = await getAllUsers();
    if(data.length == 0 ){
      return successResponse(res, data, "Not found user",404)
    }
    return successResponse(res, data, "Successfuly get all users");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
export const getUserController = async (req, res) => {
  try {
    const data = await showUser(req.params.id);
    if(data.length == 0 ){
      return successResponse(res, data, "Not found user",404)
    }
    return successResponse(res, data, "Successfuly get all users");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const createUsersController = async (req, res) => {
  try {
    const data = await createUsers(req.body);
    return successResponse(res, data, "Successfuly register new user", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateUsersController = async (req, res) => {
  try {
    const data = await updateUsers(req.params.id, req.body);
    return successResponse(res, data, "Successfuly update user");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const deleteUsersController = async (req, res) => {
  try {
    const data = await deleteUsers(req.params.id);
    return successResponse(res, data, "Successfuly delete user");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
