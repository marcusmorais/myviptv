import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1746412670343 implements MigrationInterface {
    name = 'InitialSetup1746412670343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "channel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" text NOT NULL, "tvgId" character varying, "tvgName" character varying, "tvgLogo" character varying, "groupTitle" character varying, "isFavorite" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "category" character varying, "extra" jsonb, "playlistId" uuid, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_538c2893e2024fabc7ae65ad142" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "channel" ADD CONSTRAINT "FK_20b4e38b52e502fabb3e0f39e60" FOREIGN KEY ("playlistId") REFERENCES "playlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "playlist" ADD CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "playlist" DROP CONSTRAINT "FK_92ca9b9b5394093adb6e5f55c4b"`);
        await queryRunner.query(`ALTER TABLE "channel" DROP CONSTRAINT "FK_20b4e38b52e502fabb3e0f39e60"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "playlist"`);
        await queryRunner.query(`DROP TABLE "channel"`);
    }

}
