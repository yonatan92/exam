import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
import { OkPacket, RowDataPacket } from 'mysql2/promise';
const ajv = new Ajv();

export interface Place {
  name: string;
  hits: string;
  agent_id: string;
  id?: string;
}
export interface CreatePlace {
  status: number;
  message: string;
  result: OkPacket;
}
const place_schema: JTDSchemaType<Place> = {
  properties: {
    name: { type: 'string' },
    hits: { type: 'string' },
    agent_id: { type: 'string' },
  },
  optionalProperties: {
    id: { type: 'string' },
  },
};

export const validate_place = ajv.compile(place_schema);

