import { UnprocessableEntry } from "../core/ApiResponse";

const validator = (schema: any) => (req: Request, res: any, next: any) => {
  const { error } = schema.validate(req.body);
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const errorMessages = details.map((i: any) => i.message).join(",");
    new UnprocessableEntry(errorMessages).send(res);
  }
};

export default validator;
