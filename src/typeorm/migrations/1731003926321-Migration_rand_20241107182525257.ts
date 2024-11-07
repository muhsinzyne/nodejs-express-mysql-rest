import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrationRand202411071825252571731003926321
  implements MigrationInterface
{
  name = 'MigrationRand202411071825252571731003926321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX \`username\` ON \`queue_admin\` (\`username\`)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`username\` ON \`queue_admin\``);
  }
}
