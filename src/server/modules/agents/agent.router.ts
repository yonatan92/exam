import raw from '../../middleware/route-async-wrapper';
import { connection as db } from '../../db/mysql-connection';
import { OkPacket, RowDataPacket } from 'mysql2/promise';
import express, { Request, Response, NextFunction } from 'express';
import log from '@ajar/marker';
import { getAllAgents, createAgent, getAgentCityByID } from './agent.service';
import { validateagent } from './agent-type-validate';

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW AGENT
router.post(
  '/',
  raw(async (req: Request, res: Response) => {
    // log.obj(req.body, 'create a Author, req.body:');

    const valid = validateagent(req.body);
    if (!valid && validateagent.errors) throw validateagent.errors[0];

    const { status, message, result } = await createAgent(req.body);
    res.status(status).json({ message, result });
  })
);

//GET ALL Agents
router.get(
  '/',
  raw(async (req: Request, res: Response) => {
    const agents = await getAllAgents();
    res.status(200).json(agents);
  })
);

//GET AGENTS AND HIS PLACES BY ID
router.get(
  '/:id/places',
  raw(async (req: Request, res: Response) => {
    const authors = await getAgentCityByID(req.params.id);
    res.status(200).json(authors);
  })
);

export default router;
