type HttpFullResponse = {
  statusCode: number;
  message?: string;
  data?: any;
};

export class HttpResponse {
  static badRequest = ({ message }: Pick<HttpFullResponse, "message">) => {
    throw {
      message: message,
      statusCode: 400,
    };
  };

  static created = ({
    data,
    message,
  }: Pick<HttpFullResponse, "data" | "message">) => {
    return {
      data,
      message,
      statusCode: 201,
    };
  };

  static success = ({
    data,
    message,
  }: Pick<HttpFullResponse, "data" | "message">) => {
    return {
      data,
      message,
      statusCode: 200,
    };
  };

  static unauthorized = ({
    message,
  }: Pick<HttpFullResponse, "message">) => {
    return {
      message,
      statusCode: 401,
    };
  };
}
