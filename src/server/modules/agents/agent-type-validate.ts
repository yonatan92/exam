import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
import { OkPacket, RowDataPacket } from 'mysql2/promise';
const ajv = new Ajv();

enum Types {
  HUMAN = 'Human',
  ANDROID = 'Android',
  SENSOR = 'Sensor',
  MACHINE = 'Machine',
}

export interface Place {
  name: string;
  hits: number;
}

export interface Agent {
  name: string;
  type: Types;
  owner?: string;
  status?: 'pending' | 'active' | 'retired';
  places: Place[];
  // addPlace(place: Place): void;
  id?: string;
}
export interface AgentFromUser {
  name: string;
  type: string;
  owner?: string;
  status: string;
  // places: Place[];
  // addPlace(place: Place): void;
  id?: string;
}

export interface CreateAgent {
  status: number;
  message: string;
  result: OkPacket;
}

export interface AgentById {
  status: number;
  message?: string;
  results?: Agent;
}

const agent_schema: JTDSchemaType<AgentFromUser> = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string' },
    status: { type: 'string' },
  },
  optionalProperties: {
    id: { type: 'string' },
    owner: { type: 'string' },
  },
};

export const validateagent = ajv.compile(agent_schema);
