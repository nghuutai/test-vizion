import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Header,
  Patch,
  Query,
} from '@nestjs/common';
import { TechnicalTestsService } from './technical-tests.service';
import { CreateTechnicalTestDto } from './dto/create-technical-test.dto';
import { UpdateTechnicalTestDto } from './dto/update-technical-test.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilterTechnicalTestDto } from './dto/filter-technical-test.dto';
import { UploadService } from 'src/upload-file/upload-file.service';

@ApiTags('Technical-tests')
@Controller('technical-tests')
export class TechnicalTestsController {
  constructor(
    private readonly technicalTestsService: TechnicalTestsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5,
        files: 1,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createTechnicalTestDto: CreateTechnicalTestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.technicalTestsService.create(createTechnicalTestDto, file);
  }

  @Get(':id/:fileName')
  @Header('Content-Type', 'image/webp')
  @Header('Content-Disposition', 'attachment; filename=test.webp')
  async downloadImage(@Res() res, @Param('fileName') filename: string) {
    const blobDownloaded = await this.uploadService.dowload(filename);
    return blobDownloaded.readableStreamBody.pipe(res);
  }

  @Get()
  findAll(@Query() query: FilterTechnicalTestDto) {
    return this.technicalTestsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalTestsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 5,
        files: 1,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  update(
    @Body() updateTechnicalTestDto: UpdateTechnicalTestDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.technicalTestsService.update(id, updateTechnicalTestDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalTestsService.remove(id);
  }
}
