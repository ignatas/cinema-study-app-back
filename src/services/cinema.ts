import Cinema from '../models/Cinema';

import { CinemaType } from '../types/cinema';

interface QueryParamsType {
  city: string;
}

export default {
  async create(body: CinemaType): Promise<boolean> {
    await Cinema.create(body);
    return true;
  },

  async getAll(queryParams?: QueryParamsType): Promise<CinemaType[]> {
    const result = await Cinema.findAll({
      raw: true,
      where: queryParams,
      order: [['id', 'DESC']]
    });
    return result;
  },

  async getByID(id: number): Promise<CinemaType | any> {
    const result = await Cinema.findByPk(id, { raw: true });
    return result;
  },

  async update(id: number, body: CinemaType): Promise<CinemaType | any> {
    const result = await Cinema.update(body, {
      where: { id },
      returning: true,
      raw: true
    });
    return !!result[0] && result[1];
  },

  async delete(id: number): Promise<any> {
    const result = await Cinema.destroy({ where: { id } });
    return !!result;
  }
};
