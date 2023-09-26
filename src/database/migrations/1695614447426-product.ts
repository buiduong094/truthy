import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class product1695614447426 implements MigrationInterface {
  tableName = 'products';
  index = 'IDX_PRODUCTS_TITLE';

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
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            length: '200'
          },
          {
            name: 'category_id',
            type: 'int',
            isNullable: false,
            // isUnique: true,
          },
          {
            name: 'model',
            type: 'varchar',
            isNullable: false,
            length: '200'
          },
          {
            name: 'brand',
            type: 'varchar',
            isNullable: false,
            length: '200'
          },
          {
            name: 'keywords',
            type: 'varchar',
            isNullable: false,
            length: '200'
          },
          {
            name: 'isHot',
            type: 'boolean',
            default: false
          },
          {
            name: 'isNew',
            type: 'boolean',
            default: false
          },
          {
            name: 'isLike',
            type: 'boolean',
            default: false
          },
          {
            name: 'des_1',
            type: 'text',
            isNullable: true
          },
          {
            name: 'des_2',
            type: 'text',
            isNullable: true
          },
          {
            name: 'cover_id',
            type: 'varchar',
            isNullable: false,
            length: '10'
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

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: `${this.index}`,
        columnNames: ['name']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const nameIndex = table.indices.find(
      (ik) => ik.name.indexOf(this.index) !== -1
    );
    if (nameIndex) {
      await queryRunner.dropIndex(this.tableName, nameIndex);
    }
    await queryRunner.dropTable(this.tableName);
  }

}
