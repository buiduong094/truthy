import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class cartinfor1695614447426 implements MigrationInterface {
  tableName = 'cartinfors';
  // index = 'IDXCARTINFORTITLE';

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
            name: 'cart_id',
            type: 'int',
            isNullable: true,
            isUnique: false
          },
          {
            name: 'product_id',
            type: 'int',
            isNullable: true,
            isUnique: false
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: true,
            isUnique: false
          },
          {
            name: 'des_1',
            type: 'varchar',
            isNullable: true,
            isUnique: false,
            length: '200'
          },
          {
            name: 'des_2',
            type: 'varchar',
            isNullable: true,
            isUnique: false,
            length: '200'
          },
          {
            name: 'des_3',
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