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
