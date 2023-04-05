import { Request, Response } from 'express';
import IController from './interface';
import { ICredential } from '../models/Auth';
import authService, { AUTH_ERRORS } from '../services/AuthService';

class AuthController implements IController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const credential: ICredential = req.body;
      const response = await authService.register(credential);

      switch (response['error']) {
        case AUTH_ERRORS.USER_EXIST:
          res.status(403).json(response.errorMessage);
          break;
        default:
          res.json(response.data);
          break;
      }
    } catch (e: any) {
      console.error('Cannot create: ', e);
      res.status(500).json(e.message);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const response = await authService.getAll();
      res.json(response.data);
    } catch (e: any) {
      console.error('Cannot get all: ', e);
      res.status(500).json(e.message);
    }
  }

  async getOnce(req: Request, res: Response) {
    try {
      const credential: ICredential = req.body;
      const response = await authService.getUser(credential);

      switch (response['error']) {
        case AUTH_ERRORS.INVALID_PASSWORD:
        case AUTH_ERRORS.USER_NOT_FOUND:
          res.status(403).json(response.errorMessage);
          break;
        default:
          res.json(response.data);
          break;
      }
    } catch (e: any) {
      console.error('Cannot get once: ', e);
      res.status(500).json(e.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
    } catch (e: any) {
      console.error('Cannot update: ', e);
      res.status(500).json(e.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
    } catch (e: any) {
      console.error('Cannot delete: ', e);
      res.status(500).json(e.message);
    }
  }
}

const authController = new AuthController();

export default authController;
