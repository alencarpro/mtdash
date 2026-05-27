import { createFileRoute } from "@tanstack/react-router";
import { LoginSplit } from "@/components/LoginSplit";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  component: LoginSplit,
  validateSearch: (search) => loginSearchSchema.parse(search),
});
