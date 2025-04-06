import { ApiProperty } from '@nestjs/swagger';

export interface BaseResponse<T> {
  message: string;
  content: T;
}

export class ActionResponse implements BaseResponse<boolean> {
  constructor({ message, content }: ActionResponse) {
    this.message = message;
    this.content = content;
  }
  @ApiProperty()
  message: string;
  @ApiProperty()
  content: boolean;
}

export class DataResponse<T> {
  constructor({ message, content }: DataResponse<T>) {
    this.message = message;
    this.content = content;
  }
  @ApiProperty()
  message: string;
  @ApiProperty()      
  content: T;
}