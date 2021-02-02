import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCommentsTable1607597395953 implements MigrationInterface {
	name = 'createCommentsTable1607597395953';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "body" character varying NOT NULL, "username" character varying NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ALTER COLUMN "postId" SET NOT NULL`
		);
		await queryRunner.query(
			`COMMENT ON COLUMN "comments"."postId" IS NULL`
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_8e7297165a3d53fa13b720bb11" ON "comments" ("identifier") `
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`
		);
		await queryRunner.query(`DROP INDEX "IDX_8e7297165a3d53fa13b720bb11"`);
		await queryRunner.query(
			`COMMENT ON COLUMN "comments"."postId" IS NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ALTER COLUMN "postId" DROP NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
