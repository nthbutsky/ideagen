import { IIdea } from "@/types/idea";

type TResponseStatus = "success" | "error";

export interface IErrorResponse {
  code: string;
  message: string;
}

export interface IResponse {
  status: TResponseStatus;
  response: {
    data: IIdea[] | null;
    details: IErrorResponse | null;
  };
}
