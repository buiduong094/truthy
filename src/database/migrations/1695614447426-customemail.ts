import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class customemail1695614447426 implements MigrationInterface {
  tableName = 'customemails';
  // index = 'IDXCUSTOMEMAILTITLE';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          //
          {
            name: 'typeEmail',
            type: 'varchar',
            isNullable: true,
            isUnique: false,
            length: '200'
          },
          {
            name: 'order_id',
            type: 'int',
            isNullable: true,
            isUnique: false
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
            isUnique: false,
            length: '200'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      false
    );

    // await queryRunner.createIndex(
    //   this.tableName,
    //   new TableIndex({
    //     name: `${this.index}`,
    //     columnNames: ['name']
    //   })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    // const nameIndex = table.indices.find(
    //   (ik) => ik.name.indexOf(this.index) !== -1
    // );
    // if (nameIndex) {
    //   await queryRunner.dropIndex(this.tableName, nameIndex);
    // }
    await queryRunner.dropTable(this.tableName);
  }
}
