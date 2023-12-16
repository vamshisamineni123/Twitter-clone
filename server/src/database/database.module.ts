import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseSetupService } from './database.service';

@Module({
  providers: [DatabaseSetupService],
  exports:[DatabaseSetupService]
})
export class MainModule implements OnModuleInit
 {
  constructor(private readonly databaseSetupService: DatabaseSetupService) {}

  async onModuleInit() {
     await this.databaseSetupService.createTables();
   
  }
}