import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTechnicalTestDto } from './dto/create-technical-test.dto';
import { UpdateTechnicalTestDto } from './dto/update-technical-test.dto';
import {
  TechnicalTest,
  TechnicalTestDocument,
} from './schema/technical-test.schema';
import { PaginateModel } from 'mongoose';
import { FilterTechnicalTestDto } from './dto/filter-technical-test.dto';
import { UploadService } from 'src/upload-file/upload-file.service';

@Injectable()
export class TechnicalTestsService {
  constructor(
    @InjectModel(TechnicalTest.name)
    private readonly technicalTestModel: PaginateModel<TechnicalTestDocument>,
    private uploadService: UploadService,
  ) {}
  async create(
    createTechnicalTestDto: CreateTechnicalTestDto,
    file: Express.Multer.File,
  ) {
    const create = await this.technicalTestModel.create(createTechnicalTestDto);
    const url = await this.uploadService.uploadFile(file, create._id);
    if (url) {
      create.dowloadUrl = url;
      await create.save();
    }
    return create;
  }

  findAll({ page, limit }: FilterTechnicalTestDto) {
    const options = {
      page,
      limit,
      sort: {
        createdAt: -1,
      },
      collation: {
        locale: 'en',
      },
    };
    return this.technicalTestModel.paginate(
      {
        deleted: false,
      },
      options,
    );
  }

  findOne(id: string) {
    return this.technicalTestModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateTechnicalTestDto: UpdateTechnicalTestDto,
    file: Express.Multer.File,
  ) {
    let url;
    if (file) {
      const technicalTest = await this.technicalTestModel.findOne({ _id: id });
      console.log(technicalTest);
      const urlArray = technicalTest.dowloadUrl.split('/');
      const fileName = urlArray[urlArray.length - 1];
      await this.uploadService.delete(fileName);
      url = await this.uploadService.uploadFile(file, id);
    }

    return this.technicalTestModel.updateOne(
      { _id: id },
      {
        ...updateTechnicalTestDto,
        ...(url && { dowloadUrl: url }),
      },
    );
  }

  remove(id: string) {
    return this.technicalTestModel.deleteOne({ _id: id });
  }
}
