import { NestFactory } from '@nestjs/core';
import { SeederModule } from 'src/seeder/seeder.module';
import { SeederService } from 'src/seeder/seeder.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeederModule);
  const seederService = appContext.get(SeederService);

  await seederService.seed();

  await appContext.close();
  console.log('Database seeding completed!');
}

bootstrap().catch((err) => {
  console.error('Database seeding failed!', err);
  process.exit(1);
});
