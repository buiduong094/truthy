import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1689171872190 implements MigrationInterface {
  name = 'Category1689171872190';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "headercustom_id" character varying NOT NULL, "keywords" character varying NOT NULL, "des_1" character varying NOT NULL, "des_2" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d70a8b51a65ea5d695dc01f2bd" ON "categories" ("headercustom_id") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
