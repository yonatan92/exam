import { OkPacket, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql-connection';
import express, { Request, Response } from 'express';
import {
  // Author,
  AgentFromUser,
  AgentById,
  // CreateAuthor,
  // AuthorById,
  // DeletedAuthor,
  CreateAgent,
  // AuthorUpdate,
  // AuthorBookList,
} from './agent-type-validate';
// import { Book } from '../places/places-type-validate';
import log from '@ajar/marker';
import { Agent } from 'http';

const FIRST_TABLE_NAME = 'agents';
const SECOND_TABLE_NAME = 'places';

export const createAgent = async (
  payload: AgentFromUser
): Promise<CreateAgent> => {
  log.obj(payload, 'create a author, payload:');
  console.log('hi');

  const sql = `INSERT INTO ${FIRST_TABLE_NAME} SET ?`;

  const results = await db.query(sql, payload);
  const result: OkPacket = results[0] as OkPacket;

  const ok = { status: 200, message: `Agent Created successfully` };
  const fail = { status: 404, message: `Error in creating Agent ` };
  const { status, message } = result.affectedRows ? ok : fail;
  return { status, message, result };
};

export const getAllAgents = async (): Promise<Agent[]> => {
  const sql = `SELECT * a.name FROM ${FIRST_TABLE_NAME} a JOIN ${SECOND_TABLE_NAME} p ON a.id=p.agent_id WHERE  a.id=p.agent_id `;
  const [rows] = (await db.query(sql)) as any;
  console.log({ rows }, typeof rows);

  return rows as Agent[];
};

export const getAgentCityByID = async (agent_id: string): Promise<Agent[]> => {
  const sql = `SELECT * FROM ${SECOND_TABLE_NAME} b LEFT JOIN agents a ON a.id = b.agent_id WHERE b.agent_id=${agent_id}`;
  const [rows] = (await db.query(sql)) as any;
  console.log({ rows }, typeof rows);

  return rows as Agent[];
};
