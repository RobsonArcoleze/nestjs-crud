import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
import { PersonModule } from 'src/person/person.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import appConfig from './app.config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
