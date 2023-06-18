import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumn1685546899520 implements MigrationInterface {
    name = 'ChangeColumn1685546899520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completed"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "task" ADD "completed" boolean NOT NULL DEFAULT false`);
    }

}
