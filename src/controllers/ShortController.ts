import { Request, Response } from 'express';
import IController from './interface';
import { IShort } from '../models/Short';
import shortService from '../services/ShortService';

class ShortController implements IController {
  constructor() {}

  async create(req: Request, res: Response) {
    try {
      const data: Pick<IShort, 'origin'> = req.body;
      const newShort = await shortService.create(data);
      res.json(newShort);
    } catch (e: any) {
      console.error('Cannot create: ', e);
      res.status(500).json(e.message);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const data = await shortService.getOnceById(id);
      res.json(data);
    } catch (e: any) {
      console.error('Cannot get all: ', e);
      res.status(500).json(e.message);
    }
  }

  async getByHash(req: Request, res: Response) {
    try {
      const { hash } = req.params as { hash: string };
      const data = await shortService.getOnceByHash(hash);
      res.json(data);
    } catch (e: any) {
      console.error('Cannot get all: ', e);
      res.status(500).json(e.message);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const links = await shortService.getAll();
      res.json(links);
    } catch (e: any) {
      console.error('Cannot get all: ', e);
      res.status(500).json(e.message);
    }
  }

  async getOnce(req: Request, res: Response) {
    try {
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

  async updateHash(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const updated = await shortService.updateHash(id);
      res.json(updated);
    } catch (e: any) {
      console.error('Cannot update: ', e);
      res.status(500).json(e.message);
    }
  }

  async updateOrigin(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { origin } = req.body as { origin: string };

      const updated = await shortService.updateOrigin(id, origin);
      res.json(updated);
    } catch (e: any) {
      console.error('Cannot update: ', e);
      res.status(500).json(e.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const deleted = await shortService.delete(id);
      res.json(deleted);
    } catch (e: any) {
      console.error('Cannot delete: ', e);
      res.status(500).json(e.message);
    }
  }
}

const shortController = new ShortController();

export default shortController;
