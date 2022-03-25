import { Settings } from "http2";
import { createConversationDto } from "./create.dto";

export class getConversationDto extends createConversationDto {
  id: string;
}

export class mapper {
  id: string;
  text: string;
  time: string;
}