import { Column, Table, Model, UpdatedAt, CreatedAt, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'redirect_counter',
  underscored: true,
})
export class RedirectCounter extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'reference_id'
  })
  referenceId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
