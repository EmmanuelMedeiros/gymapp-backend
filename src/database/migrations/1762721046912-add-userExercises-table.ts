import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class AddUserExercisesTable1762721046912 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_exercises",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "muscularGroupId",
            type: "int",
            isNullable: false,
          },
          {
            name: "weekDay",
            type: "int",
            isNullable: false,
          },
          {
            name: "weight",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "userId",
            type: "int",
            isNullable: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "deletedAt",
            type: "timestamp",
            isNullable: true,
          },
        ],
        indices: [
          new TableIndex({
            name: "IDX_user_exercises_userId",
            columnNames: ["userId"],
          }),
          new TableIndex({
            name: "IDX_user_exercises_weekDay",
            columnNames: ["weekDay"],
          }),
        ],
      }),
      true
    );

    // Add foreign key constraint
    await queryRunner.createForeignKey(
      "user_exercises",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "user_exercises",
      new TableForeignKey({
        columnNames: ["muscularGroupId"],
        referencedColumnNames: ["id"],
        referencedTableName: "muscularGroups",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("user_exercises");
    if (table) {
      const userIdForeignKey = table.foreignKeys.find((fk) =>
        fk.columnNames.includes("userId")
      );
      const muscularGroupIdForeignKey = table.foreignKeys.find((fk) =>
        fk.columnNames.includes("muscularGroupId")
      );

      if (userIdForeignKey) {
        await queryRunner.dropForeignKey("user_exercises", userIdForeignKey);
      }
      if (muscularGroupIdForeignKey) {
        await queryRunner.dropForeignKey(
          "user_exercises",
          muscularGroupIdForeignKey
        );
      }
    }
    await queryRunner.dropTable("user_exercises", true);
  }
}
