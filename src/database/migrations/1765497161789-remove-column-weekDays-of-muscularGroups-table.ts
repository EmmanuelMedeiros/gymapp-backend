import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnWeekDaysOfMuscularGroupsTable1765497161789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('muscularGroups', 'weekDays');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
