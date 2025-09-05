import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
import { PersonModule } from 'src/person/person.module';
import appConfig from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (appConfiguration: ConfigType<typeof appConfig>) => ({
        type: appConfiguration.database.type,
        host: appConfiguration.database.host,
        port: appConfiguration.database.port,
        username: appConfiguration.database.username,
        password: appConfiguration.database.password,
        database: appConfiguration.database.database,
        autoLoadEntities: appConfiguration.database.autoLoadEntities,
        synchronize: appConfiguration.database.synchronize,
      }),
    }),
    MessagesModule,
    PersonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
