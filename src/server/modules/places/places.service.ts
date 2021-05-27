import { OkPacket, RowDataPacket } from 'mysql2/promise';
import { connection as db } from '../../db/mysql-connection';
import { CreatePlace } from './places-type-validate';
import log from '@ajar/marker';

const FIRST_TABLE_NAME = 'places';
const SECOND_TABLE_NAME = 'agents';

export const createPlace = async (
  payload: CreatePlace
): Promise<CreatePlace> => {
  log.obj(payload, 'create a places, payload:');
  const sql = `INSERT INTO ${FIRST_TABLE_NAME} SET ?`;

  const results = await db.query(sql, payload);
  const result: OkPacket = results[0] as OkPacket;

  const ok = { status: 200, message: `place Created successfully` };
  const fail = { status: 404, message: `Error in creating place ` };
  const { status, message } = result.affectedRows ? ok : fail;
  return { status, message, result };
};
