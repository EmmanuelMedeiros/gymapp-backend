import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserNotificationFrequency1772550367175 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "userNotificationFrequency",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "userId",
            type: "int",
            isUnique: true,
          },
          {
            name: "weekDays",
            type: "varchar",
          },
          {
            name: "hour",
            type: "varchar",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "userNotificationFrequency",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userNotificationFrequency");
  }
}