import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTableUserMuscularGroups1765497139289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userMuscularGroups',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'muscularGroupId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'weekDays',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'userMuscularGroups',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'userMuscularGroups',
      new TableForeignKey({
        columnNames: ['muscularGroupId'],
        referencedTableName: 'muscularGroups',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
