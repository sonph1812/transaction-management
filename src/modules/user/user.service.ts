import { Injectable, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Raw, Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { hashPassword } from "../../util/crypto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUsersDto } from "./dto/find-user.dto";
import { ResultsMetadata } from "../../dto/results-metadata";
import { logger } from "@typegoose/typegoose/lib/logSettings";


@Injectable()
export class UserService {
  salt: string;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService) {
  }

  async create(dto: CreateUserDto) {

    const exUser = await this.userRepository.findOne({ where: { email: dto.email } });
    console.log(exUser,'exUser');
    if (exUser)
      throw new NotAcceptableException("user existed");


    const password = await hashPassword(dto.password, this.configService.get("salt"));

    return this.userRepository.save({ ...dto, password });

  }

  async findAll({
                  offset = 0,
                  limit = 12,
                  sortField,
                  sortOrder,
                  email,
                  searchQuery
                }: FindUsersDto = {}): Promise<{ data: User[], meta: ResultsMetadata }> {

    /**filtering**/
    const where: any = {};
    if (email) {
      where.email = email;
    }
    if (searchQuery) {
      where.firstName = Raw(alias => `CONCAT(firstName," ",lastName) LIKE :name`, { name: ("%" + searchQuery + "%") });
    }

    /**fetching**/
    const [data, count] = await this.userRepository.findAndCount({
      where,
      order: {
        [sortField || "createAt"]: (sortOrder || "desc").toUpperCase()
      },
      skip: offset,
      take: limit || null
    });

    /**return value**/
    return {
      data,
      meta: {
        total: count,
        offset: offset,
        limit: limit || null
      }
    };
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByField(fieldValue: number | string, fieldName: string = "id"): Promise<User> {
    const user = await this.userRepository.findOne({ where: { [fieldName]: fieldValue } });
    if(user == null){
      console.log('not found');
    }
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    //check if mail is same
    if (typeof dto.email != "undefined") {
      const exUser = await this.userRepository.findOne({ where: { email: dto.email } });
      if (exUser) throw new UnauthorizedException("email already taken");

    }

    //check if user existed
    const user = await this.findOneByField(id);
    if (!user) throw new NotAcceptableException("not found user");

    //update and return user
    Object.assign(user, { ...dto });
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<User> {
    //Check if user exists
    const user = await this.findOneByField(id);
    if (!user) throw  new NotAcceptableException("not found user");

    //Remove and return user
    await this.userRepository.delete(id);
    return user;
  }


}
