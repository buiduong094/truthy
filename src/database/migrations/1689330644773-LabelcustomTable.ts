import { MigrationInterface, QueryRunner } from 'typeorm';

export class LabelcustomTable1689330644773 implements MigrationInterface {
  name = 'LabelcustomTable1689330644773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "labelcustoms" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lkey" character varying NOT NULL, "lval" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9b20a688da0015e3af3830acab0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_79ee14d2f164af09ca013d46b7" ON "labelcustoms" ("lkey") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_79ee14d2f164af09ca013d46b7"`
    );
    await queryRunner.query(`DROP TABLE "labelcustoms"`);
  }
}
