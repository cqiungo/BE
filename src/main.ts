import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'https://fe-one-gamma.vercel.app/', // Cho phép Next.js truy cập
    credentials: true, // nếu bạn dùng cookie hoặc session
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  const port = process.env.PORT as string || 3000
  app.setGlobalPrefix('',{exclude: ['']});
  await app.listen(port,()=>{
    console.log(process.env.MONGODB_URI);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
