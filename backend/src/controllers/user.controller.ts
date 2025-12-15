import { Request, Response } from 'express';
import { getAllUsers, getUserById, updateUser } from '../services/user.service';


// GET ALL CONTROLLER - GET /api/users
export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'Kullanıcılar getirilemedi'
    });
  }
};


// GET BY ID CONTROLLER - GET /api/users/:id
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kullanıcı bulunamadı';
    res.status(404).json({
      success: false,
      message
    });
  }
};


// UPDATE CONTROLLER - PATCH /api/users/:id
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Kullanıcı başarıyla güncellendi',
      data: user
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kullanıcı güncellenemedi';
    res.status(400).json({
      success: false,
      message
    });
  }
};

