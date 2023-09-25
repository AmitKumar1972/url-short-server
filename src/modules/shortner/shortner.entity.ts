import { Column, Table, Model, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table
export class UrlShortener extends Model {
  @Column( {type : 'text'})
  id: string;

  @Column({ type: 'text' })
  originalUrl: string;

  @Column({ type: 'text', unique: true })
  shortUrl: string;

  @Column({ type: 'text' })
  hostname: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
