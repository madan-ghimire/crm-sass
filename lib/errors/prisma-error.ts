import { Prisma } from "../generated/prisma/client";

export function getPrismaErrorMessage(error: unknown): string {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "P2002":
      return "UniqueConstraintViolation";

    case "P2003":
      return "ForeignKeyConstraintViolation";

    case "P2025":
      return "RecordNotFound";

    case "P2014":
      return "RelationConstraintViolation";

    case "P2000":
      return "ValueTooLong";

    case "P2001":
      return "RecordDoesNotExist";

    default:
      return "DatabaseOperationFailed";
  }
}
