import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { BadGatewayException, Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private azureConnection = process.env.AZURE_CONNECTION;
  private containerName = 'technical-test';

  async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobClientService = BlobServiceClient.fromConnectionString(
      this.azureConnection,
    );
    const containerClient = blobClientService.getContainerClient(
      this.containerName,
    );
    await containerClient.createIfNotExists();
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async uploadFile(file, userId) {
    try {
      const blobClient = await this.getBlobClient(file.originalname);

      await blobClient.uploadData(file.buffer);
      return `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/v1/technical-tests/${userId}/${file.originalname}`;
    } catch (error) {
      throw new BadGatewayException('CAN NOT UPLOAD FILE');
    }
  }

  async delete(fileName: string) {
    const blobClient = await this.getBlobClient(fileName);
    await blobClient.deleteIfExists();
  }

  async dowload(fileName: string) {
    const blobClient = await this.getBlobClient(fileName);
    const blobDownloaded = await blobClient.download();
    return blobDownloaded;
  }
}
