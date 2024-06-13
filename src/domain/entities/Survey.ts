import { JsonValue } from "@prisma/client/runtime/library";

export class Survey {
    id!: string;
    nicheId!: string;
    stars!: number;
    email!: string;
    nicheAnswers?: object;
    created!: Date;
    updated!: Date;
  }