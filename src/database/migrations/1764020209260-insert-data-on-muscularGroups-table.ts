import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedMuscularGroups1764020209260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "muscularGroups" ("title", "createdAt", "updatedAt")
      VALUES 
        ('Peitoral', NOW(), NOW()),
        ('Costas', NOW(), NOW()),
        ('Trapézio', NOW(), NOW()),
        ('Ombro', NOW(), NOW()),
        ('Bíceps', NOW(), NOW()),
        ('Tríceps', NOW(), NOW()),
        ('Posterior de perna', NOW(), NOW()),
        ('Quadríceps', NOW(), NOW()),
        ('Panturrilha', NOW(), NOW()),
        ('Glúteo', NOW(), NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM "muscularGroups"
      WHERE title IN (
        'Peitoral',
        'Costas',
        'Trapézio',
        'Ombro',
        'Bíceps',
        'Tríceps',
        'Posterior de perna',
        'Quadríceps',
        'Panturrilha',
        'Glúteo'
      );
    `);
  }
}