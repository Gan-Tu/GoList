import { Request, Response, NextFunction } from "express";
import NamespaceService from "../../services/namespace";

var nsService = new NamespaceService();

export function getListNameMetadata(
  req: Request,
  res: Response,
  next: NextFunction
) {
  nsService
    .getListNameMetadata(req.params.name)
    .then((data) => res.json(data))
    .catch(next);
}

export function listNameExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  nsService
    .listNameExists(req.params.name)
    .then((exists) => res.json({ exists }))
    .catch(next);
}
