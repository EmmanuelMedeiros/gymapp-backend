import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableUserExercisesDetails1764213394633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "userExercisesDetails",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "userExercisesId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "weight",
                        type: "float",
                        isNullable: false,
                    },
                    {
                        name: "didWeightChange",
                        type: "boolean",
                        isNullable: true,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "NOW()",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "userExercisesDetails",
            new TableForeignKey({
                columnNames: ["userExercisesId"],
                referencedTableName: "userExercises",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("userExercisesDetails", true);
    }

}
