import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'http://localhost:5173', // Cho phép Next.js truy cập
    credentials: true, // nếu bạn dùng cookie hoặc session
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  app.setGlobalPrefix('',{exclude: ['']});
  await app.listen(process.env.PORT as string,'0.0.0.0',()=>{
    console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
  });
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
