import { Body, Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Transaction } from "./entity/transaction.entity";
import { CurrentUser } from "../../common/decorators/current-user";
import { FindTransactionsDto } from "./dto/find-transactions.dto";
import { TransactionsService } from "./transaction.service";



@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService:TransactionsService) {}

  async get(@Body()dto:FindTransactionsDto,@CurrentUser() currentUser) {
    return await this.transactionService.findAll(dto,currentUser)
  }


}
