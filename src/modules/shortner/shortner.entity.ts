import { Column, Table, Model, UpdatedAt, CreatedAt, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'url_shortner',
  underscored: true,
})
export class UrlShortner extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'original_url'
  })
  originalUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'short_code'
  })
  shortCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'host_name',
  })
  hostName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'path_name',
  })
  pathName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'search_params',
  })
  searchParams: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'protocol',
  })
  protocol: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
