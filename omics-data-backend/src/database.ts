import { DataTypes, Model, Sequelize } from 'sequelize';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});
class Gene extends Model {
  public gene!: string;
  public sampleA_expression_val!: number;
  public sampleB_expression_val!: number;
  public sampleC_expression_val!: number;
  public sampleD_expression_val!: number;
  public isOutlier!: boolean;
}

Gene.init(
  {
    gene: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sampleA_expression_val: DataTypes.FLOAT,
    sampleB_expression_val: DataTypes.FLOAT,
    sampleC_expression_val: DataTypes.FLOAT,
    sampleD_expression_val: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: 'Gene',
    tableName: 'genes',
    timestamps: false,
  }
);
export { sequelize, Gene };
